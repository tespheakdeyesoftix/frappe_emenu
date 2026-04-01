<template>
	<ion-page>
		<ion-content>
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh">
				<ion-refresher-content />
			</ion-refresher>
			<div class="page-wrapper">
				<div class="hero">
					<img
						class="hero-img"
						:src="category?.photo  || business_info.placeholder_image"
						:alt="category?.category_name"
					/>
					<div class="hero-gradient"></div>
					<div class="hero-back" @click="router.back()">
						<ion-icon :icon="chevronBackOutline" />
					</div>
					<div class="hero-info">
						<div class="hero-title">{{ category?.category_name }}</div>
						<div class="hero-subtitle">{{ category?.total_products }} {{ t("Items Available") }}</div>
					</div>
				</div>

				<div v-if="product.length > 0" class="p-3">
					<div class="flex justify-end">
						<div class="inline-flex bg-neutral-100 p-1 rounded-xl justify-end my-4 gap-1">
							<div
							@click="setViewMode('grid')"
							:class="['p-1 rounded-lg transition-all', viewMode === 'grid' ? 'bg-white shadow-sm text-orange-500' : 'text-neutral-400']"
							>
							<span class="block p-1">
								<Grid size="20" />
							</span>
							</div>
							<div
							@click="setViewMode('list')"
							:class="['p-1 rounded-lg transition-all', viewMode === 'list' ? 'bg-white shadow-sm text-orange-500' : 'text-neutral-400']"
							>
							<span class="block p-1">
							<List size="20" />
							</span>
							</div>
						</div>
					</div>
					<div>
						<div>
							<div :class="['grid gap-4', viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1']">
								<div v-for="p in product" :key="p.name"
								@click="handleProductClick(p)">
									<ComProductCard :product="p" :view="viewMode"/>
								</div>
							</div>
						</div>
					</div>
					<ion-infinite-scroll
						@ionInfinite="loadMore"
						threshold="100px"
						:disabled="!hasMore"
					>
						<ion-infinite-scroll-content
						loading-spinner="crescent"
						loading-text="Loading more..."
						/>
					</ion-infinite-scroll>
				</div>
				<div v-else class="text-center py-16 text-neutral-400">
					<div class="relative flex items-center justify-center">
						<div class="w-20 h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
							<PackageX class="w-9 h-9 text-neutral-400" :stroke-width="1.5" />
						</div>
					</div>
					 <div class="text-center flex flex-col gap-1.5">
						<p class="text-sm font-medium text-neutral-700 dark:text-neutral-200">{{ t("No products found") }}</p>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonIcon,IonInfiniteScroll, IonInfiniteScrollContent,IonRefresher,
  IonRefresherContent } from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { chevronBackOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router';
import { Heart, Plus,Grid,Menu,Table, List,PackageX, SearchX, XCircle, LayoutGrid } from 'lucide-vue-next'
import ComProductCard from "@/components/ComProductCard.vue"
import { useViewMode } from "@/hooks/useViewMode.js"
const { viewMode, setViewMode } = useViewMode()

import { useApp } from '@/hooks/useApp.js'
const { business_info} = useApp()

const route = useRoute();
const router = useRouter();
const categoryName = route.params.name;
const categories = ref([]);
const product = ref([]);
const category = computed(() => categories.value[0]);
// const viewMode = ref("grid")

const page = ref(1)
const pageSize = 10
const hasMore = ref(true)

function handleProductClick(product) {
	router.push({
		path: `/product-detail/${product.name}`
	})
}

async function getCategories() {
  const res = await app.getDocList('Product Category', {
    fields: ['name', 'category_name', 'photo','total_products'],
    filters: [['name', '=', categoryName]]
  });
  if (res.data) categories.value = res.data;
}

async function getProducts(reset = false) {
  const res = await app.getDocList('Products', {
    fields: ['name', 'product_name', 'price', 'photo_1'],
    filters: [['category', '=', categoryName], ['published', '=', 1]],
    limit: pageSize,
    limit_start: (page.value - 1) * pageSize,
  });

  if (res.data) {
    if (reset) {
      product.value = res.data
    } else {
      product.value.push(...res.data)
    }
    hasMore.value = res.data.length === pageSize

    // ✅ Auto-load next page if first load doesn't fill screen
    if (reset && hasMore.value) {
      page.value++
      await getProducts()
    }
  }
}

async function loadMore(event) {
  page.value++
  await getProducts()
  event.target.complete()  // ✅ stop the spinner
}

async function handleRefresh(event) {
  page.value = 1;
  hasMore.value = true;
  product.value = [];        // clear old data
  await getProducts(true);   // pass boolean true
  event.target.complete();
}

function formatPrice(price) {
  if (!price) return "$0"
  return `$${price.toLocaleString()}`
}

function toggleFavorite(product) {
  product.isFavorite = !product.isFavorite
}

onMounted(() => {
  getCategories();
  getProducts(true);
});
</script>

<style scoped>
/* ── Layout wrapper ── */
.page-wrapper {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 0 0 24px;
}

/* ── Hero ── */
.hero {
  position: relative;
  height: 260px;
  overflow: hidden;
}

/* Taller hero on desktop */
@media (min-width: 768px) {
  .hero {
    height: 380px;
    margin: 20px;
  }
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1.00) 0%,   /* solid white at bottom */
    rgba(255, 255, 255, 0.60) 25%,  /* mid fade */
    rgba(255, 255, 255, 0.10) 50%,  /* light fade */
    transparent 100%                 /* transparent at top */
  );
}

.hero-back {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 18px;
}

.hero-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  color: rgba(1, 1, 1, 0.70);
  line-height: 1.1;
}

/* Bigger title on desktop */
@media (min-width: 768px) {
  .hero-title {
    font-size: 44px;
  }
}

.hero-subtitle {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.55);
  margin-top: 4px;
}
</style>

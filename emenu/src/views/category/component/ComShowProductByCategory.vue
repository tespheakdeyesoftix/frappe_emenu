<template>
	<ion-page>
		<ion-content>
			<div class="page-wrapper">
				<div class="hero">
					<img
						class="hero-img"
						:src="category?.photo"
						:alt="category?.category_name"
					/>
					<div class="hero-gradient"></div>
					<div class="hero-back" @click="router.back()">
						<ion-icon :icon="chevronBackOutline" />
					</div>
					<div class="hero-info">
						<div class="hero-title">{{ category?.category_name }}</div>
						<div class="hero-subtitle">{{ products.length }} Items Available</div>
					</div>
				</div>

				<div>
					<div class="flex items-end justify-end mr-3 my-3">
						<div class="flex bg-neutral-100 p-1">
							<button @click="viewMode='grid'" :class="['p-1.5 rounded-lg transition-all', viewMode==='grid' ? 'bg-white shadow-sm text-accent':'text-neutral-400']">
								<Grid size="18" />
							</button>
							<button @click="viewMode='list'" :class="['p-1.5 rounded-lg transition-all', viewMode==='list' ? 'bg-white shadow-sm text-accent':'text-neutral-400']">
								<List size="18" />
							</button>
						</div>
					</div>
					<div class="p-3">
						<div :class="['grid gap-4', viewMode==='grid'?'grid-cols-2':'grid-cols-1']">
							<div v-for="product in products" :key="product.name" @click="handleProductClick(product)" class="relative">
							<div v-if="viewMode==='list'" class="flex gap-4 p-3 bg-white rounded-3xl shadow-sm border border-neutral-100 items-center">
								<img :src="product.photo_1" :alt="product.title" class="w-24 h-24 rounded-2xl object-cover" />
								<div class="flex-1 min-w-0">
								<h3 class="font-bold text-neutral-800 truncate">{{ product.product_name }}</h3>
								<p class="text-xs text-neutral-400 mb-2">{{ product.category }}</p>
								<div class="flex items-center justify-between">
									<span class="font-bold text-accent">{{ formatPrice(product.price) }}</span>
									<button @click.stop="toggleFavorite(product)" :class="['p-2 rounded-full transition-colors', product.isFavorite ? 'text-red-500 bg-red-50':'text-neutral-300 bg-neutral-50']">
									<Heart size="18" :fill="product.isFavorite ? 'currentColor' : 'none'" />
									</button>
								</div>
								</div>

							</div>

							<div v-else class="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col">
								<div class="relative aspect-square overflow-hidden">
								<img :src="product.photo_1" :alt="product.title" class="w-full h-full object-cover" />
								<button @click.stop="toggleFavorite(product)" :class="['absolute top-3 right-3 p-2 rounded-full glass transition-colors', product.isFavorite ? 'text-red-500':'text-neutral-600']">
									<Heart size="18" :fill="product.isFavorite ? 'currentColor' : 'none'" />
								</button>
								</div>
								<div class="p-4">
								<h3 class="font-bold text-neutral-800 truncate text-sm">{{ product.product_name }}</h3>
								<p class="text-[10px] text-neutral-400 mb-2 uppercase tracking-tight">{{ product.category }}</p>
								<div class="flex items-center justify-between">
									<span class="font-bold text-accent">{{ formatPrice(product.price) }}</span>
									<button class="p-1.5 bg-neutral-900 text-white rounded-xl"><Plus size="16" /></button>
								</div>
								</div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { chevronBackOutline } from 'ionicons/icons';
import { useRoute, useRouter } from 'vue-router';
import { Heart, Grid, List, Plus, ShoppingBag, Send, Search, MapPin, Clock } from 'lucide-vue-next'
const route = useRoute();
const router = useRouter();
const categoryName = route.params.name;
const categories = ref([]);
const products = ref([]);
const category = computed(() => categories.value[0]);
const viewMode = ref('grid');
const featuredProducts = computed(() => products.value.slice(0,3))

function handleProductClick(product) {
	router.push({
		path: `/product-detail/${product.name}`
	})
}

async function getCategories() {
  const res = await app.getDocList('Product Category', {
    fields: ['name', 'category_name', 'photo'],
    filters: [['name', '=', categoryName]]
  });
  if (res.data) categories.value = res.data;
}

async function getProducts() {
  const res = await app.getDocList('Products', {
	fields: ['name', 'product_name', 'price', 'photo_1'],
    filters: [['category', '=', categoryName]]
  });
  if (res.data) products.value = res.data;
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
  getProducts();
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
    rgba(13, 13, 15, 0.95) 0%,
    rgba(13, 13, 15, 0.2) 60%,
    transparent 100%
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
  color: white;
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
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}
</style>

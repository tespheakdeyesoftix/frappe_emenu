<template>
<ion-page>
  <ion-content :fullscreen="true">
	<!-- <ComLoading v-if="loading  || !productDetail?.product_name"/> -->
	<ion-refresher slot="fixed" @ionRefresh="handleRefresh">
		<ion-refresher-content />
	</ion-refresher>
    <div class="relative" style="height: 360px;">
     	<ProductDetailSlide
			v-if="productDetail?.name"
			:productDetail="productDetail"
			@images-loaded="loading = false"
		/>
      <div class="hero-back" @click="router.back()">
        <ion-icon :icon="chevronBackOutline" />
      </div>
      <!-- Top right actions -->
      <div class="hero-actions">
        <div class="hero-action-btn">
			<button @click.stop="toggleFavorite(productDetail)" :class="[' top-3 right-3 p-2 rounded-full glass transition-colors', productDetail?.isFavorite ? 'text-red-500' : 'text-neutral-600']">
				<Heart size="18" :fill="isFavorite(productDetail?.name) ? 'red' : 'none'" />
			</button>
        </div>
      </div>
    </div>

    <div class="detail-card">
		<div class="flex justify-between items-center gap-3">
			<h2 class="text-xl font-bold text-gray-900 leading-snug flex-1">
				{{ productDetail?.product_name }}
			</h2>
			<router-link :to="`/category-product/${productDetail?.category}`">
				<span class="category-badge">
					{{ productDetail?.category_name }}
				</span>
			</router-link>
		</div>

		<div class="flex justify-between ">
			<div v-if="productDetail?.price">
				<p>{{ t("Price") }}</p>
				<div class="text-2xl font-bold text-orange-500">
					{{ formatPrice(productDetail?.price) }}
				</div>
			</div>
			<div v-if="productDetail?.installment_price">
				<p>{{ t("Installment Price") }}</p>
				<div class="text-2xl font-bold text-orange-500">
					{{ formatPrice(productDetail?.installment_price) }}
				</div>
			</div>
		</div>

		<div class="flex gap-2 flex-wrap py-3" v-if="productDetail?._user_tags">
			<ion-chip
			 	color="tertiary"
				v-for="tag in (productDetail?._user_tags || '').split(',')"
				:key="tag"
				@click="gotoTag(tag)"
			>
				<ion-label class="p-2">{{ tag }}</ion-label>
			</ion-chip>
		</div>
		<div v-if="productDetail?.description">
			<h4 class="text-base font-semibold text-gray-900 pt-2" style="margin: 0;">{{ t("Description") }}</h4>
			<p class="text-gray-500 text-sm leading-relaxed" v-html="productDetail?.description"></p>
		</div>

		<div class="flex gap-3 mt-8 w-full">
			<a v-if="business_info.telegram" :href="business_info?.telegram" target="_blank" class="flex-1">
				<button class="contact-btn telegram w-full">
					<ion-icon :icon="paperPlaneOutline" />
					{{ t("Contact Telegram") }}
				</button>
			</a>
			<a v-if="business_info.facebook" :href="business_info?.facebook" target="_blank" class="flex-1">
				<button class="contact-btn facebook w-full">
					<ion-icon :icon="logoFacebook" />
					Facebook
				</button>
			</a>
		</div>
    </div>
  </ion-content>
</ion-page>
</template>

<script setup>
import { IonContent, IonPage, IonIcon,IonRefresher, IonRefresherContent } from '@ionic/vue';
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import {
  chevronBackOutline,
  shareOutline,
  heartOutline,
  paperPlaneOutline,
  logoFacebook
} from 'ionicons/icons';
import ProductDetailSlide from "@/views/product/component/ProductDetailSlide.vue";
import { useApp } from "@/hooks/useApp.js"
import { Heart } from "lucide-vue-next"
const route = useRoute();
const router = useRouter();
const productDetail = ref({});
const {business_info,isFavorite,addToFavorite} =useApp()

import ComLoading from "@/layout/ComLoading.vue";

// const loading = ref(true)

async function getProductDetail() {
//   loading.value = true

  try {
    const res = await app.getDocList("Products", {
      fields: ["name", "product_name", "published", "price", "installment_price", "category", "category_name", "_user_tags", "photo", "photo_1", "photo_2", "photo_3", "photo_4", "photo_5", "description"],
      filters: [["name", "=", route.params.name], ["published", "=", 1]],
      orderBy: {
        field: 'sort_order',
        order: 'asc'
      },
    })

    if (res.data) {
      productDetail.value = res.data[0]
    }
	// setTimeout(() => {
    //   loading.value = false
    // }, 500)

  } catch (error) {
    // loading.value = false
  }
}

async function handleRefresh(event) {
  try {
    await getProductDetail()
  } finally {
    event.target.complete()
  }
}
function formatPrice(price) {
  if (!price) return "$0"
  return `$${price.toLocaleString()}`
}

function toggleFavorite(productDetail) {
 addToFavorite(productDetail.name)
}

onMounted(() => {
  getProductDetail();
});

function gotoTag(name) {
  router.push(`/tag/${name}`);
}
</script>

<style scoped>
/* Floating back button */
.hero-back {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 50;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.hero-back ion-icon {
  font-size: 18px;
  color: #1a1a1a;
}

/* Top-right share + heart */
.hero-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 50;
  display: flex;
  gap: 8px;
}

.hero-action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.hero-action-btn ion-icon {
  font-size: 18px;
  color: #1a1a1a;
}

/* White card that overlaps the image */
.detail-card {
  background: white;
  border-radius: 24px 24px 0 0;
  margin-top: -28px; /* pulls card UP over image */
  padding: 20px 20px 40px;
  position: relative;
  z-index: 10;
}

/* Category badge */
.category-badge {
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Contact buttons */
.contact-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 8px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
}

.contact-btn.telegram {
  background: #111827;
  color: white;
}

.contact-btn.facebook {
  background: white;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.contact-btn ion-icon {
  font-size: 16px;
}
</style>

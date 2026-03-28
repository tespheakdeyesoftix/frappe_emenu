<template>
<ion-page>
  <ion-content :fullscreen="true">
    <div class="relative" style="height: 360px;">
      <ProductDetailSlide :productDetail="productDetail" />
      <div class="hero-back" @click="router.back()">
        <ion-icon :icon="chevronBackOutline" />
      </div>

      <!-- Top right actions -->
      <div class="hero-actions">
        <!-- <div class="hero-action-btn">
          <ion-icon :icon="shareOutline" />
        </div> -->
        <div class="hero-action-btn">
          <ion-icon :icon="heartOutline" />
        </div>
      </div>
    </div>

    <div class="detail-card">
      <div class="flex justify-between items-center gap-3">
        <h2 class="text-xl font-bold text-gray-900 leading-snug flex-1">
          {{ productDetail.product_name }}
        </h2>
        <span class="category-badge">
          {{ productDetail.category_name }}
        </span>
      </div>

      <div class="text-2xl font-bold text-orange-500">
		{{ formatPrice(productDetail.price) }}
      </div>

      <div class="mt-4">
        <h4 class="text-base font-semibold text-gray-900 mb-1">Description</h4>
        <p class="text-gray-500 text-sm leading-relaxed" v-html="productDetail.description"></p>
      </div>

     <div class="flex gap-3 mt-8 w-full">
    <a v-if="business_info.telegram" :href="business_info.telegram" target="_blank" class="flex-1">
        <button class="contact-btn telegram w-full">
            <ion-icon :icon="paperPlaneOutline" />
            Contact Telegram
        </button>
    </a>
    <a v-if="business_info.facebook" :href="business_info.facebook" target="_blank" class="flex-1">
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
import { IonContent, IonPage, IonIcon } from '@ionic/vue';
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

const route = useRoute();
const router = useRouter();
const productDetail = ref({});

import { useApp } from "@/hooks/useApp.js"
const {business_info} =useApp()


async function getProductDetail() {
  const res = await app.getDocList("Products", {
    fields: ["name", "product_name", "price", "category_name","_user_tags", "photo_1", "photo_2", "photo_3", "photo_4", "photo_5", "description"],
    filters: [["name", "=", route.params.name]]
  });
  if (res.data) {
    productDetail.value = res.data[0];
  }
}

function formatPrice(price) {
  if (!price) return "$0"
  return `$${price.toLocaleString()}`
}

onMounted(() => {
  getProductDetail();
});
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

/* Tag pills */
.tag-pill {
  font-size: 12px;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 3px 12px;
}

/* Order Now */
.order-btn {
  width: 100%;
  background: #f97316;
  color: white;
  padding: 14px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: background 0.2s;
}

.order-btn:active {
  background: #ea6c0a;
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

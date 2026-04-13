<template>
  <div>
    <!-- Header with Grid/List toggle -->
    <div class="mb-2 flex items-center justify-between">
      <h3 class="font-bold text-lg">{{t("Products")}}</h3>

      <div class="flex bg-neutral-100 p-1 rounded-xl w-fit gap-1">
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

    <!-- Product Grid/List -->
    <div :class="['grid gap-4', viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1']">
      <div
        v-for="product in products"
        :key="product.name"
        class="relative cursor-pointer h-full"
        @click="handleProductClick(product)"
      >
        <ComProductCard :product="product" :view="viewMode"/>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="products.length === 0" class="text-center py-16 text-neutral-400 flex flex-col items-center">
		<ShoppingCart size="40" />
      <p class="text-sm mt-3">{{ t("No products found") }}</p>
    </div>

	 <!-- ✅ Infinite Scroll -->
    <ion-infinite-scroll
      @ionInfinite="emit('load-more', $event)"
      threshold="100px"
      :disabled="!hasMore"
    >
      <ion-infinite-scroll-content
        loading-spinner="crescent"
        loading-text="Loading more..."
      />
    </ion-infinite-scroll>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Heart, Grid, List, Plus,ShoppingCart} from "lucide-vue-next"
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/vue"
import ComProductCard from "@/components/ComProductCard.vue"
import { useRouter } from "vue-router"
import { useApp } from "@/hooks/useApp.js"
import { useViewMode } from "@/hooks/useViewMode.js"
const { viewMode, setViewMode } = useViewMode()
const {
  isFavorite ,
  addToFavorite
} = useApp()
const router = useRouter()
// const viewMode = ref("grid")

const props = defineProps({
  products: { type: Array, default: () => [] },
   hasMore: { type: Boolean, default: true },
})

const emit = defineEmits(['load-more'])

function formatPrice(price) {
  if (!price) return "$0"
  return `$${Number(price).toLocaleString()}`
}

function toggleFavorite(product) {
 addToFavorite(product.name)
}

function handleProductClick(product) {
  router.push(`/product-detail/${product.name}`)
}
</script>

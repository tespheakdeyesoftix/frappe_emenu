<template>
  <div>
    <!-- Header with Grid/List toggle -->
    <div class="mb-2 flex items-center justify-between">
      <h3 class="font-bold text-lg">Our Products</h3>
      <div class="flex bg-neutral-100 p-1 rounded-xl">
        <button
          @click="viewMode = 'grid'"
          :class="['p-1.5 rounded-lg transition-all', viewMode === 'grid' ? 'bg-white shadow-sm text-accent' : 'text-neutral-400']"
        >
          <Grid size="18" />
        </button>
        <button
          @click="viewMode = 'list'"
          :class="['p-1.5 rounded-lg transition-all', viewMode === 'list' ? 'bg-white shadow-sm text-accent' : 'text-neutral-400']"
        >
          <List size="18" />
        </button>
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
    <div v-if="products.length === 0" class="text-center py-16 text-neutral-400">
      <p class="text-sm">No products found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Heart, Grid, List, Plus } from "lucide-vue-next"
import ComProductCard from "@/components/ComProductCard.vue"
import { useRouter } from "vue-router"
import { useApp } from "@/hooks/useApp.js"
const {
  isFavorite ,
  addToFavorite
} = useApp()
const router = useRouter()
const viewMode = ref("grid")

const props = defineProps({
  products: { type: Array, default: () => [] }
})

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

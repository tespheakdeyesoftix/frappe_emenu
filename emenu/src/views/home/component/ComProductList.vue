 

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
        class="relative cursor-pointer"
        @click="handleProductClick(product)"
      >
        <!-- List View -->
        <div v-if="viewMode === 'list'" class="flex gap-4 p-3 bg-white rounded-3xl shadow-sm border border-neutral-100 items-center">
          <img :src="product.photo_1" :alt="product.product_name" class="w-24 h-24 rounded-2xl object-cover flex-shrink-0"/>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-neutral-800 truncate">{{ product.product_name }}</h3>
            <p class="text-xs text-neutral-400 mb-2" v-if="product.category_name">{{ product.category_name }}</p>
            <div class="flex items-center justify-between">
              <span class="font-bold text-accent">{{ formatPrice(product.price) }}</span>
              <button @click.stop="toggleFavorite(product)" :class="['p-2 rounded-full transition-colors', product.isFavorite ? 'text-red-500 bg-red-50' : 'text-neutral-300 bg-neutral-50']">
                <Heart size="18" :fill="isFavorite(product.name) ? 'pink' : 'none'" />
              </button>
            </div>
          </div>
        </div>

        <!-- Grid View -->
        <div v-else class="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col">
          <div class="relative aspect-square overflow-hidden">
            <img :src="product.photo_1" :alt="product.product_name" class="w-full h-full object-cover"/>
            <button @click.stop="toggleFavorite(product)" :class="['absolute top-3 right-3 p-2 rounded-full glass transition-colors', product.isFavorite ? 'text-red-500' : 'text-neutral-600']">
              <Heart size="18" :fill="isFavorite(product.name) ? 'pink' : 'none'" />
            </button>
          </div>
          <div class="p-3 flex flex-col flex-1">
            <h5 class="font-bold text-neutral-800 text-sm m-0">{{ product.product_name }}</h5>
            <p class="text-[10px] text-neutral-400 my-1 uppercase tracking-tight" v-if="product.category_name">{{ product.category_name }}</p>
            <div class="flex items-center justify-between mt-auto">
              <span class="font-bold text-accent">{{ formatPrice(product.price) }}</span>
              <button @click.stop class="p-1.5 bg-neutral-900 text-white rounded-xl">
                <Plus size="16"/>
              </button>
            </div>
          </div>
        </div>
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
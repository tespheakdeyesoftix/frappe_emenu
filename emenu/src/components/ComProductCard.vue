<template>
    <div class="h-full">
<div v-if="view === 'list'" class="flex gap-4 p-3 bg-white rounded-3xl shadow-sm border border-neutral-100 items-center">
          <img :src="product.photo_1" :alt="product.product_name" class="w-24 h-24 rounded-2xl object-cover flex-shrink-0"/>
          <div class="flex-1 min-w-0">
            <h5 class="font-bold text-neutral-800 truncate text-sm">{{ product.product_name }}</h5>
            <p class="text-xs text-neutral-400 mb-2" v-if="product.category_name">{{ product.category_name }}</p>
            <div class="flex items-center justify-between">
             <span class="font-bold text-orange-500 text-sm">
  {{ formatPrice(product.price) }}
</span>
               <button @click.stop="toggleFavorite(product)" :class="['absolute top-3 right-3 p-2 rounded-full glass transition-colors', product.isFavorite ? 'text-red-500' : 'text-neutral-600']">
              <Heart size="18" :fill="isFavorite(product.name) ? 'red' : 'none'" />
            </button>
            </div>
          </div>
        </div>

        <!-- Grid View -->
        <div v-else class="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col h-full">
          <div class="relative aspect-square overflow-hidden">
            <img :src="product?.photo_1" :alt="product.product_name" class="w-full h-full object-cover"/>
            <button @click.stop="toggleFavorite(product)" :class="['absolute top-3 right-3 p-2 rounded-full glass transition-colors', product.isFavorite ? 'text-red-500' : 'text-neutral-600']">
              <Heart size="18" :fill="isFavorite(product.name) ? 'red' : 'none'" />
            </button>
          </div>
          <div class="p-3 flex flex-col flex-1">
            <h5 class="font-bold text-neutral-800 text-sm m-0" style="margin:0;">{{ product.product_name }}</h5>
            <p class="text-[10px] text-neutral-400 my-1 uppercase tracking-tight" v-if="product.category_name">{{ product.category_name }}</p>
            <div class="flex items-center justify-between mt-auto">
           <span class="font-bold text-orange-500 text-sm">
  {{ formatPrice(product.price) }}
</span>

            </div>
          </div>
        </div>


    </div>
</template>
    <script setup>

import { ref } from "vue"
import { Heart } from "lucide-vue-next"
import { useApp } from "@/hooks/useApp.js"

    const props = defineProps({
        product:Object,
        view:{
            type:String,
            default:"grid"
        }
    })
const {
  isFavorite ,
  addToFavorite
} = useApp()


function toggleFavorite(product) {
 addToFavorite(product.name)


}

function formatPrice(price) {
  if (!price) return "$0"
  return `$${Number(price).toLocaleString()}`
}

</script>

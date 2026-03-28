<template>
    <ion-page>
        <ion-content>
{{ business_info }}
  <div class="pb-0 main-background">
  
    <header class="px-4 pt-8 pb-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent/20">
          <ShoppingBag size="24" />
        </div>
        <div>
          <h1 class="font-bold text-xl tracking-tight">TechDrive</h1>
          <p class="text-xs text-neutral-400 font-medium">Premium Vehicles & Tech</p>
        </div>
      </div>
      <button class="p-3 glass rounded-2xl text-neutral-600">
        <Search size="20" />
      </button>
    </header>

     
    <section class="px-4 py-4">
      <div class="relative rounded-3xl overflow-hidden min-h-[280px] bg-neutral-900 shadow-xl flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200"
          alt="Hero"
          class="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div class="relative z-10 p-6 flex-1 flex flex-col justify-center">
          <h2 class="text-white text-3xl font-bold mb-2 leading-tight">
            Drive the Future.<br />Power your Life.
          </h2>
          <p class="text-white/70 text-sm mb-6 max-w-[240px]">
            Explore our curated collection of high-performance vehicles and cutting-edge electronics.
          </p>
          <div class="flex gap-3">
            <button class="bg-accent text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-accent/30 active:scale-95 transition-transform">
              Explore Now
            </button>
            <button class="glass-dark text-white px-4 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-transform flex items-center gap-2">
              <Send size="16" /> Contact
            </button>
          </div>
        </div>

        <div class="relative z-10 glass-dark border-t border-white/10 px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white/10 rounded-lg text-white/80"><MapPin size="14" /></div>
            <div class="text-[10px] text-white/60">
              <p class="font-bold text-white/90">Main Showroom</p>
              <p>123 Tech Blvd, Silicon Valley</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white/10 rounded-lg text-white/80"><Clock size="14" /></div>
            <div class="text-[10px] text-white/60 text-right">
              <p class="font-bold text-white/90">Open Today</p>
              <p>09:00 - 21:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>

   
    <section class="py-0">
      <div class="px-4 mb-4 flex items-center justify-between">
        <h3 class="font-bold text-lg">Featured Today</h3>
        <button class="text-accent text-sm font-bold">View All</button>
      </div>
	  <div class="px-4">
			<Featured />
	  </div>
    </section>

   
    <section class="px-4 py-4">
		<ComProductList :products="products" />
    </section>
	<ion-infinite-scroll @ionInfinite="loadMore">
      <ion-infinite-scroll-content
        loading-spinner="bubbles"
        loading-text="Loading more products..."
      />
    </ion-infinite-scroll>
  </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { IonPage,IonContent, IonInfiniteScroll,IonInfiniteScrollContent, } from '@ionic/vue'
import Featured from "@/views/home/component/ComFeatured.vue"
import ComProductList from "@/views/home/component/ComProductList.vue"
import { Heart, Grid, List, Plus, ShoppingBag, Send, Search, MapPin, Clock } from 'lucide-vue-next'
import { useApp } from "@/hooks/useApp"
const {business_info} = useApp();
const products = ref([])
const page = ref(0)
const limit = 5

async function loadProducts(){
  const res = await app.getDocList("Products", {
    fields:[
      "category_name",
      "name",
      "product_name",
      "price",
      "photo_1"
    ],
    limit: limit,
    start: page.value * limit
  })

  if(res.data){
     const existingIds = new Set(products.value.map(p => p.name))
    const newData = res.data.filter(p => !existingIds.has(p.name))
    
    products.value.push(...newData)
  }

}

async function loadMore(event){
 console.log('loadMore triggered', page.value)
  page.value++

  await loadProducts()

  event.target.complete()

}

onMounted(async()=>{
  await loadProducts()
})


</script>

<style scoped>
.main-background {
  background: linear-gradient(135deg, #f0f4ff, #d9e2ff);
  min-height: 100vh;
}
.bg-accent { background-color: #4f46e5; } /* example accent */
.glass { background-color: rgba(255,255,255,0.15); backdrop-filter: blur(10px); }
.glass-dark { background-color: rgba(0,0,0,0.3); backdrop-filter: blur(10px); }
</style>

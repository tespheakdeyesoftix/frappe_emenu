<template>
    <ion-page>
        <ion-content>
  <div class="pb-0 main-background">
	<ComHeader />
    <!-- Featured Slider -->
    <section class="py-4">
      <div class="px-4 mb-4 flex items-center justify-between">
        <h3 class="font-bold text-lg">Featured Today</h3>
        <!-- <button class="text-accent text-sm font-bold">View All</button> -->
      </div>
	  <div class="px-4">
			<Featured />
	  </div>
    </section>

    <!-- Products List -->
    <section class="px-4 py-4">
		<ComProductList :products="products" />
    </section>
  </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import { IonPage,IonContent } from '@ionic/vue'
import Featured from "@/views/home/component/ComFeatured.vue"
import ComProductList from "@/views/home/component/ComProductList.vue"
import ComHeader from "@/views/home/component/ComHeader.vue"

const products = ref([])

async function getProducts() {
	const res = await app.getDocList('Products',{
		fields: ['name', 'product_name', 'price', 'photo_1', 'category_name'],
	})
	if (res.data) products.value = res.data
}

onMounted(() => {
	getProducts()
})

</script>

<style scoped>
.main-background {
  background: linear-gradient(135deg, #f0f4ff, #d9e2ff);
  /* light blueish gradient */
  min-height: 100vh;
}
.bg-accent { background-color: #4f46e5; } /* example accent */
.glass { background-color: rgba(255,255,255,0.15); backdrop-filter: blur(10px); }
.glass-dark { background-color: rgba(0,0,0,0.3); backdrop-filter: blur(10px); }
</style>

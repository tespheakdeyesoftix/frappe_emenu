<template>
    <ion-page>
        <ion-content>
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh">
				<ion-refresher-content />
			</ion-refresher>
  <div class="pb-0 main-background">
	<ComHeader />
    <!-- Featured Slider -->
    <section class="py-4">
      <div class="px-4 mb-2 flex items-center justify-between">
        <h3 class="font-bold text-lg">{{t("Featured Today")}}</h3>
        <!-- <button class="text-accent text-sm font-bold">View All</button> -->
      </div>
	  <div class="px-4">
			<Featured />
	  </div>
    </section>

    <!-- Products List -->
    <section class="px-4 py-4">
		<ComProductList :products="products" @load-more="loadMore" :has-more="hasMore" />
    </section>
  </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import { IonPage,IonContent,IonRefresher, IonRefresherContent } from '@ionic/vue'
import Featured from "@/views/home/component/ComFeatured.vue"
import ComProductList from "@/views/home/component/ComProductList.vue"
import ComHeader from "@/views/home/component/ComHeader.vue"

const products = ref([])
const page = ref(1)
const pageSize = 10
const hasMore = ref(true)

async function getProducts(reset = false) {
  const res = await app.getDocList('Products', {
    fields: ['name', 'product_name', 'price', 'photo_1', 'category_name'],
	filters: [['published', '=', 1]],
    limit: pageSize,
    limit_start: (page.value - 1) * pageSize,
  })

  if (res.data) {
    if (reset) {
      products.value = res.data
    } else {
      products.value.push(...res.data)
    }
    hasMore.value = res.data.length === pageSize

    // ✅ Auto-load next page if content doesn't fill screen
    if (reset && hasMore.value) {
      page.value++
      await getProducts()
    }
  }
}

async function loadMore(event) {
  page.value++
  await getProducts()
  event.target.complete()
}

async function handleRefresh(event) {
  page.value = 1;
  hasMore.value = true;
  products.value = [];       // clear first
  await getProducts(true);
  event.target.complete();
}

onMounted(() => {
	getProducts(true)
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

<template>
<ion-page>
    <ion-content>
		<ion-refresher slot="fixed" @ionRefresh="handleRefresh">
			<ion-refresher-content />
		</ion-refresher>
		<div class="px-4 py-5">
			<h2 style="margin: 0;">{{t("Favorite")}}</h2>
			<div v-if="data.length > 0">
			<div class="flex justify-end mb-2">
				<div class="inline-flex bg-neutral-100 p-1 rounded-xl w-fit gap-1">
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

				<div :class="['grid gap-4', viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1']">
					  <div
						v-for="product in data.filter((r) => favorites.includes(r.name))" :key="product.name"
						class="relative cursor-pointer"
						@click="handleProductClick(product)"
					  >
					  <ComProductCard :product="product" :view="viewMode"/>
					  </div>
				</div>
			</div>

			<div v-else class="text-center py-16 text-neutral-400">
				<p class="text-sm">No products found.</p>
			</div>
		</div>
    </ion-content>
</ion-page>
</template>
    <script setup>
    import {ref} from "vue"
	import { Heart, Grid, List, Plus ,Table, Menu} from "lucide-vue-next"
    import { IonContent,IonPage,onIonViewDidEnter,IonRefresher,IonRefresherContent } from '@ionic/vue';
    import { useApp } from '@/hooks/useApp';
	import { useRouter } from 'vue-router';
	import ComProductCard from "@/components/ComProductCard.vue"

	import { useViewMode } from "@/hooks/useViewMode.js"
	const { viewMode, setViewMode } = useViewMode()

    const { favorites,isFavorite,addToFavorite,isInitializeFavorite } = useApp();
    const data = ref([])
	// const viewMode = ref("grid")
	const router = useRouter()

onIonViewDidEnter(async () => {
	if(!isInitializeFavorite.value){
		const _favorites = localStorage.getItem("favorites") || "[]"
        if (_favorites){
            favorites.value = JSON.parse(_favorites)
        }
		await loadFavorites()
		isInitializeFavorite.value = true
	}
})

async function loadFavorites(reset = false) {
    const res = await app.getDocList("Products", {
        fields: ["name", "product_name", "price", "photo_1","published"],
        filters: [["name", "in", favorites.value], ["published", "=", 1]],
    })
    if (res.data) {
        data.value = res.data
    }
}

async function handleRefresh(event) {
    await loadFavorites(true)
    event.target.complete()
}

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

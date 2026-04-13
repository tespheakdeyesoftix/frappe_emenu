<template>
	<ion-page>
		<ion-content ref="contentRef" :scroll-events="true" @ionScroll="onScroll">
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh">
				<ion-refresher-content />
			</ion-refresher>
			<div class="pb-0 main-background">
				<ComHeader />
				<!-- Featured Slider -->
				<section class="py-4">
				<div class="px-4 mb-2 flex items-center justify-between">
					<h3 class="font-bold text-lg">{{t("Featured Today")}}</h3>
				</div>
				<!-- Featured -->
				<div class="px-4">
					<Featured />
				</div>
				</section>
				<!-- tag -->
				<section class="px-4">
					<h2 class="py-3">{{t("Filter By Tags")}}</h2>
					<ComTag />
				</section>

				<!-- Default -->
				<section class="px-4 py-4" v-if="business_info.choose_template === 'Default'">
					<ComProductList :products="products" @load-more="loadMore" :has-more="hasMore" />
				</section>
				<!-- Template2 -->
				<section v-if="business_info.choose_template === 'Template1'">
					<Template2 />
				</section>
			</div>
		</ion-content>
		<ComScrollToTop v-if="showScrollButton" @scrollToTop="scrollToTop" />
	</ion-page>
</template>

<script setup>
	import { ref, computed,onMounted } from 'vue'
	import { IonPage,IonContent,IonRefresher, IonRefresherContent } from '@ionic/vue'
	import Featured from "@/views/home/component/ComFeatured.vue"
	import ComProductList from "@/views/home/component/ComProductList.vue"
	import ComHeader from "@/views/home/component/ComHeader.vue"
	import ComScrollToTop from "@/layout/ComScrollToTop.vue"
	import ComTag from "@/views/home/component/ComTag.vue"
	import Template2 from "@/views/home/Template2/Template2.vue"
	import { useApp } from "@/hooks/useApp.js"

	const products = ref([])
	const page = ref(1)
	const pageSize = 10
	const hasMore = ref(true)
	const contentRef = ref(null)
	const showScrollButton = ref(false)

	const { business_info } = useApp()

	async function getProducts(reset = false) {
	const res = await app.getDocList('Products', {
		fields: ['name', 'product_name', 'price', 'photo_1', 'category_name'],
		filters: [['published', '=', 1]],
		orderBy: {
			field: 'sort_order',
			order: 'asc'
		},
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
		products.value = [];
		await getProducts(true);
		event.target.complete();
	}

	const onScroll = (event) => {
		showScrollButton.value = event.detail.scrollTop > 100
	}

	const scrollToTop = async () => {
		if (contentRef.value) {
			await contentRef.value.$el.scrollToTop(500) // smooth scroll
		}
	}

	onMounted(async () => {
		getProducts(true)
	})
</script>

<style scoped>
	.main-background {
		background: linear-gradient(135deg, #f0f4ff, #d9e2ff);
		min-height: 100vh;
	}
	.bg-accent { background-color: #4f46e5; }
	.glass { background-color: rgba(255,255,255,0.15); backdrop-filter: blur(10px); }
	.glass-dark { background-color: rgba(0,0,0,0.3); backdrop-filter: blur(10px); }

	.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
	.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

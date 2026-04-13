<template>
	<div class="page pt-3">
		<div class="mx-4 mb-2 flex items-center justify-between ">
			<h2>{{t("Product By Category")}}</h2>
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

		<!-- Top category tabs -->
		<div class="tab-bar">
			<div
				v-for="cat in category"
				:key="cat.name"
				class="tab-item"
				:data-name="cat.name"
				:class="{ active: activeSection === cat.name }"
				@click="scrollToSection(cat.name)"
			>
				<img v-if="cat.photo" :src="cat.photo" class="tab-thumb" />
				<span class="tab-label">{{ cat.category_name }}</span>
			</div>
    	</div>

		<!-- display products -->
		<section
			v-for="cat in productByCategory"
			:key="cat.name"
			:ref="el => { if (el) sectionRefs[cat.name] = el }"
			class="category-section px-4"
		>
			<!-- Section title -->
			<div class="section-header">
			<h2 class="section-title">{{ cat.category_name }}</h2>
			</div>

			<!-- Empty state -->
			<div v-if="cat.products.length === 0" class="empty-state">
				{{t("No products available")}}
			</div>

			<!-- Product grid -->
			<div :class="['grid gap-4', viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1']">
				<div
					v-for="product in cat.products"
					:key="product.name"
					class="product-card"
					@click="handleProductClick(product)"
				>
					<ComProductCard :product="product" :view="viewMode"/>
				</div>
			</div>
      </section>
	</div>
</template>

<script setup>
import { ref, onMounted,onBeforeUnmount, nextTick } from "vue"
import ComProductCard from "@/components/ComProductCard.vue"
import { Grid, List } from "lucide-vue-next"
import { useViewMode } from "@/hooks/useViewMode.js"
import { useRouter } from "vue-router"

const router = useRouter()
const { viewMode, setViewMode } = useViewMode()
const productByCategory = ref([])
const category = ref([])
const activeSection = ref(null)
const sectionRefs = ref({})
let observer = null
let isScrollingByClick = false
let scrollTimer = null

async function getCategory(){
	const res = await app.getDocList('Product Category', {
		fields: ['name', 'category_name', 'photo','total_products'],
		filters: [['published', '=', 1]],
		orderBy: {
			field: 'sort_order',
			order: 'asc'
		},
	})
	if(res.data){
		category.value = res.data
		if (res.data.length > 0) activeSection.value = res.data[0].name
	}
}

async function getCategoryByProduct(){
	const res = await app.getApi('frappe_emenu.api.get_product_by_category')
	if(res.data){
		productByCategory.value = res.data
	}
}

function scrollToSection(name) {
  isScrollingByClick = true
  activeSection.value = name

  sectionRefs.value[name]?.scrollIntoView({ behavior: 'smooth' })

  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    isScrollingByClick = false
  }, 800)
}

function setupObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      if (isScrollingByClick) return

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const match = Object.entries(sectionRefs.value)
            .find(([, el]) => el === entry.target)
          if (match) {
            activeSection.value = match[0]
            const tab = document.querySelector(`.tab-item[data-name="${match[0]}"]`)
            tab?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
          }
        }
      })
    },
    { threshold: 0.25 }
  )
  Object.values(sectionRefs.value).forEach(el => observer.observe(el))
}

onMounted( async() => {
	await getCategory()
	await getCategoryByProduct()

	await nextTick()
  	setupObserver()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(scrollTimer)
})

function handleProductClick(product) {
  router.push(`/product-detail/${product.name}`)
}

</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
}

.tab-bar {
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: white;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px 16px;
	border-bottom: 2px solid #e0e0e0;
	overflow-x: auto;
	flex-shrink: 0;
	scrollbar-width: none;
}

.tab-bar::-webkit-scrollbar {
  display: none;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1.5px solid #ddd;
  background: #fff;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s;
}

.tab-item:hover {
  border-color: #c0392b;
  color: #c0392b;
}

.tab-item.active {
  background: #c0392b;
  border-color: #c0392b;
  color: #fff;
}

.tab-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255,255,255,0.3);
}

.tab-item.active .tab-thumb {
  /* filter: brightness(0) invert(1); */
}

.tab-label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: inherit;
}

.category-section {
  margin-bottom: 48px;
}

.section-header {
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 2px solid #e0e0e0;
  text-align: center;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

/* ── Product grid ── */
.product-grid {
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  gap: 16px;
}

.product-card {
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-2px);
}

/* Product image */
.product-image-wrap {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f0f0f0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-installment {
  font-size: 11px;
  color: #999;
}

/* ── Empty state ── */
.empty-state {
  padding: 40px;
  text-align: center;
  color: #bbb;
  font-size: 13px;
  background: #fff;
  border-radius: 12px;
  border: 1px dashed #ddd;
}
</style>

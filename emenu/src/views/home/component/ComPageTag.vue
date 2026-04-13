<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ t("Product By Tag") }} - {{ TagName }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
		<div class="px-4 py-5">

			<div class="mb-3">
				<ComTag  routeAction="replace"/>
			</div>
			
			<div class="flex justify-end">
				<div class="inline-flex bg-neutral-100 p-1 rounded-xl gap-1 mb-3">
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

			

			<!-- Empty State -->
			<div v-if="productBytag.length === 0" class="ion-text-center ion-padding">
				<p>No products found for tag: {{ TagName }}</p>
			</div>

			<!-- Product List -->
			<div v-else :class="['grid gap-4', viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1']">
				<div v-for="product in productBytag" :key="product.name" @click="handleProductClick(product)" class="relative cursor-pointer h-full">
					<ComProductCard :product="product" :view="viewMode" />
				</div>
			</div>
		</div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import {  Grid, List} from "lucide-vue-next"
import {
  IonPage, IonHeader, IonTitle, IonToolbar, IonContent,
  IonButtons, IonBackButton
} from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ComProductCard from "@/components/ComProductCard.vue"
import ComTag from "@/views/home/component/ComTag.vue"
import { useViewMode } from "@/hooks/useViewMode.js"
const { viewMode, setViewMode } = useViewMode()


const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const TagName = route.params.name;
const productBytag = ref([])
const loading = ref(false)
const error = ref(null)

const isNoTagsFilter = TagName === 'No Tags'

async function getProductByTag() {
  loading.value = true
  error.value = null

  try {
    let res

    if (isNoTagsFilter) {
      res = await app.getDocList('Products', {
        fields: ['name', 'product_name', '_user_tags', 'photo_1', 'price'],
        filters: [
          ['published', '=', 1],
          ['_user_tags', 'in', ['', null]],
        ],
        limit: 100,
      })
    } else {
      res = await app.getDocList('Products', {
        fields: ['name', 'product_name', '_user_tags', 'photo_1', 'price'],
        filters: [
          ['published', '=', 1],
          ['_user_tags', 'like', `%${TagName}%`],
        ],
        limit: 100,
      })
    }

    const data = res?.data ?? res ?? []

    if (isNoTagsFilter) {
      productBytag.value = data.filter(p => !p._user_tags || p._user_tags.trim() === '')
    } else {
      productBytag.value = data.filter(product => {
        if (!product._user_tags) return false
        const tags = product._user_tags
          .split(',')
          .map(tag => tag.trim().toLowerCase())
        return tags.includes(TagName.trim().toLowerCase())
      })
    }

  } catch (err) {
    error.value = err.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getProductByTag()
})


function handleProductClick(product) {
  router.push(`/product-detail/${product.name}`)
}

</script>

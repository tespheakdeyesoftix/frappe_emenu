<template>
  <ion-modal
    :is-open="isOpen"
    :initial-breakpoint="0.9"
    :breakpoints="[0, 0.9, 1]"
    @did-present="focusInput"
    @did-dismiss="$emit('close')"
  >
    <ion-header>
      <ion-toolbar>
        <ion-searchbar
          ref="searchbarRef"
          v-model="query"
          :placeholder="t('Search...')"
          :debounce="300"
          @ion-input="onSearch"
          @ion-clear="onClear"
        />
        <ion-buttons slot="end">
          <ion-button @click="$emit('close')">{{ t('Cancel') }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

	<div class="pt-4 px-4">
		<ComTag />
	</div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <ion-spinner name="crescent" />
      </div>

       <div v-else-if="results.length" class=" p-3">
        <div
          v-for="item in results"
          :key="item.name"
          @click="selectItem(item)"
        >
          <ComProductCard :product="item" view="list" />
        </div>
      </div>

      <!-- No results -->
      <div v-else-if="query && !loading" class="flex flex-col items-center py-16 gap-3">
        <Search :size="40" class="text-neutral-300" />
        <p class="text-neutral-400 text-sm">{{ t('No results for') }} "<strong>{{ query }}</strong>"</p>
      </div>

      <!-- Initial hint -->
      <div v-else class="flex flex-col items-center py-16 gap-3">
        <Search :size="40" class="text-neutral-300" />
        <p class="text-neutral-400 text-sm">{{ t('Type to search...') }}</p>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup>
import { ref,watch } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { Search } from 'lucide-vue-next'
import {
  IonModal, IonHeader, IonToolbar, IonSearchbar,
  IonButtons, IonButton, IonContent, IonList,
  IonItem, IonLabel, IonSpinner, IonThumbnail, IonNote
} from '@ionic/vue'

import ComTag from "@/views/home/component/ComTag.vue"
import debounce from 'lodash/debounce'
import ComProductCard from '@/components/ComProductCard.vue'
const route = useRoute()

watch(() => route.fullPath, () => {
  emit('close')
})

defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])

const router = useRouter()
const searchbarRef = ref()
const query = ref('')
const results = ref([])
const loading = ref(false)

const focusInput = () => {
  searchbarRef.value?.$el?.setFocus()
}

const onClear = () => {
  query.value = ''
  results.value = []
}

const fetchResults = debounce(async (val) => {
  loading.value = true
  try {
    const res = await app.getDocList('Products', {
      fields: ['name', 'product_name', 'category_name', 'price', 'photo_1'],
      orFilters: [
        ['Products', 'name','like', `%${val}%`],
        ['Products', 'product_name','like', `%${val}%`],
        ['Products', 'category_name','like', `%${val}%`],
        ['Products', 'price', 'like', `%${val}%`],
      ],
	  filters: [['published', '=', 1]],
      limit: 20,
    })

    results.value = res.data || []
  } catch (err) {
    // console.error('Search error:', err)
    results.value = []
  } finally {
    loading.value = false
  }
}, 700)

const onSearch = (e) => {
  const val = e.target?.value?.trim()
  if (!val) { results.value = []; return }
  fetchResults(val)
}

const selectItem = (item) => {
  emit('close')
   router.push(`product-detail/${item.name}`)
}
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="categories-container">
        <h1 class="categories-title">Categories</h1>
        <div class="categories-list">
          <div
            v-for="category in categories"
            :key="category.name"
            class="category-card"
            @click="goToCategory(category)"
          >
            <img
              v-if="category.photo"
              :src="category.photo"
              class="card-image"
              alt=""
            />
            <div v-else class="card-image card-placeholder" />
            <div class="card-overlay" />
            <div class="arrow-btn">
              <ion-icon :icon="arrowForward" />
            </div>
            <div class="card-content">
              <h2 class="card-title">{{ category.category_name }}</h2>
              <p class="card-count">{{ category.product_count || 0 }} PRODUCTS</p>
            </div>
          </div>
        </div>
      </div>
	  <ion-infinite-scroll
        @ionInfinite="loadMore"
        threshold="100px"
        :disabled="!hasMore"
      >
        <ion-infinite-scroll-content
          loading-spinner="crescent"
          loading-text="Loading..."
        />
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { IonContent, IonPage, IonIcon,IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue'
import { arrowForward } from 'ionicons/icons'
import { useRouter } from 'vue-router'
const router = useRouter()
const page = ref(1)
const pageSize = 10
const hasMore = ref(true)
const categories = ref([])
async function getCategories(pageNumber = 1) {
  const res = await app.getDocList('Product Category', {
    fields: ['name', 'category_name', 'photo'],
    limit: pageSize,
    limit_start: (pageNumber - 1) * pageSize
  })

  const items = res.data || res.docs || []

  if (items.length) {
    categories.value = pageNumber === 1 ? items : [...categories.value, ...items]
    hasMore.value = items.length === pageSize
  } else {
    hasMore.value = false
  }
}

function goToCategory(category) {
  router.push({
    path: `/category-product/${category.name}`
  })
}

async function loadMore(event) {
  if (!hasMore.value) {
    event.target.complete()
    return
  }

  page.value++
  const res = await getCategories(page.value)
  event.target.complete()
}
onMounted(() => {
  getCategories()
})
</script>

<style scoped>

ion-content {
  --background: #f5f5f5;
}

.categories-container {
  padding: 16px 12px;
  min-height: 100%;
  box-sizing: border-box;
}

.categories-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 4px;
  font-family: 'Georgia', serif;
  letter-spacing: -0.5px;
}

.categories-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.category-card {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-card:active {
  transform: scale(0.98);
}

@media (min-width: 640px) {
  .categories-container {
    padding: 20px 16px;
  }
  .categories-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .category-card {
    height: 180px;
  }
}

@media (min-width: 1024px) {
  .categories-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 36px 32px;
  }
  .categories-title {
    font-size: 32px;
    margin-bottom: 24px;
  }
  .categories-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
  .category-card {
    height: 210px;
    border-radius: 18px;
  }
  /* hover effects only on desktop */
  .category-card:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.2);
  }
  .category-card:hover .card-image {
    transform: scale(1.06);
  }
  .category-card:hover .arrow-btn {
    background: rgba(255, 255, 255, 0.48);
    transform: translateX(2px);
  }
}

@media (min-width: 1400px) {
  .categories-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card-placeholder {
  background: linear-gradient(135deg, #ccc, #999);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.70) 0%,
    rgba(0, 0, 0, 0.22) 45%,
    rgba(0, 0, 0, 0.04) 100%
  );
}

.arrow-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.26);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
  z-index: 2;
  transition: background 0.2s ease, transform 0.2s ease;
}

.card-content {
  position: absolute;
  bottom: 14px;
  left: 16px;
  z-index: 2;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 3px 0;
  font-family: 'Georgia', serif;
  letter-spacing: -0.3px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
  line-height: 1.2;
}

@media (min-width: 1024px) {
  .card-title {
    font-size: 22px;
  }
}

.card-count {
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
  letter-spacing: 1.3px;
  text-transform: uppercase;
}
</style>

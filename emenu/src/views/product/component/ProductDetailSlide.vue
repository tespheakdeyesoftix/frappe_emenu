<template>
  <div>
   <swiper
  :spaceBetween="20"
  :centeredSlides="true"
  :autoplay="{
    delay: 2500,
    disableOnInteraction: false,
  }"
  :pagination="{ clickable: true }"
  :navigation="false"
  :modules="modules"
  :breakpoints="{
    0: { slidesPerView: 1, spaceBetween: 12 },
    640: { slidesPerView: 1, spaceBetween: 16 },
    1024: { slidesPerView: 1, spaceBetween: 24 },
  }"
  class="mySwiper"
>
  <swiper-slide v-for="(img, index) in images" :key="index">
    <div class="slide-card">
      <img :src="img || business_info.placeholder_image" :alt="productDetail.product_name" />
    </div>

  </swiper-slide>
  	
</swiper>
<!-- {{ business_info.placeholder_image }} -->
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { computed  } from 'vue'

import { useApp } from '@/hooks/useApp.js'

export default {
  components: { Swiper, SwiperSlide },
    props: {
    	productDetail: Object
  	},
  setup(props) {
	const { business_info} = useApp()
	// const images = computed(() => {
    //   return [
    //     props.productDetail?.photo,
    //     props.productDetail?.photo_1,
    //     props.productDetail?.photo_2,
    //     props.productDetail?.photo_3,
    //     props.productDetail?.photo_4,
    //     props.productDetail?.photo_5
    //   ].filter(Boolean) // remove null/undefined
    // })
	const images = computed(() => {
  const photos = [
    props.productDetail?.photo,
    props.productDetail?.photo_1,
    props.productDetail?.photo_2,
    props.productDetail?.photo_3,
    props.productDetail?.photo_4,
    props.productDetail?.photo_5
  ].filter(Boolean)

  // ✅ if no photos at all, use placeholder
  return photos.length ? photos : [business_info.value.placeholder_image]
})
    return {
      modules: [Autoplay, Pagination],
      images,
	  business_info
    }
  }
}
</script>

<style scoped>
.mySwiper {
  width: 100%;

}

/* .slide-card {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  height: 220px;
} */

/* Tablet */
@media (min-width: 640px) {
  .slide-card {
    height: 280px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .slide-card {
    height: 360px;
  }
}

.slide-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Dark gradient overlay */
.slide-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.70) 0%,
    rgba(0, 0, 0, 0.25) 45%,
    transparent 75%
  );
  border-radius: 16px;
}

.slide-info {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 10;
  text-align: left;
}

@media (min-width: 1024px) {
  .slide-info {
    bottom: 24px;
    left: 24px;
  }
}

.slide-info h3 {
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 4px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  line-height: 1.3;
}

@media (min-width: 640px) {
  .slide-info h3 {
    font-size: 18px;
  }
}

@media (min-width: 1024px) {
  .slide-info h3 {
    font-size: 22px;
    margin-bottom: 6px;
  }
}

.slide-info p {
  color: #ff6b35;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
}

@media (min-width: 640px) {
  .slide-info p {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .slide-info p {
    font-size: 18px;
  }
}

/* Pagination dots */
:deep(.swiper-pagination) {
  bottom: 10px;
   z-index: 20;
}

:deep(.swiper-pagination-bullet) {
  width: 7px;
  height: 7px;
  background: rgba(0, 0, 0, 0.25);
  opacity: 1;
  transition: transform 0.2s, background 0.2s;
}

:deep(.swiper-pagination-bullet-active) {
  background: #ff6b35;
  transform: scale(1.3);
}

/* Change .slide-card border-radius to 0 */
.slide-card {
  position: relative;
  width: 100%;
  border-radius: 0;   /* ← was 16px */
  overflow: hidden;
  height: 360px;
}

/* Also remove border-radius from the ::after overlay */
.slide-card::after {
  border-radius: 0;   /* ← was 16px */
}
</style>
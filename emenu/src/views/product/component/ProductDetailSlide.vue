<template>
	<div>
		<swiper
			:key="images.length"
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
					<img
						:src="img"
						:alt="productDetail?.product_name"
						loading="lazy"
						@click="openFullscreen(index)"
						 @load="onImageLoad"
						 @error="onImageError"
					/>
				</div>
			</swiper-slide>
		</swiper>
		<div v-if="isOpen" class="fullscreen">
			<swiper
				key="fullscreen-swiper"
				:initialSlide="activeIndex"
				:spaceBetween="20"
				:navigation="true"
				:pagination="{ clickable: true }"
				:zoom="true"
				:modules="modules"
				class="fullscreen-swiper"
			>
				<swiper-slide v-for="(img, i) in images" :key="i">
					<div class="swiper-zoom-container">
						<img :src="img || business_info?.value?.placeholder_image" />
					</div>
				</swiper-slide>
			</swiper>

			<button class="close-btn" @click="closeFullscreen">✕</button>
		</div>
	</div>
</template>

<script>
import { ref,computed,watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/zoom'

import { Autoplay, Pagination,Navigation,Zoom } from 'swiper/modules'
import { useApp } from '@/hooks/useApp.js'

export default {
	components: { Swiper, SwiperSlide },
		props: {
			productDetail: Object
		},
		emits: ['images-loaded'],
	setup(props, { emit }) {
		const isOpen = ref(false)
		const activeIndex = ref(0)
		const loadedCount = ref(0)

		const { business_info} = useApp()

		const openFullscreen = (index) => {
			setTimeout(() => {
				activeIndex.value = index
				isOpen.value = true
			}, 50)
		}

		const closeFullscreen = () => {
			isOpen.value = false
		}

		const images = computed(() => {
			const p = props.productDetail
			const photos = [
				p?.photo,
				p?.photo_1,
				p?.photo_2,
				p?.photo_3,
				p?.photo_4,
				p?.photo_5
			].filter(img => img && img !== '')

			if (photos.length > 0) return photos

  			// fallback ONLY if no product OR still loading
			return business_info.value?.placeholder_image
				? [business_info.value.placeholder_image]
				: []
		})

		watch(() => props.productDetail, () => {
			loadedCount.value = 0
		})
		const checkAllLoaded = () => {
			if (images.value.length === 0 || loadedCount.value >= images.value.length) {
				emit('images-loaded')
			}
		}
		const onImageLoad = () => {
			loadedCount.value++
			checkAllLoaded()
		}

		const onImageError = () => {
			loadedCount.value++ // count errors so loader never hangs
			checkAllLoaded()
		}

		return {
			modules: [Autoplay, Pagination, Navigation, Zoom],
			images,
			business_info,
			isOpen,
			activeIndex,
			openFullscreen,
			closeFullscreen,
			onImageLoad,
  			onImageError,
		}
  	}
}
</script>

<style scoped>

.mySwiper {
  width: 100%;
}

.slide-card img {
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
  z-index: 1;
  pointer-events: none;
  border-radius: 16px;
}

.slide-info {
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 10;
  text-align: left;
}

.slide-info h3 {
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 4px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  line-height: 1.3;
}

/* Tablet */
@media (min-width: 640px) {
  .slide-info h3 {
    font-size: 18px;
  }
  .slide-card {
    height: 280px;
  }
  .slide-info p {
    font-size: 16px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .slide-info h3 {
    font-size: 22px;
    margin-bottom: 6px;
  }
  .slide-card {
    height: 360px;
  }
  .slide-info p {
    font-size: 18px;
  }
  .slide-info {
    bottom: 24px;
    left: 24px;
  }
}

.slide-info p {
  color: #ff6b35;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
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
  border-radius: 0;
  overflow: hidden;
  height: 360px;
}

/* Also remove border-radius from the ::after overlay */
.slide-card::after {
  border-radius: 0;
}

.fullscreen {
	position: fixed;
	inset: 0;
	background: black;
	z-index: 9999;
}

.fullscreen-swiper {
	width: 100%;
	height: 100vh;
}

.fullscreen-swiper .swiper-slide {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}


/* ZOOM CONTAINER */
.swiper-zoom-container {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.fullscreen-swiper img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

/* CLOSE BUTTON */
.close-btn {
	position: absolute;
	top: 20px;
	right: 20px;
	z-index: 10000;
	background: rgba(0,0,0,0.6);
	color: white;
	border: none;
	font-size: 24px;
	padding: 8px 12px;
	border-radius: 8px;
	cursor: pointer;
}
</style>

<template>
	<div class="swiper-wrapper-outer">
		<div v-if="isLoading" class="skeleton-wrapper">
			<div class="skeleton-img shimmer"></div>
			<div class="skeleton-dots">
				<span v-for="n in 3" :key="n" class="skeleton-dot shimmer"></span>
			</div>
		</div>

		<swiper
			v-show="!isLoading"
			:key="swiperKey"
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
				0:    { slidesPerView: 1, spaceBetween: 12 },
				640:  { slidesPerView: 1, spaceBetween: 16 },
				1024: { slidesPerView: 1, spaceBetween: 24 },
			}"
			class="mySwiper"
		>
			<swiper-slide v-for="(img, index) in images" :key="index">
				<div class="slide-card">
					<img
						:src="img"
						:alt="productDetail?.product_name"
						@click="openFullscreen(index)"
						@load="onImageLoad(index)"
						@error="onImageError(index)"
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
import { ref, computed, watch, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/zoom'

import { Autoplay, Pagination, Navigation, Zoom } from 'swiper/modules'
import { useApp } from '@/hooks/useApp.js'

export default {
	name: 'ProductImageSwiper',
	components: { Swiper, SwiperSlide },
	props: {
		productDetail: {
			type: Object,
			default: null
		}
	},
	emits: ['images-loaded'],

	setup(props, { emit }) {

		const isOpen        = ref(false)
		const activeIndex   = ref(0)
		const isLoading     = ref(true)
		const firstLoaded   = ref(false)
		const swiperKey     = ref(0)
		const loadedIndexes = ref(new Set())

		const { business_info } = useApp()

		const images = computed(() => {
			const p = props.productDetail
			if (!p) return []

			const photos = [
				p?.photo,
				p?.photo_1,
				p?.photo_2,
				p?.photo_3,
				p?.photo_4,
				p?.photo_5
			].filter(img => img && img !== '')

			if (photos.length > 0) return photos

			return business_info.value?.placeholder_image
				? [business_info.value.placeholder_image]
				: []
		})

		watch(
			() => images.value[0],
			(newUrl, oldUrl) => {
				if (newUrl === oldUrl) return

				isLoading.value     = true
				firstLoaded.value   = false
				loadedIndexes.value = new Set()
				swiperKey.value++

				if (!newUrl) {
					nextTick(() => {
						if (images.value.length === 0) {
							isLoading.value = false
							emit('images-loaded')
						}
					})
				}
			},
			{ immediate: true }
		)

		watch(
			() => props.productDetail,
			(val) => {
				if (!val) {
					isLoading.value   = true
					firstLoaded.value = false
					loadedIndexes.value = new Set()
				}
			}
		)

		const onImageLoad = (index) => {
			loadedIndexes.value.add(index)

			if (!firstLoaded.value) {
				firstLoaded.value = true
				isLoading.value   = false   // ← show swiper immediately on first image
			}

			// Emit only when ALL images loaded
			if (loadedIndexes.value.size >= images.value.length) {
				emit('images-loaded')
			}
		}

		const onImageError = (index) => {
			loadedIndexes.value.add(index)

			// Still show swiper even if first image errors
			if (!firstLoaded.value) {
				firstLoaded.value = true
				isLoading.value   = false
			}

			if (loadedIndexes.value.size >= images.value.length) {
				emit('images-loaded')
			}
		}

		const openFullscreen = (index) => {
			setTimeout(() => {
				activeIndex.value = index
				isOpen.value = true
			}, 50)
		}

		const closeFullscreen = () => {
			isOpen.value = false
		}

		return {
			modules: [Autoplay, Pagination, Navigation, Zoom],
			images,
			business_info,
			isOpen,
			isLoading,
			swiperKey,
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

.skeleton-wrapper {
	width: 100%;
	height: 360px;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 16px;
	gap: 8px;
	background: #f0f0f0;
}

.skeleton-img {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
}

.skeleton-dots {
	display: flex;
	gap: 6px;
	z-index: 2;
}

.skeleton-dot {
	width: 7px;
	height: 7px;
	border-radius: 50%;
}

.shimmer {
	background: linear-gradient(
		90deg,
		#e0e0e0 0%,
		#efefef 40%,
		#e0e0e0 80%
	);
	background-size: 300% 100%;
	animation: shimmer 1.6s ease-in-out infinite;
}

@keyframes shimmer {
	0%   { background-position: 100% 0; }
	100% { background-position: -100% 0; }
}

@media (min-width: 640px) {
	.skeleton-wrapper { height: 280px; }
}
@media (min-width: 1024px) {
	.skeleton-wrapper { height: 360px; }
}

.mySwiper {
	width: 100%;
}

.slide-card {
	position: relative;
	width: 100%;
	height: 360px;
	border-radius: 0;
	overflow: hidden;
}

.slide-card img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}

.slide-card::after {
	content: '';
	position: absolute;
	inset: 0;
	z-index: 1;
	pointer-events: none;
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

.slide-info p {
	color: #ff6b35;
	font-size: 14px;
	font-weight: 700;
	margin: 0;
}

@media (min-width: 640px) {
	.slide-card    { height: 280px; }
	.slide-info h3 { font-size: 18px; }
	.slide-info p  { font-size: 16px; }
}

@media (min-width: 1024px) {
	.slide-card     { height: 360px; }
	.slide-info     { bottom: 24px; left: 24px; }
	.slide-info h3  { font-size: 22px; margin-bottom: 6px; }
	.slide-info p   { font-size: 18px; }
}

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

.close-btn {
	position: absolute;
	top: 20px;
	right: 20px;
	z-index: 10000;
	background: rgba(0, 0, 0, 0.6);
	color: white;
	border: none;
	font-size: 24px;
	padding: 8px 12px;
	border-radius: 8px;
	cursor: pointer;
	transition: background 0.2s;
}

.close-btn:hover {
	background: rgba(255, 107, 53, 0.85);
}

</style>

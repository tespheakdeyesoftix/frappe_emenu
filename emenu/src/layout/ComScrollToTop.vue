<template>
	<ion-fab class="scroll-top-fab">
		<ion-fab-button @click="$emit('scrollToTop')">
			<ChevronUp />
		</ion-fab-button>
	</ion-fab>
</template>

<script setup>
import { IonFab, IonFabButton } from '@ionic/vue';
import { ChevronUp } from 'lucide-vue-next'
</script>

<style scoped>
.scroll-top-fab {
	position: absolute;
	bottom: 16px;
	right: 16px; 
	z-index: 1000;
	animation: floatUpDown 2s ease-in-out infinite;
}

@keyframes floatUpDown {
	0% { transform: translateY(0); }
	50% { transform: translateY(-6px); }
	100% { transform: translateY(0); }
}
</style>

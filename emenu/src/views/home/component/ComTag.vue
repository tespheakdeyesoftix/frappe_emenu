<template>
	<div>
		<div ref="scrollContainer" class="flex overflow-x-auto gap-4 whitespace-nowrap select-none cursor-grab"
			@mousedown="startDrag"
			@mousemove="onDrag"
			@mouseup="stopDrag"
			@mouseleave="stopDrag"
		>
			<ion-chip
				v-for="t in tag" :key="t.name"
				class="flex-shrink-0"
				@click="gotoTag(t.name)"
				:style="{ backgroundColor: t.color, color: '#fff' }"
			 >
				<p class="p-3">{{ t.name }} ({{ t.total }})</p>
			</ion-chip>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { IonChip } from '@ionic/vue';
import { useApp } from "@/hooks/useApp.js"

import { useRouter } from 'vue-router'
const router = useRouter()

const { tag } = useApp()
const scrollContainer = ref(null);
const isDragging = ref(false);
const hasDragged = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

function openTag() {
  if (hasDragged.value) return
  showTag.value = false
  setTimeout(() => { showTag.value = true }, 50)
}

function startDrag(e) {
  isDragging.value = true;
  hasDragged.value = false;
  startX.value = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeft.value = scrollContainer.value.scrollLeft;
  scrollContainer.value.classList.replace('cursor-grab', 'cursor-grabbing');
}

function onDrag(e) {
  if (!isDragging.value) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = x - startX.value;
  if (Math.abs(walk) > 5) hasDragged.value = true;
  scrollContainer.value.scrollLeft = scrollLeft.value - walk;
}

function stopDrag() {
  isDragging.value = false;
  scrollContainer.value.classList.replace('cursor-grabbing', 'cursor-grab');
  setTimeout(() => { hasDragged.value = false }, 100)
}

function gotoTag(name) {
  if (hasDragged.value) return;
  router.replace(`/tag/${name}`);
}
</script>

<style scoped>
div {
  -ms-overflow-style: none;
}
div::-webkit-scrollbar {
  display: none;
}
</style>

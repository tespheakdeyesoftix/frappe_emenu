<template>
	<div>
		<div >
			<header class="px-4 pt-6 flex items-center justify-between">
				<div class="flex items-center gap-3" >
					<div class="w-15 h-15 flex items-center rounded-lg justify-center text-white shadow-lg shadow-accent/20">
						 <img :src="business_info.photo" class="rounded-lg"  />
					</div>
					<div>
						<h2 class="font-bold text-xl tracking-tight" style="margin: 0;">{{business_info.business_name}}</h2>
						<p class="text-xs text-neutral-400 font-medium">{{ business_info.slogan }}</p>
					</div>
				</div>
				<div class="flex gap-3">
					<button class="p-3 glass rounded-2xl text-neutral-600" @click="showSearch = true">
						<Search size="20" @click="showSearch = true" />
					</button>
					<Translate />
				</div>
			</header>
			<section class="px-4 py-4" v-if="business_info.show_hero_section > 0">
			<div class="relative rounded-3xl overflow-hidden min-h-[280px] bg-neutral-900 shadow-xl flex flex-col">
				<img
					v-if="business_info.hero_photo"
					:src="business_info.hero_photo"
					alt="Hero"
					class="absolute inset-0 w-full h-full object-cover opacity-50"

				/>
				<img
					v-else
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw2dAVNmBhqVvNPAs7LJHnumSH3pHdoWP0bg&s"
					alt="Hero"
					class="absolute inset-0 w-full h-full object-cover opacity-50"
				/>
				<div class="relative z-10 p-6 flex-1 flex flex-col justify-center">
				<h2 class="text-white text-3xl font-bold mb-2 leading-tight">
					{{ business_info.hero_title }}
				</h2>
				<p class="text-white/70 text-sm mb-6 max-w-[240px]">
					{{ business_info.hero_intro }}
				</p>
				<div class="flex gap-3 justify-center w-full">
					<router-link to="/category" class="flex-1">
						<button  class="bg-accent text-white w-full px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-accent/30 active:scale-95 transition-transform" style="padding: 10px; border-radius: 5px;">
							{{t("Explore Now")}}
						</button>
					</router-link>
					<a
						  v-if="business_info.telegram"
						:href="business_info.telegram.startsWith('http') ? business_info.telegram : 'https://' + business_info.telegram"
						target="_blank"
						class="glass-dark flex-1 w-full text-white font-bold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
						style="padding: 10px; border-radius: 5px; color: white; text-decoration: none;"
						>
						<Send size="16" /> {{ t("Contact") }}
						</a>
				</div>
				</div>

				<div class="relative z-10 glass-dark border-t border-white/10 px-6 py-4 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="p-2 bg-white/10 rounded-lg text-white/80"><MapPin size="14" /></div>
					<div class="text-[10px] text-white/60">
					<p class="font-bold text-white/90">{{t("Address")}}</p>
					<p>{{ business_info.address }}</p>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div class="p-2 bg-white/10 rounded-lg text-white/80"><Clock size="14" /></div>
					<div class="text-[10px] text-white/60 text-right">
					<p class="font-bold text-white/90">{{t("Opening Hours")}}</p>
					<p>{{ business_info.business_hour }}</p>
					</div>
				</div>
				</div>
			</div>
			</section>
		</div>
		<SearchModal :is-open="showSearch" @close="showSearch = false" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Heart, Grid, List, Plus, ShoppingBag, Send, Search, MapPin, Clock } from 'lucide-vue-next'
import { useApp } from "@/hooks/useApp.js"

import Translate from "@/layout/Translate.vue"
import SearchModal from "@/layout/SearchModal.vue"
const showSearch = ref(false)   
const {business_info} =useApp()
</script>

<style scoped>
.main-background {
  background: linear-gradient(135deg, #f0f4ff, #d9e2ff);
  min-height: 100vh;
}
.bg-accent { background-color: #4f46e5; }
.glass { background-color: rgba(255,255,255,0.15); backdrop-filter: blur(10px); }
.glass-dark { background-color: rgba(0,0,0,0.3); backdrop-filter: blur(10px); }
</style>

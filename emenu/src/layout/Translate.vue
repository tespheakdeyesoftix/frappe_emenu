<template>
  <div class="lang-switcher">
    <div class="lang-btn" @click="isOpen = !isOpen">
      <!-- Current Flag Image -->
      <img
        :src="locale === 'km' ? KhmerFlag : EnglishFlag"
        :alt="locale === 'km' ? 'Khmer' : 'English'"
        class="flag-img"
		loading="lazy"
      />
      <!-- {{ locale === 'km' ? 'ភាសាខ្មែរ' : 'English' }} -->

      <!-- Chevron -->
      <ion-icon :icon="isOpen ? chevronUp : chevronDown" />
    </div>

    <div v-if="isOpen" class="lang-dropdown">
      <!-- English Option -->
      <div class="lang-option" :class="{ active: locale === 'en' }" @click="changeLang('en')">
        <img :src="EnglishFlag" alt="English" class="flag-img" loading="lazy"/>
        English
        <ion-icon v-if="locale === 'en'" :icon="checkmark" class="check" />
      </div>

      <!-- Khmer Option -->
      <div class="lang-option" :class="{ active: locale === 'km' }" @click="changeLang('km')">
        <img :src="KhmerFlag" alt="Khmer" class="flag-img" loading="lazy" />
        ភាសាខ្មែរ
        <ion-icon v-if="locale === 'km'" :icon="checkmark" class="check" />
      </div>
    </div>

    <div v-if="isOpen" class="lang-overlay" @click="isOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { chevronUp, chevronDown, checkmark } from 'ionicons/icons'

import EnglishFlag from '/public/images/English.png'
import KhmerFlag from '/public/images/Khmer.png'

const { locale } = useI18n()
const isOpen = ref(false)

function changeLang(lang) {
  locale.value = lang
  localStorage.setItem('lang', lang)
  isOpen.value = false
}
</script>

<style scoped>
.lang-switcher {
  position: relative;
  display: inline-block;
}

.lang-btn {
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  background: white;
  user-select: none;
  color: #333;
}

.lang-btn:hover {
  background: #f9f9f9;
}

.flag-img {
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 3px;
  flex-shrink: 0;
}

.lang-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  z-index: 1000;
  min-width: 150px;
  overflow: hidden;
}

.lang-option {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  transition: background 0.15s;
}

.lang-option:hover {
  background: #f5f5f5;
}

.lang-option.active {
  color: #007aff;
  font-weight: 600;
}

.check {
  margin-left: auto;
}

.lang-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
}
</style>

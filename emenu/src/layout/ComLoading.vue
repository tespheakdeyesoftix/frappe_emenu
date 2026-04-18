<template>
  <div class="loading-container">
    <div class="loading-box">
      <ion-spinner name="crescent" class="spinner"></ion-spinner>
      <p class="loading-text">{{t("Loading, please wait...")}}</p>
    </div>
  </div>
</template>

<script setup>
import { IonSpinner } from '@ionic/vue'
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

}

.loading-box {
  padding: 40px 60px;
  border-radius: 16px;
  text-align: center;

}

.spinner {
  width: 50px;
  height: 50px;
  color: #4f46e5;
}

.loading-text {
  margin-top: 12px;
  font-size: 16px;
  color: #555;
}
</style>

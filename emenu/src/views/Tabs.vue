<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button tab="home" href="/">
			<div class="tab-icon-wrapper">
 				<ion-icon :icon="homeOutline" />
			</div>
          <ion-label>{{t("Home")}}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="category" href="/category">
			<div class="tab-icon-wrapper">
        		<ion-icon :icon="gridOutline" />
			</div>
          <ion-label>{{t("Category")}}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorite" href="/favorite">
		  <div class="tab-icon-wrapper">
			<ion-icon :icon="heart"  />
		  </div>
          <ion-label>{{t("Favorite")}}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="my-account" href="/my-account">
			<div class="tab-icon-wrapper">
        		<ion-icon :icon="callOutline" />
			</div>
          <ion-label>{{t("Contact")}}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { homeOutline, walletOutline, cardOutline, barChartOutline,gridOutline, heartCircleOutline, heart, people, callOutline } from "ionicons/icons";
import { UserCircle } from "lucide-vue-next";
</script>

<style scoped>
.custom-tab-bar {
  --background: #ffffff;
  --border: none;
  border-top: 1px solid #f0f0f0;
  height: 72px;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
}

ion-tab-button {
  --color: #b0b0b0;
  --color-selected: #b0b0b0;
  --ripple-color: transparent;
}

.tab-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 36px;
  border-radius: 12px;
  background: transparent;
  transition: background 0.2s ease;
}

.tab-icon-wrapper ion-icon {
  font-size: 22px;
  color: #b0b0b0;
  transition: color 0.2s ease;
}

ion-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #b0b0b0;
  text-transform: uppercase;
  margin-top: 2px;
}

/* ✅ Active styles — CSS only via Ionic's auto-added class */
ion-tab-button.tab-selected .tab-icon-wrapper {
  background: #fff0eb;
}

ion-tab-button.tab-selected .tab-icon-wrapper ion-icon {
  color: #ff6b35;
}

ion-tab-button.tab-selected ion-label {
  color: #ff6b35;
}
</style>

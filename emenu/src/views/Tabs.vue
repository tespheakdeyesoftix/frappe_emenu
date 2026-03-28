<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button tab="home" href="/">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="category" href="/category">
          <ion-icon :icon="gridOutline" />
          <ion-label>Category</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorite" href="/favorite">
          <ion-icon :icon="heart"  />
          <ion-label>favorite</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="my-account" href="/my-account">
          <ion-icon :icon="people" />
          <ion-label>My Account</ion-label>
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
import { homeOutline, walletOutline, cardOutline, barChartOutline,gridOutline, heartCircleOutline, heart, people } from "ionicons/icons";
import { UserCircle } from "lucide-vue-next";
</script>

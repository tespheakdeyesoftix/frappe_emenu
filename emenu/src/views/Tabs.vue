<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button tab="home" href="/">
          <ion-icon :icon="homeOutline" />
          <ion-label>ទំព័រដើម</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="category" href="/category">
          <ion-icon :icon="walletOutline" />
          <ion-label>Category</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorite" href="/favorite">
          <ion-icon :icon="cardOutline" />
          <ion-label>favorite</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="my-account" href="/my-account">
          <ion-icon :icon="barChartOutline" />
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
import { homeOutline, walletOutline, cardOutline, barChartOutline } from "ionicons/icons";
</script>

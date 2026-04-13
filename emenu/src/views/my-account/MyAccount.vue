<template>
  <ion-page>
    <ion-content :fullscreen="true" class="profile-content">

      <!-- Header Card -->
      <div class="profile-header">
        <div class="avatar-wrapper">
          <img
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
            alt="Profile"
            class="avatar-img"
			loading="lazy"
          />
          <!-- <button class="edit-btn">
            <ion-icon :icon="pencil" />
          </button> -->
        </div>
        <div class="profile-info">
          <h2 class="profile-name">Welcome, Guest</h2>
          <p class="profile-email">{{ business_info.slogan_1 }}<br/>{{ business_info.slogan_2 }}</p>
        </div>
      </div>
      <!-- Menu List -->
      <div class="menu-card py-5 my-5">

		<router-link to="/favorite">
        <div class="menu-item">
          <div class="menu-icon-wrap">
            <ion-icon :icon="heartOutline" class="menu-icon" />
          </div>
          <span class="menu-label">{{t("Favorite Items")}}</span>
          <ion-icon :icon="chevronForward" class="arrow-icon" />
        </div>
		</router-link>

		<div v-if="business_info.phone_number">
			<div class="divider" />
			<a :href="'tel:' + business_info.phone_number" class="menu-item">
				<div class="menu-icon-wrap">
					<ion-icon :icon="callOutline" class="menu-icon" />
				</div>
				<span class="menu-label">{{t("Phone Number 1")}} <br/>
					{{ business_info.phone_number }}
				</span>
			</a>
		</div>

		<div v-if="business_info.phone_number1">
			<div class="divider" />
			 <a :href="'tel:' + business_info.phone_number1" class="menu-item">
				<div class="menu-icon-wrap">
					<ion-icon :icon="callOutline" class="menu-icon" />
				</div>
				<span class="menu-label">{{t("Phone Number 2")}} <br/>
					{{ business_info.phone_number1 }}
				</span>
			</a>
		</div>

       <!-- Social Media Links -->
		<div v-if="business_info.tik_tok">
			<div class="divider" />
			<div class="menu-item" @click="openLink(business_info.tik_tok)">
				<div class="menu-icon-wrap">
					<ion-icon :icon="logoTiktok" class="menu-icon" />
				</div>
				<span class="menu-label">TikTok</span>
				<ion-icon :icon="chevronForward" class="arrow-icon" />
			</div>
		</div>


		<div class="divider" />
		<div class="menu-item" @click="openLink(business_info.telegram)">
			<div class="menu-icon-wrap">
				<ion-icon :icon="paperPlaneOutline" class="menu-icon" />
			</div>
			<span class="menu-label">Telegram</span>
			<ion-icon :icon="chevronForward" class="arrow-icon" />
		</div>

		<div class="divider" />
		<div class="menu-item" @click="openLink(business_info.facebook)">
			<div class="menu-icon-wrap">
				<ion-icon :icon="logoFacebook" class="menu-icon" />
			</div>
			<span class="menu-label">Facebook</span>
			<ion-icon :icon="chevronForward" class="arrow-icon" />
		</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonContent, IonPage, IonIcon } from '@ionic/vue';
import {
  pencil,
  bagOutline,
  heartOutline,
  settingsOutline,
  helpCircleOutline,
  chevronForward,
  logOutOutline,
  logoTiktok,
  logoFacebook,
  paperPlaneOutline,
  callOutline
} from 'ionicons/icons';

import { useApp } from "@/hooks/useApp.js"
const {business_info} =useApp()

const navigate = (page) => {
//   console.log('Navigate to:', page);
};

const openLink = (url) => {
  if (!url) {
    return;
  }
  if (!url.startsWith('http')) url = 'https://' + url; // ensure proper protocol
  window.open(url, '_blank');
};

const logout = () => {
  console.log('Logout');
};
</script>

<style scoped>
.profile-content {
  --background: #f2f2f7;
}

/* ── Header ── */
.profile-header {
  background: linear-gradient(135deg, #ff6b35 0%, #ff4500 100%);
  border-radius: 0 0 28px 28px;
  padding: 40px 18px 32px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 8px 24px rgba(255, 80, 0, 0.28);
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar-img {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.4);
}

.edit-btn {
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  color: #ff5500;
  font-size: 13px;
}

.profile-info {
  flex: 1;
}

.profile-name {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
}

.profile-email {
  margin: 0;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.82);
}

/* ── Menu Card ── */
.menu-card {
  background: #fff;
  border-radius: 20px;
  margin: 20px 16px 16px;
  padding: 4px 0;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.15s;
  gap: 14px;
}

.menu-item:active {
  background: #fafafa;
}

.menu-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.menu-icon-wrap.orange {
  background: #fff3ee;
}

.menu-icon {
  font-size: 19px;
  color: #555;
}

.orange-icon {
  color: #ff5500;
}

.menu-label {
  flex: 1;
  font-size: 15.5px;
  font-weight: 500;
  color: #1a1a1a;
}

.badge {
  background: #ff5500;
  color: #fff;
  font-size: 11.5px;
  font-weight: 700;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  font-size: 17px;
  color: #c4c4c4;
}

.divider {
  height: 1px;
  background: #f0f0f0;
  margin: 0 20px;
}

/* ── Logout ── */
.logout-card {
  background: #fff0ee;
  border-radius: 16px;
  margin: 16px 16px 32px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.15s;
}

.logout-card:active {
  background: #ffe0da;
}

.logout-icon {
  font-size: 20px;
  color: #ff3d00;
}

.logout-text {
  font-size: 15.5px;
  font-weight: 600;
  color: #ff3d00;
}
</style>

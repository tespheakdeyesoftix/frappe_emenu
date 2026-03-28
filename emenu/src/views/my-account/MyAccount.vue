<template>
  <ion-page>
    <ion-content :fullscreen="true" class="profile-content">

      <!-- Header Card -->
      <div class="profile-header">
        <div class="avatar-wrapper">
          <img
            src="https://i.pravatar.cc/100?img=11"
            alt="Profile"
            class="avatar-img"
          />
          <button class="edit-btn">
            <ion-icon :icon="pencil" />
          </button>
        </div>
        <div class="profile-info">
          <h2 class="profile-name">Alex Johnson</h2>
          <p class="profile-email">alex.j@example.com</p>
        </div>
      </div>

      <!-- Menu List -->
      <div class="menu-card">
        <div class="menu-item" @click="navigate('orders')">
          <div class="menu-icon-wrap">
            <ion-icon :icon="bagOutline" class="menu-icon" />
          </div>
          <span class="menu-label">My Orders</span>
          <span class="badge">3</span>
          <ion-icon :icon="chevronForward" class="arrow-icon" />
        </div>

        <div class="divider" />

        <div class="menu-item" @click="navigate('favorites')">
          <div class="menu-icon-wrap">
            <ion-icon :icon="heartOutline" class="menu-icon" />
          </div>
          <span class="menu-label">Favorite Items</span>
          <ion-icon :icon="chevronForward" class="arrow-icon" />
        </div>

        <div class="divider" />

        <div class="menu-item" @click="navigate('settings')">
          <div class="menu-icon-wrap orange">
            <ion-icon :icon="settingsOutline" class="menu-icon orange-icon" />
          </div>
          <span class="menu-label">Settings</span>
          <ion-icon :icon="chevronForward" class="arrow-icon" />
        </div>

        <div class="divider" />

        <div class="menu-item" @click="navigate('support')">
          <div class="menu-icon-wrap">
            <ion-icon :icon="helpCircleOutline" class="menu-icon" />
          </div>
          <span class="menu-label">Contact Support</span>
          <ion-icon :icon="chevronForward" class="arrow-icon" />
        </div>
      </div>

      <!-- Logout Button -->
      <div class="logout-card" @click="logout">
        <ion-icon :icon="logOutOutline" class="logout-icon" />
        <span class="logout-text">Logout</span>
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
} from 'ionicons/icons';

const navigate = (page) => {
  console.log('Navigate to:', page);
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
  padding: 48px 24px 32px;
  display: flex;
  align-items: center;
  gap: 18px;
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
  margin: 20px 16px 0;
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
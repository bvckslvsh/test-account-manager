<template>
  <div class="accounts-form">
    <div class="accounts-form__header">
      <h2 class="accounts-form__title">Учетные записи</h2>
      <v-btn icon="mdi-plus" color="primary" @click="add" />
    </div>

    <p class="accounts-form__hint">Для указания нескольких меток используйте разделитель ;</p>

    <AccountItem
      v-for="acc in accounts"
      :key="acc.id"
      :account="acc"
      @update="update"
      @remove="remove"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAccountsStore } from '@/features/accounts/store/store.js';
import AccountItem from '@/shared/entities/account/ui/AccountItem.vue';

const store = useAccountsStore();
const { accounts } = storeToRefs(store);

function add() {
  store.addAccount();
}

function update(acc: any) {
  store.updateAccount(acc);
}

function remove(id: string) {
  store.removeAccount(id);
}
</script>

<style scoped>
.accounts-form__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.accounts-form__title {
  font-size: 18px;
  font-weight: 600;
}

.accounts-form__hint {
  font-size: 13px;
  color: #888;
  margin: 8px 0 16px;
}
</style>

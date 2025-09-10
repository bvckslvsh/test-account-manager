<script setup lang="ts">
import AccountsPage from './pages/AccountsPage.vue';
import { useAccountsStore } from './features/accounts/store/store.ts';
import { storeToRefs } from 'pinia';

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);
</script>

<template>
  <AccountsPage />

  <div class="debug-store">
    <h3>Debug: store content</h3>
    <pre>{{ JSON.stringify(accounts, null, 2) }}</pre>
  </div>
</template>

<style scoped>
.debug-store {
  background-color: #f0f0f0;
  color: #333;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 8px;
  font-family: monospace;
  overflow-x: auto;
}
.debug-store h3 {
  margin-top: 0;
  font-size: 1rem;
  color: #555;
}
</style>

import { defineStore } from 'pinia';
import type { Account } from '@/shared/entities/account/model/types.ts';
import LSHelper from '@/shared/utils/helpers/LSHelper.ts';

interface State {
  accounts: Account[];
}

export const useAccountsStore = defineStore('accounts', {
  state: (): State => ({
    accounts: LSHelper.get('accounts') || [],
  }),

  actions: {
    addAccount() {
      const newAcc: Account = {
        id: crypto.randomUUID(),
        labels: [],
        type: 'Локальная',
        login: '',
        password: '',
      };
      this.accounts.push(newAcc);
      this.save();
    },

    updateAccount(updated: Account) {
      const idx = this.accounts.findIndex((a) => a.id === updated.id);
      if (idx !== -1) {
        this.accounts[idx] = updated;
        this.save();
      }
    },

    removeAccount(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id);
      this.save();
    },

    save() {
      LSHelper.put({ accounts: this.accounts });
    },
  },
});

<template>
  <div class="d-flex ga-2">
    <FormField
      label="Метка"
      :model-value="labelsInput"
      @update:modelValue="labelsInput = $event"
      @blur="onLabelsBlur"
      :error="touched.labels && !validLabels"
      maxlength="50"
    />

    <v-select
      label="Тип записи*"
      :items="['Локальная', 'LDAP']"
      v-model="local.type"
      @update:modelValue="
        (v) => {
          local.type = v;
          if (v === 'LDAP') local.password = null;
          tryValidateAndSave('type');
        }
      "
      density="compact"
      variant="outlined"
      class="h-100"
      hide-details="auto"
    />

    <FormField
      label="Логин*"
      :model-value="local.login"
      @update:modelValue="local.login = $event"
      @blur="() => tryValidateAndSave('login')"
      :error="touched.login && !validLogin"
      maxlength="100"
      required
    />

    <FormField
      v-if="local.type === 'Локальная'"
      label="Пароль*"
      type="password"
      :model-value="local.password || ''"
      @update:modelValue="local.password = $event"
      @blur="() => tryValidateAndSave('password')"
      :error="touched.password && !validPassword"
      maxlength="100"
      required
    />

    <v-btn icon="mdi-delete" color="error" variant="text" @click="$emit('remove', local.id)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Account } from '@/shared/entities/account/model/types.ts';
import {
  validateLabels,
  validateLogin,
  validatePassword,
} from '@/shared/entities/account/model/validators';
import FormField from '@/shared/ui/FormField.vue';

const props = defineProps<{ account: Account }>();
const emit = defineEmits<{
  (e: 'update', value: Account): void;
  (e: 'remove', id: string): void;
}>();

const local = ref<Account>({ ...props.account });
const labelsInput = ref(local.value.labels.map((l) => l.text).join('; '));

const validLabels = ref(true);
const validLogin = ref(true);
const validPassword = ref(true);

const touched = ref({
  labels: false,
  login: false,
  password: false,
});

function onLabelsBlur() {
  touched.value.labels = true;
  validLabels.value = validateLabels(labelsInput.value);
  local.value.labels = labelsInput.value
    .split(';')
    .map((t) => ({ text: t.trim() }))
    .filter((t) => t.text);

  if (validLabels.value) {
    emit('update', { ...local.value });
  }
}

function areRequiredFieldsFilled(): boolean {
  if (!local.value.type) return false;
  if (!local.value.login) return false;
  return !(local.value.type === 'Локальная' && !local.value.password);
}

function tryValidateAndSave(field?: 'login' | 'password' | 'type') {
  if (field) touched.value[field] = true;

  validLogin.value = true;
  validPassword.value = true;
  validLabels.value = validateLabels(labelsInput.value);

  if (!areRequiredFieldsFilled()) {
    validLogin.value = !touched.value.login || !!local.value.login;
    validPassword.value =
      local.value.type !== 'Локальная' || !touched.value.password || !!local.value.password;
    return;
  }

  validLogin.value = validateLogin(local.value.login);
  validPassword.value = validatePassword(local.value.password, local.value.type);

  if (validLogin.value && validPassword.value) {
    emit('update', { ...local.value });
  }
}

watch(
  () => props.account,
  (val) => {
    local.value = { ...val };
    labelsInput.value = val.labels.map((l) => l.text).join('; ');
    validLabels.value = true;
    validLogin.value = true;
    validPassword.value = true;
    touched.value = { labels: false, login: false, password: false };
  },
  { deep: true },
);
</script>

<style scoped></style>

<template>
  <div class="d-flex ga-2">
    <FormField
      label="Метка"
      :model-value="labelsInput"
      @update:modelValue="labelsInput = $event"
      @blur="onLabelsBlur"
      :error="!validLabels"
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
          onTypeBlur();
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
      @blur="onLoginBlur"
      :error="!validLogin"
      maxlength="100"
    />

    <FormField
      v-if="local.type === 'Локальная'"
      label="Пароль*"
      type="password"
      :model-value="local.password || ''"
      @update:modelValue="local.password = $event"
      @blur="onPasswordBlur"
      :error="!validPassword"
      maxlength="100"
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

function onLabelsBlur() {
  validLabels.value = validateLabels(labelsInput.value);
  local.value.labels = labelsInput.value
    .split(';')
    .map((t) => ({ text: t.trim() }))
    .filter((t) => t.text);
  emitUpdate();
}

function onLoginBlur() {
  validLogin.value = validateLogin(local.value.login);
  emitUpdate();
}

function onPasswordBlur() {
  validPassword.value = validatePassword(local.value.password, local.value.type);
  emitUpdate();
}

function onTypeBlur() {
  validPassword.value = validatePassword(local.value.password, local.value.type);
  emitUpdate();
}

function emitUpdate() {
  if (validLabels.value && validLogin.value && validPassword.value) {
    emit('update', { ...local.value });
  }
}

watch(
  () => props.account,
  (val) => {
    local.value = { ...val };
    labelsInput.value = val.labels.map((l) => l.text).join('; ');
  },
  { deep: true },
);
</script>

<style scoped></style>

<template>
  <v-text-field
    v-bind="$attrs"
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
    @blur="$emit('blur')"
    :error="props.error"
    hide-details="auto"
    variant="outlined"
    density="compact"
    class="form-field"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  error?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur'): void;
}>();

function onUpdate(val: string) {
  emit('update:modelValue', val);
}
</script>

<style scoped>
.form-field {
  margin-bottom: 12px;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import IconChevronDown from '@tabler/icons-vue/dist/esm/icons/IconChevronDown.mjs'

interface Option {
  value: string
  label: string
}

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    modelValue: string
    options: readonly Option[]
    error?: string
    required?: boolean
    placeholderLabel?: string
    disabled?: boolean
  }>(),
  { error: '', required: false, placeholderLabel: 'Selecciona una opción', disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const describedBy = computed(() => (props.error ? `${props.id}-error` : undefined))

const selectClasses = computed(() =>
  [
    'w-full appearance-none rounded-full border-0 bg-white px-5 py-3 pr-11 text-ink-900 shadow-sm ring-1 ring-inset transition-shadow hover:ring-ink-300',
    'focus:ring-2 focus:ring-brand-500 dark:hover:ring-ink-600 dark:bg-ink-900 dark:text-ink-50 dark:ring-ink-700',
    props.error ? 'ring-red-600 focus:ring-red-500' : 'ring-ink-200 dark:ring-ink-700',
    props.disabled ? 'opacity-60' : '',
  ].join(' '),
)
</script>

<template>
  <div>
    <label :for="id" class="mb-2 block text-sm font-semibold text-ink-800 dark:text-ink-200">
      {{ label }}
      <span v-if="required" class="text-brand-600" aria-hidden="true"> *</span>
    </label>
    <div class="relative">
      <select
        :id="id"
        :name="id"
        :value="modelValue"
        :required="required || undefined"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy"
        :class="selectClasses"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option value="" disabled>{{ placeholderLabel }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <IconChevronDown
        aria-hidden="true"
        class="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-ink-400"
      />
    </div>
    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-1.5 text-sm text-red-700 dark:text-red-400" data-testid="field-error"
    >
      {{ error }}
    </p>
  </div>
</template>
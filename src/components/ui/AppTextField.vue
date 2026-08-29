<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    modelValue: string
    error?: string
    hint?: string
    required?: boolean
    autocomplete?: string
    inputmode?: 'tel' | 'email' | 'numeric' | 'text'
    type?: 'text' | 'tel' | 'email'
    placeholder?: string
    maxlength?: number
    spellcheck?: boolean
  }>(),
  {
    error: '',
    hint: '',
    required: false,
    autocomplete: undefined,
    inputmode: undefined,
    type: 'text',
    placeholder: undefined,
    maxlength: undefined,
    spellcheck: false,
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.error) ids.push(`${props.id}-error`)
  if (props.hint) ids.push(`${props.id}-hint`)
  return ids.length ? ids.join(' ') : undefined
})

const inputClasses = computed(() =>
  [
    'w-full rounded-full border-0 bg-white px-5 py-3 text-ink-900 shadow-sm ring-1 ring-inset transition-shadow hover:ring-ink-300',
    'placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500 dark:hover:ring-ink-600',
    'dark:bg-ink-900 dark:text-ink-50 dark:placeholder:text-ink-500 dark:ring-ink-700',
    props.error
      ? 'ring-red-600 focus:ring-red-500'
      : 'ring-ink-200 dark:ring-ink-700',
  ].join(' '),
)
</script>

<template>
  <div>
    <label :for="id" class="mb-2 block text-sm font-semibold text-ink-800 dark:text-ink-200">
      {{ label }}
      <span v-if="required" class="text-brand-600" aria-hidden="true"> *</span>
    </label>
    <input
      :id="id"
      :name="id"
      :type="type"
      :inputmode="inputmode || (type === 'tel' ? 'tel' : undefined)"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :spellcheck="spellcheck"
      :value="modelValue"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      :required="required || undefined"
      :class="inputClasses"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="hint" :id="`${id}-hint`" class="mt-1.5 text-xs text-ink-600 dark:text-ink-400">
      {{ hint }}
    </p>
    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-1.5 text-sm text-red-700 dark:text-red-400" data-testid="field-error"
    >
      {{ error }}
    </p>
  </div>
</template>
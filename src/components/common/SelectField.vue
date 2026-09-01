<template>
  <div class="space-y-4">
    <div>
      <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span v-if="required" class="text-red-600">*</span>
      </label>
      <select
        :id="name"
        :name="name"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :required="required"
        class="input-field"
        :class="{ 'border-red-500': error }"
      >
        <option value="">{{ placeholder || 'Select an option' }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <p v-if="error" class="error-text">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  label: String,
  modelValue: String,
  placeholder: String,
  required: Boolean,
  error: String,
  options: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['update:modelValue'])
</script>

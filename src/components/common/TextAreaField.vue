<template>
  <div class="space-y-4">
    <div>
      <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span v-if="required" class="text-red-600">*</span>
      </label>
      <textarea
        :id="name"
        :name="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        class="input-field"
        :class="{ 'border-red-500': error }"
      />
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
  rows: {
    type: Number,
    default: 4,
  },
})

defineEmits(['update:modelValue'])
</script>

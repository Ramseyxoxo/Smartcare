<template>
  <div class="space-y-4">
    <div>
      <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span v-if="required" class="text-red-600">*</span>
      </label>
      <input
        :id="name"
        :name="name"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
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
  type: {
    type: String,
    default: 'text',
  },
  modelValue: String,
  placeholder: String,
  required: Boolean,
  error: String,
})

defineEmits(['update:modelValue'])
</script>

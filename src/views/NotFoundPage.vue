<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
  >
    <div class="text-center">
      <div class="text-6xl mb-4">404</div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p class="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <RouterLink
        to="/"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
      >
        Go Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup></script>

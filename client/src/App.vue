<script setup>
  import { RouterView, useRoute } from 'vue-router'
  import { computed } from 'vue';
  import TopNavbar from '@components/shared/TopNavbar.vue';
  import BottomNavbar from '@components/shared/BottomNavbar.vue';
  import BackButton from '@components/shared/BackButton.vue'

  const route = useRoute()
  // Hide the back button on main bottom-nav root tabs
  const showBackButton = computed(() => {
    const rootPaths = ['/', '/speak', '/library', '/settings', '/streak']
    return !rootPaths.includes(route.path)
  })
</script>

<template>
  <TopNavbar />

  <main
    dir="rtl"
    class="bg-slate-50 min-h-screen pt-20 pb-28 sm:pt-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center overflow-x-hidden"
  >
    <div class="w-full max-w-2xl sm:max-w-3xl space-y-4">
      <!-- Global Back Button (Hidden on main root tabs) -->
      <div v-if="showBackButton" class="flex items-center">
        <BackButton />
      </div>

      <!-- Page Content -->
      <RouterView v-slot="{ Component, route }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
  </main>

  <BottomNavbar />
</template>
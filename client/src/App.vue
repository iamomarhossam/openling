<script setup>
  import { RouterView } from 'vue-router'
  import TopNavbar from '@components/shared/TopNavbar.vue';
  import BottomNavbar from '@components/shared/BottomNavbar.vue';
</script>

<template>
  <header>
    <TopNavbar></TopNavbar>
    <BottomNavbar></BottomNavbar>
  </header>

  <main
    dir="rtl"
    class="bg-slate-50 min-h-screen pt-20 pb-28 sm:pt-24 sm:pb-32 px-4 sm:px-6 flex flex-col items-center overflow-x-hidden"
  >
    <div class="w-full max-w-2xl sm:max-w-3xl">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
  </main>
</template>
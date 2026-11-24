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

   <main class="bg-slate-50 min-h-screen py-32 sm:py-12">
    <RouterView />
   </main>
</template>
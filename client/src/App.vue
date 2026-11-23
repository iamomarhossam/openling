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

   <main>
    <RouterView />
   </main>
</template>
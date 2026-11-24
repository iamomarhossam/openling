<script setup>
  import data from '@/data/grammar.json'
  import { RouterLink } from "vue-router";
</script>
<template>
  <h1>النحو</h1>

  <ul>
    <li v-for="(lesson, i) in data" :key="i">
      <RouterLink
        :to="`/grammar/${lesson.topic}`"
      >
        <h2>{{ lesson.title }}</h2>
        <img :src="`/images/${lesson.topic}.jpg`">
      </RouterLink>
    </li>
  </ul>

</template>

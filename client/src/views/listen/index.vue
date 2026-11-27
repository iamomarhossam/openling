<script setup>
  import { RouterLink } from 'vue-router';
  import data from '@/data/lesson.json';
  import { textToUrl } from '@/utils/helpers'

  const lesson = data[0];
</script>
<template>
  <section>
    <h1>استمع</h1>
    <p>اسمع و اكتب اللي انت فهمته و اعرف معناه</p>

    <article>
      <RouterLink :to="`/listen/${textToUrl(lesson.title)}`">
        <h2>{{ lesson.title }}</h2>
        <p>{{ lesson.title_ar }}</p>
      </RouterLink>
    </article>
  </section>
</template>
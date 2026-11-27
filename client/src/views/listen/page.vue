<script setup>
  import { computed, ref } from 'vue'
  import { useRoute, RouterLink } from 'vue-router'
  import reading_lessons from '@/data/lesson.json';

  const route = useRoute()
  const topic = computed(() => String(route.params.topic || ''))

  // Reactive lesson lookup
  const lesson = computed(() => reading_lessons.find((l) => l.topic === topic.value))

  const userText = ref('')

</script>

<template>
  <section v-if="lesson" dir="rtl" class="w-full space-y-6">
    <hgroup class="text-center">
      <h1 class="text-2xl">{{ lesson.title }}</h1>
      <p class="text-sm p-1">{{ lesson.title_ar }}</p>
    </hgroup>

    <RouterLink to="/guide/listen" class="text-sm">كيف يعمل؟</RouterLink>

    <article class="w-8/10 my-3 mx-auto flex flex-col gap-2 p-3 border-2 rounded-lg">
      <button><!-- Large voice icon + text shown only for accesibility --></button>
    </article>

    <label for="text">اكتب ما سمعته</label>
    <input type="text" id="text" v-model="userText" placeholder="write in english.." dir="ltr" />
  </section>

  <!-- Fallback if topic doesn't exist -->
  <section v-else dir="rtl" class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
    <p class="text-lg font-bold text-slate-700">لم يتم العثور على هذا الدرس</p>
  </section>
</template>
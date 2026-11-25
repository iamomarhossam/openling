
<script setup>
import { ref } from 'vue'
import data from '@/data/read_1.json'
import { speak, translate } from '@/utils/ai'

const translatedText = ref('')
const loading = ref(false)

async function translateText(text) {
  loading.value = true
  try {
    translatedText.value = await translate(text)
  } catch {
    translatedText.value = 'Translation is not ready. Please visit the homepage setup.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="mx-auto max-w-3xl space-y-6 p-4" dir="ltr">
    <!-- Title -->
    <header class="text-center">
      <h1 class="text-3xl font-bold text-slate-800">
        {{ data.title }}
      </h1>
      <p class="mt-2 text-slate-500">
        Read, listen, and learn English
      </p>
    </header>

    <!-- Reading text -->
    <section class="rounded-2xl bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-xl font-bold">Reading</h2>

        <button
          @click="speak(data.text)"
          class="rounded-xl bg-indigo-600 px-4 py-2 text-white"
        >
          🔊 Listen
        </button>
      </div>

      <p class="mt-4 text-lg leading-9 text-slate-700">
        {{ data.text }}
      </p>

      <button
        @click="translateText(data.text)"
        class="mt-4 rounded-xl bg-slate-100 px-4 py-2 text-slate-700"
      >
        🌍 Translate
      </button>

      <p v-if="loading" class="mt-3 text-slate-500">
        Translating...
      </p>

      <p v-if="translatedText" dir="rtl"
         class="mt-4 rounded-xl bg-indigo-50 p-4 leading-8 text-slate-700">
        {{ translatedText }}
      </p>
    </section>

    <!-- Vocabulary -->
    <section class="rounded-2xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-xl font-bold">New words</h2>

      <div
        v-for="word in data.words"
        :key="word.english"
        class="flex items-center justify-between border-b py-3 last:border-0"
      >
        <div>
          <p class="font-semibold text-slate-800">
            {{ word.english }}
          </p>
          <p dir="rtl" class="text-slate-500">
            {{ word.arabic }}
          </p>
        </div>

        <button
          @click="speak(word.english)"
          class="rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700"
        >
          🔊
        </button>
      </div>
    </section>
  </main>
</template>

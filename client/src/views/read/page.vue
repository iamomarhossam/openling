<script setup>

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import reading_lessons from '@/data/lesson.json'
import { stopSpeak, speakAsync } from "@/utils/helpers";
import { onClickOutside } from '@vueuse/core'

const route = useRoute()
const topic = computed(() => String(route.params.topic || ''))

const lesson = computed(() => reading_lessons.find((l) => l.topic === topic.value))


const isReadAll = ref(false)

const currentVoiceChunk = ref([])

let session = 0

async function readAll() {
  isReadAll.value = !isReadAll.value

  if (!isReadAll.value) {
    session++
    stopSpeak()
    currentVoiceChunk.value = [];
    return
  }

  const my = ++session

  for (const chunk of lesson.value.text) {
    if (my !== session) return
    currentVoiceChunk.value = chunk
    await speakAsync(chunk)
  }
}

const popup = ref(false);
const popupArText = ref('');
const popupRef = ref(null)

function handlePopup(i) {
  popupArText.value = lesson.value.text_ar[i]
  popup.value = true;
}

onClickOutside(popupRef, () => {
  popup.value = false;
})

</script>
<template>
  <h1>{{ lesson.title_ar }}</h1>

  <button
    type="button"
    @click="readAll"
    class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
  >
    <span v-if="!isReadAll">🔊 استمع للقطعة كاملة</span>
    <span v-else>🔈 اوقف الاستماع</span>
  </button>

  <div dir="ltr" class="text-xl/12 flex flex-wrap gap-1 relative">
    <button 
      v-for="(c, i) in lesson.text"
      :class="currentVoiceChunk === c ? 'bg-green-600' : ''"
      @click="handlePopup(i)"
      @mouseenter="(event) => { event.currentTarget.classList.add('underline') }"
      @mouseleave="(event) => { event.currentTarget.classList.remove('underline') }"
    > {{ c }}</button>

    <div 
      ref="popupRef" 
      v-if="popup" 
      class="absolute top-0 right-0 bg-slate-300 p-2"
      dir="rtl"
    >{{ popupArText }}</div>
  </div>
</template>
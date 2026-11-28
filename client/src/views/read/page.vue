<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import reading_lessons from '@/data/lesson.json'
import { stopSpeak, speakAsync } from '@/utils/helpers'
import { onClickOutside } from '@vueuse/core'

const route = useRoute()
const topic = computed(() => String(route.params.topic || ''))
const lesson = computed(() => reading_lessons.find((l) => l.topic === topic.value))

// --- Reading & Audio State ---
const isReadAll = ref(false)
const currentVoiceChunk = ref('')
let session = 0

async function readAll() {
  isReadAll.value = !isReadAll.value

  if (!isReadAll.value) {
    session++
    stopSpeak()
    currentVoiceChunk.value = ''
    return
  }

  const my = ++session

  for (const chunk of lesson.value.text) {
    if (my !== session) return
    currentVoiceChunk.value = chunk
    await speakAsync(chunk)
  }
  isReadAll.value = false
  currentVoiceChunk.value = ''
}

// --- Translation Popup State ---
const popup = ref(false)
const popupArText = ref('')
const popupRef = ref(null)

function handlePopup(i) {
  popupArText.value = lesson.value.text_ar[i]
  popup.value = true
}

onClickOutside(popupRef, () => {
  popup.value = false
})

// --- Questions & LocalStorage State ---
const userAnswers = ref({}) // stores question index -> selected choice index
const isSubmitted = ref(false)
const score = ref(0)

const storageKey = computed(() => `reading_quiz_${topic.value}`)

onMounted(() => {
  const saved = localStorage.getItem(storageKey.value)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      userAnswers.value = parsed.userAnswers || {}
      isSubmitted.value = parsed.isSubmitted || false
      score.value = parsed.score || 0
    } catch (e) {
      console.error(e)
    }
  }
})

const selectAnswer = (qIndex, choiceIndex) => {
  if (isSubmitted.value) return
  userAnswers.value[qIndex] = choiceIndex
}

const submitQuiz = () => {
  let correctCount = 0
  lesson.value.questions.forEach((q, idx) => {
    if (userAnswers.value[idx] === q.answer) {
      correctCount++
    }
  })
  score.value = correctCount
  isSubmitted.value = true

  localStorage.setItem(
    storageKey.value,
    JSON.stringify({
      userAnswers: userAnswers.value,
      isSubmitted: true,
      score: score.value
    })
  )
}

const resetQuiz = () => {
  userAnswers.value = {}
  isSubmitted.value = false
  score.value = 0
  localStorage.removeItem(storageKey.value)
}
</script>

<template>
  <div v-if="lesson" dir="rtl" class="w-full space-y-6">
    
    <!-- Header -->
    <header class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-2">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-850">
        {{ lesson.title_ar }}
      </h1>
      <p class="text-sm font-medium text-slate-400" dir="ltr">{{ lesson.title }}</p>
      
      <div class="pt-3 flex items-center justify-center gap-3">
        <!-- Audio Read All Button -->
        <button
          type="button"
          @click="readAll"
          class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-extrabold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 active:scale-95 rounded-2xl transition-all cursor-pointer shadow-2xs"
        >
          <span>{{ !isReadAll ? '🔊 استمع للقطعة كاملة' : '🔈 إيقاف الاستماع' }}</span>
        </button>
      </div>
    </header>

    <!-- Reading Card / Interactive Sentences -->
    <section class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 class="text-base font-bold text-slate-700">اضغط على أي جملة لعرض ترجمتها الفورية 💡</h2>
        <span class="text-xs font-bold text-slate-400">English ⇄ عربي</span>
      </div>

      <!-- Text Container -->
      <div dir="ltr" class="text-lg sm:text-xl leading-relaxed relative p-2 font-medium text-slate-800">
        <button
          v-for="(c, i) in lesson.text"
          :key="i"
          @click="handlePopup(i)"
          @mouseenter="(event) => { event.currentTarget.classList.add('text-indigo-600', 'underline') }"
          @mouseleave="(event) => { event.currentTarget.classList.remove('text-indigo-600', 'underline') }"
          :class="[
            currentVoiceChunk === c ? 'bg-emerald-100 text-emerald-900 font-semibold rounded px-1' : 'hover:bg-indigo-50/60 rounded px-1',
            'cursor-pointer transition-colors duration-150 inline'
          ]"
        >
          {{ c }}
        </button>

        <!-- Translation Popup -->
        <div
          ref="popupRef"
          v-if="popup"
          class="absolute top-16 right-4 z-20 bg-slate-900 text-white text-sm sm:text-base p-4 rounded-2xl shadow-xl border border-slate-700 max-w-sm space-y-1 animate-in fade-in zoom-in-95 duration-150"
          dir="rtl"
        >
          <div class="flex items-center justify-between text-xs text-indigo-300 font-bold border-b border-slate-700 pb-1.5 mb-1">
            <span>الترجمة الفورية</span>
            <span>✨</span>
          </div>
          <p class="font-medium leading-relaxed">{{ popupArText }}</p>
        </div>
      </div>
    </section>

    <!-- Quiz Section -->
    <section v-if="lesson.questions?.length" class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-extrabold text-slate-800">اختبر فهمك للنص 🧠</h2>
        <span v-if="isSubmitted" class="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-xl">
          النتيجة: {{ score }} / {{ lesson.questions.length }}
        </span>
      </div>

      <div class="space-y-6">
        <div
          v-for="(q, qIdx) in lesson.questions"
          :key="q.id"
          class="p-4 sm:p-5 bg-slate-50/70 rounded-2xl border border-slate-200/60 space-y-3"
        >
          <p class="text-base font-bold text-slate-800" dir="ltr">
            {{ qIdx + 1 }}. {{ q.text }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              v-for="(choice, cIdx) in q.choices"
              :key="cIdx"
              @click="selectAnswer(qIdx, cIdx)"
              :disabled="isSubmitted"
              :class="[
                userAnswers[qIdx] === cIdx
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
                isSubmitted && cIdx === q.answer ? '!border-emerald-500 !bg-emerald-50 !text-emerald-900 font-bold' : '',
                isSubmitted && userAnswers[qIdx] === cIdx && cIdx !== q.answer ? '!border-rose-500 !bg-rose-50 !text-rose-900' : ''
              ]"
              class="p-3 text-right text-sm rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between"
            >
              <span>{{ choice }}</span>
              <span v-if="isSubmitted && cIdx === q.answer">✅</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="pt-2">
        <button
          v-if="!isSubmitted"
          type="button"
          @click="submitQuiz"
          class="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl shadow-md transition-all cursor-pointer"
        >
          إرسال وحفظ الإجابات ✨
        </button>
        <button
          v-else
          type="button"
          @click="resetQuiz"
          class="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl shadow-md transition-all cursor-pointer"
        >
          إعادة الاختبار 🔄
        </button>
      </div>
    </section>

  </div>

  <!-- Fallback if lesson not found -->
  <section v-else dir="rtl" class="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
    <p class="text-lg font-bold text-slate-700">لم يتم العثور على درس القراءة هذا</p>
    <RouterLink to="/" class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl">
      العودة للرئيسية
    </RouterLink>
  </section>
</template>
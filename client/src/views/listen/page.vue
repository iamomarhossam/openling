<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import listening_lessons from '@/data/lesson.json'
import { speak, stopSpeak } from "@/utils/helpers";

const route = useRoute()
const topic = computed(() => String(route.params.topic || ''))

// Reactive lesson lookup
const lesson = computed(() => listening_lessons.find((l) => l.topic === topic.value))
const inputRef = ref(null)

// --- Listening & Dictation State ---
const currentIndex = ref(0)
const userText = ref('')
const isChunkChecked = ref(false)
const isChunkCorrect = ref(false)
const isListeningFinished = ref(false)

// Total chunks
const totalChunks = computed(() => lesson.value?.text?.length || 0)
const currentEnglishText = computed(() => lesson.value?.text?.[currentIndex.value] || '')
const currentArabicText = computed(() => lesson.value?.text_ar?.[currentIndex.value] || '')

// Normalize strings for friendly comparison (lowercase, trim extra spaces, strip punctuation)
const normalize = (str) => {
  return str.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '')
}

// Check what user typed against current chunk
const checkChunk = () => {
  if (!userText.value.trim()) return
  const cleanUser = normalize(userText.value)
  const cleanTarget = normalize(currentEnglishText.value)

  isChunkCorrect.value = cleanUser === cleanTarget
  isChunkChecked.value = true
}

// Move to next chunk or finish listening phase
const nextChunk = async () => {
  userText.value = ''
  isChunkChecked.value = false
  isChunkCorrect.value = false

  stopSpeak()

  if (currentIndex.value < totalChunks.value - 1) {
    currentIndex.value++
    inputRef.value.focus()
    speak(currentEnglishText.value)
  } else {
    isListeningFinished.value = true
  }
}

// --- Questions & LocalStorage State ---
const userAnswers = ref({}) // stores question index -> selected choice index
const isSubmitted = ref(false)
const score = ref(0)

const storageKey = computed(() => `listening_quiz_${topic.value}`)

onMounted(() => {
  const saved = localStorage.getItem(storageKey.value)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      userAnswers.value = parsed.userAnswers || {}
      isSubmitted.value = parsed.isSubmitted || false
      score.value = parsed.score || 0
      if (isSubmitted.value) isListeningFinished.value = true
    } catch (e) {
      console.error(e)
    }
  }
  
  inputRef.value.focus()
  speak(currentEnglishText.value)
})

const selectAnswer = (qIndex, choiceIndex) => {
  if (isSubmitted.value) return
  userAnswers.value[qIndex] = choiceIndex
}

const submitQuiz = () => {
  let correctCount = 0
  lesson.value.questions.forEach((q, idx) => {
    // Note: q.answer can be 0-indexed or 1-indexed depending on your JSON. 
    // Assuming q.answer is the index of the correct choice:
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
  currentIndex.value = 0
  isListeningFinished.value = false
  localStorage.removeItem(storageKey.value)
}

const isFullStorySpeak = ref(false)

function handleStorySpeak() {
  isFullStorySpeak.value = !isFullStorySpeak.value

  if (isFullStorySpeak.value) speak(lesson.value.text.join(' '));
  else { stopSpeak() }
}

</script>

<template>
  <div v-if="lesson" dir="rtl" class="w-full space-y-6">
    
    <!-- Header -->
    <header class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center space-y-1.5">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800">
        {{ lesson.title_ar }}
      </h1>
      <p class="text-sm font-medium text-slate-500" dir="ltr">{{ lesson.title }}</p>
      <div class="pt-2">
        <RouterLink to="/guide/listen" class="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl transition-colors">
          <span>💡 كيف يعمل تمرين الاستماع؟</span>
        </RouterLink>
      </div>
    </header>

    <!-- PHASE 1: Chunk-by-Chunk Dictation -->
    <section v-if="!isListeningFinished" class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>الجزء {{ currentIndex + 1 }} من {{ totalChunks }}</span>
          <span>{{ Math.round(((currentIndex + 1) / totalChunks) * 100) }}%</span>
        </div>
        <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-indigo-600 transition-all duration-300 rounded-full"
            :style="{ width: `${((currentIndex + 1) / totalChunks) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Listen Card Button -->
      <div class="flex flex-col items-center justify-center py-6 bg-slate-50/80 border-2 border-dashed border-slate-200 rounded-2xl gap-4">
        <button
          type="button"
          @click="speak(currentEnglishText)"
          class="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-2xl shadow-lg flex items-center justify-center transition-all cursor-pointer group"
          title="استمع للصوت"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-8 h-8 sm:w-10 sm:h-10 fill-current group-hover:scale-110 transition-transform">
            <path d="M155.52,24.81a8,8,0,0,0-8.41.88L84.2,72H48A24,24,0,0,0,24,96v64a24,24,0,0,0,24,24H84.2l62.91,46.31a8,8,0,0,0,12.89-6.5V31.31A8,8,0,0,0,155.52,24.81ZM208,128c0-22.36-10.74-42.17-27.42-54.61a8,8,0,0,0-9.84,12.52C184.29,95.53,192,111,192,128s-7.71,32.47-21.26,42.09a8,8,0,0,0,9.84,12.52C197.26,170.17,208,150.36,208,128Z"/>
          </svg>
        </button>
        <span class="text-sm font-bold text-slate-700">اضغط للاستماع للجزء الصوتي 🔊</span>
      </div>

      <!-- Input Form -->
      <div class="space-y-4">
        <label for="dictation-input" class="block text-sm font-bold text-slate-700">
          اكتب ما سمعته باللغة الإنجليزية:
        </label>
        
        <input
          id="dictation-input"
          type="text"
          dir="ltr"
          v-model="userText"
          placeholder="Type what you heard..."
          class="w-full px-4 py-3.5 text-base sm:text-lg font-medium text-left bg-slate-50 border-2 border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 disabled:bg-slate-100 transition-all placeholder:text-slate-400"
          @keyup.enter="!isChunkChecked ? checkChunk() : nextChunk()"
          ref="inputRef"
        />

        <!-- Feedback on Check -->
        <div v-if="isChunkChecked" :class="isChunkCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'" class="p-4 rounded-xl border space-y-2">
          <div class="flex items-center gap-2 font-bold text-sm">
            <span>{{ isChunkCorrect ? '✅ إجابة صحيحة!' : '❌ ليس تماماً' }}</span>
          </div>
          <div class="text-sm space-y-1">
            <p><strong class="ml-1">الصحيح:</strong> <span dir="ltr" class="font-bold">{{ currentEnglishText }}</span></p>
            <p><strong class="ml-1">الترجمة:</strong> {{ currentArabicText }}</p>
          </div>
        </div>

        <!-- Action Button -->
        <button
          type="button"
          @click="!isChunkChecked ? checkChunk() : nextChunk()"
          class="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer"
        >
          {{ !isChunkChecked ? 'تحقق من الإجابة' : (currentIndex < totalChunks - 1 ? 'الجزء التالي ←' : 'عرض القصة كاملة والأسئلة 🚀') }}
        </button>
      </div>
    </section>

    <!-- PHASE 2: Full Story & Interactive Questions (LocalStorage saved) -->
    <section v-else class="space-y-6">
      
      <!-- Full Story Card -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 class="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <span>📖 النص الكامل للقصة</span>
          </h2>
          <button
            type="button"
            @click="handleStorySpeak"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
          >
            <span v-if="!isFullStorySpeak">🔊 استمع للقصة كاملة</span>
            <span v-else>🔈 اوقف الاستماع</span>
          </button>
        </div>

        <!-- Side-by-side or stacked full sentences -->
        <div class="space-y-3">
          <div
            v-for="(sentence, idx) in lesson.text"
            :key="idx"
            class="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1"
          >
            <p class="text-base font-bold text-indigo-950" dir="ltr">{{ sentence }}</p>
            <p class="text-sm text-slate-600">{{ lesson.text_ar[idx] }}</p>
          </div>
        </div>
      </div>

      <!-- Quiz Questions Section -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-extrabold text-slate-800">اختبر فهمك للقصة 🧠</h2>
          <span v-if="isSubmitted" class="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-xl">
            نتيجة الاختبار: {{ score }} / {{ lesson.questions.length }}
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

        <!-- Submit or Reset Quiz Buttons -->
        <div class="pt-2 flex gap-3">
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
            إعادة التمرين 🔄
          </button>
        </div>
      </div>

    </section>

  </div>

  <!-- Fallback if topic doesn't exist -->
  <section v-else dir="rtl" class="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
    <p class="text-lg font-bold text-slate-700">لم يتم العثور على درس الاستماع هذا</p>
    <RouterLink to="/" class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl">
      العودة للرئيسية
    </RouterLink>
  </section>
</template>
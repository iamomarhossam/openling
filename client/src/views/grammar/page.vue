<script setup>
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import data from '@/data/grammar.json'

const route = useRoute()
const topic = computed(() => String(route.params.topic || ''))

// Reactive lesson lookup
const content = computed(() => data.find((l) => l.topic === topic.value))

// Safely extract YouTube Video ID (supports watch?v= and youtu.be/)
const videoId = computed(() => {
  if (!content.value?.url) return ''
  try {
    const urlObj = new URL(content.value.url)
    if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.slice(1)
    }
    return urlObj.searchParams.get('v') || ''
  } catch {
    return ''
  }
})

// Reactive YouTube fallback search URL
const ytSearch = computed(() => {
  const cleanTopic = topic.value.split('-').join('+')
  return `https://www.youtube.com/results?search_query=${encodeURIComponent('تعلم')}+${cleanTopic}+${encodeURIComponent('الانجليزية')}`
})

const goal = 'medicine'
const userMessage = ref('')

// Prevent sending empty or tiny messages (minimum 8 non-space characters)
const MIN_CHARS = 8
const trimmedLength = computed(() => userMessage.value.trim().length)
const canAskAI = computed(() => trimmedLength.value >= MIN_CHARS)

const prompt = computed(() => {
  const lessonName = content.value?.topic?.replaceAll('-', ' ') || ''
  return `
You are a friendly English grammar coach for Egyptians. You explain in VERY easy Egyptian Arabic (عامية مصرية بسيطة جداً) — short sentences, no complicated grammar terms, no English explanations. English only appears inside the examples themselves.

The student wrote this about what confuses them:
"""${userMessage.value.trim()}"""

Lesson title: ${lessonName}
Student's goal: ${goal}

Respond in this exact format, and keep the whole answer very short and direct (كل جزء سطر أو اتنين بالكتير):

1. **بناءً على هدفك 🎯**
   ابدأ بسطر واحد: "بناءً على هدفك (${goal})، إحنا بنستخدم ده في مواقف زي كذا..." — عشان الطالب يحس إن الشرح مخصوص له.

2. **الحل ببساطة (من غير تعقيد)**
   رد على لبس الطالب بالظبط في 2–3 جمل عامية مصرية سهلة جداً. اتكلم عن النقطة اللي هو قال إنه مش فاهمها بس، وماتشرحش الموضوع كله.

3. **أمثلة على هدفك (${goal})**
   3 أمثلة إنجليزي قصيرة + ترجمة عامية مصرية، كلها مرتبطة بـ ${goal}. إيموجي واحد لكل مثال.

4. **غلطة شائعة ❌ → ✅**
   غلطة واحدة بس المصريين بيعملوها في النقطة دي.

5. **اختبر نفسك (سؤال واحد بس)**
   اسأل سؤال واحد قصير. ماتديش الإجابة.

6. **الخاتمة**
   اختم بـ: "جاوبني وأنا هصحح لك الإجابة وأقولك السبب ✅"
  `.trim()
})

const promptLink = computed(() =>
  canAskAI.value ? `https://chatgpt.com/?q=${encodeURIComponent(prompt.value)}` : undefined
)
</script>

<template>
  <article v-if="content" dir="rtl" class="w-full space-y-6">
    <!-- Lesson Header & Video Card -->
    <section class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <header class="p-6 sm:p-8 space-y-2 border-b border-slate-100">
        <span class="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-extrabold rounded-full">
          شرح القاعدة
        </span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-snug">
          {{ content.title }}
        </h1>
        <p v-if="content.description" class="text-sm sm:text-base text-slate-600 leading-relaxed">
          {{ content.description }}
        </p>
      </header>

      <!-- Responsive 16:9 YouTube Embed -->
      <div v-if="videoId" class="p-4 sm:p-6 bg-slate-50/60">
        <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-md bg-slate-900">
          <iframe
            class="absolute inset-0 w-full h-full"
            :src="`https://www.youtube.com/embed/${videoId}`"
            :title="content.title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Secondary YouTube Search Link -->
        <div class="mt-4 flex justify-end">
          <a
            :href="ytSearch"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all"
          >
            <span>شوف شرح فيديو تاني على يوتيوب</span>
            <span>👨‍🏫</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Primary Practice CTA -->
    <section class="bg-gradient-to-l from-emerald-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <h2 class="text-lg sm:text-xl font-extrabold">جاهز تختبر فهمك؟</h2>
        <p class="text-emerald-100 text-xs sm:text-sm">
          حل تمارين تفاعلية سريعة لتثبيت القاعدة
        </p>
      </div>
      <RouterLink
        :to="`/grammar/${topic}/test`"
        class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-emerald-700 hover:bg-emerald-50 font-extrabold text-sm sm:text-base rounded-xl shadow-sm active:scale-95 transition-all shrink-0"
      >
        <span>اختبرني على {{ content.title }}</span>
        <span>💪</span>
      </RouterLink>
    </section>

    <!-- AI Tutor Helper Section -->
    <section class="bg-white p-6 sm:p-8 rounded-2xl border-2 border-indigo-100/80 shadow-sm space-y-5">
      <header class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
            🤖
          </span>
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-800">
            جزء واقف معاك؟
          </h2>
        </div>
        <p class="text-sm text-slate-500">
          اكتب سؤالك وهنشرحهولك ببساطة وبأمثلة تناسبك ✨
        </p>
      </header>

      <div class="space-y-3">
        <label for="ai-question" class="block text-sm font-bold text-slate-700">
          إيه اللي محتاج تفهمه أكتر؟
        </label>

        <textarea
          id="ai-question"
          v-model="userMessage"
          rows="3"
          placeholder="مثال: إمتى أستخدم الزمن ده؟"
          class="w-full p-4 text-sm sm:text-base text-slate-800 bg-slate-50/70 border-2 border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 transition-all resize-y placeholder:text-slate-400"
        ></textarea>

        <!-- Validation Hint -->
        <p v-if="!canAskAI" class="text-xs font-semibold text-amber-600 flex items-center gap-1.5">
          <span>✍️</span>
          <span>اكتب سؤالك الأول ({{ MIN_CHARS }} حروف على الأقل) عشان تقدر تبعته للذكاء الاصطناعي.</span>
        </p>

        <!-- Submit Link (Disabled until valid) -->
        <a
          :href="promptLink"
          :target="canAskAI ? '_blank' : undefined"
          :rel="canAskAI ? 'noopener noreferrer' : undefined"
          :aria-disabled="!canAskAI"
          @click="!canAskAI && $event.preventDefault()"
          :class="
            canAskAI
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed pointer-events-none'
          "
          class="w-full py-3.5 px-6 font-bold text-base rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
        >
          <span>اشرحلي بالذكاء الاصطناعي</span>
          <span>🤖</span>
        </a>

        <p class="text-xs text-slate-400 leading-relaxed text-center">
          هيفتحلك ChatGPT بالسؤال جاهز.. اضغط إرسال بس 👆
        </p>
      </div>
    </section>
  </article>

  <!-- Fallback if topic doesn't exist -->
  <section v-else dir="rtl" class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
    <p class="text-lg font-bold text-slate-700">لم يتم العثور على هذا الدرس</p>
    <BackButton fallback="/grammar" label="العودة لدروس النحو" />
  </section>
</template>
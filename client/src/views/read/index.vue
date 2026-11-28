<script setup>
import { RouterLink } from 'vue-router'
import data from '@/data/lesson.json'
import { textToUrl } from '@/utils/helpers'
</script>

<template>
  <div dir="rtl" class="w-full flex flex-col items-center">
    <section class="w-full max-w-2xl sm:max-w-3xl space-y-6">
      
      <!-- Page Header -->
      <div class="space-y-1">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800">
          اقرأ 📖
        </h1>
        <p class="text-sm sm:text-base text-slate-500">
          اقرأ النصوص القصيرة، فهم المعاني، واختبر استيعابك
        </p>
      </div>

      <!-- Lessons Vertical Stack List -->
      <ul v-if="data?.length" class="space-y-3.5">
        <li v-for="lesson in data" :key="lesson.id || lesson.topic">
          <RouterLink
            :to="`/read/${textToUrl(lesson.title)}`"
            class="group flex items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-xs hover:border-indigo-300 hover:shadow-md active:scale-[0.99] transition-all duration-200"
          >
            <!-- Left Side: Icon & Titles -->
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                  <path d="M3 6l0 13" />
                  <path d="M12 6l0 13" />
                  <path d="M21 6l0 13" />
                </svg>
              </div>

              <div class="space-y-0.5">
                <h2 class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {{ lesson.title_ar }}
                </h2>
                <p class="text-xs sm:text-sm font-medium text-slate-400" dir="ltr">
                  {{ lesson.title }}
                </p>
              </div>
            </div>

            <!-- Right Side: Questions Counter & Arrow -->
            <div class="flex items-center gap-3">
              <span class="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-200/60">
                <span>🎯</span>
                <span>0/{{ lesson.questions?.length || 4 }} أسئلة</span>
              </span>

              <div class="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M15 6l-6 6l6 6" />
                </svg>
              </div>
            </div>
          </RouterLink>
        </li>
      </ul>

      <!-- Empty State -->
      <div v-else class="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center space-y-2">
        <p class="text-slate-500 font-semibold">لا توجد دروس استماع متاحة حالياً</p>
      </div>

    </section>
  </div>
</template>
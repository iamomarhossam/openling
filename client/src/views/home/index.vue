<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div dir="rtl" class="w-full flex flex-col items-center">
    <section class="w-full max-w-2xl sm:max-w-3xl space-y-6">
      
      <!-- Greeting / Header -->
      <div class="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-6 sm:p-8 rounded-3xl shadow-md text-center space-y-2">
        <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
          ماذا تود أن تتعلم اليوم؟ ✨
        </h1>
        <p class="text-indigo-100 text-sm sm:text-base font-medium">
          اختر أحد أقسام التعلم أدناه وابدأ رحلتك اليومية
        </p>
      </div>

      <!-- Category Links Grid (Clean, No Subtitles) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        <!-- الكلمات -->
        <RouterLink
          to="/words"
          class="group flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-xs hover:border-indigo-300 hover:shadow-md active:scale-[0.99] transition-all duration-200"
        >
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2" />
              <path d="M12 5v16" />
              <path d="M7 7h1" />
              <path d="M7 11h1" />
              <path d="M16 7h1" />
              <path d="M16 11h1" />
              <path d="M16 15h1" />
            </svg>
          </div>
          <h2 class="flex-1 text-lg sm:text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            الكلمات
          </h2>
          <div class="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </div>
        </RouterLink>

        <!-- النحو -->
        <RouterLink
          to="/grammar"
          class="group flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-xs hover:border-indigo-300 hover:shadow-md active:scale-[0.99] transition-all duration-200"
        >
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 15v-7.5a3.5 3.5 0 0 1 7 0v7.5" />
              <path d="M5 10h7" />
              <path d="M10 18l3 3l7 -7" />
            </svg>
          </div>
          <h2 class="flex-1 text-lg sm:text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            النحو
          </h2>
          <div class="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </div>
        </RouterLink>

        <!-- الاستماع -->
        <RouterLink
          to="/listen"
          class="group flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-xs hover:border-indigo-300 hover:shadow-md active:scale-[0.99] transition-all duration-200"
        >
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 15a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2l0 -3" />
              <path d="M15 15a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2l0 -3" />
              <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
            </svg>
          </div>
          <h2 class="flex-1 text-lg sm:text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            الاستماع
          </h2>
          <div class="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </div>
        </RouterLink>

        <!-- القراءة -->
        <RouterLink
          to="/read"
          class="group flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-xs hover:border-indigo-300 hover:shadow-md active:scale-[0.99] transition-all duration-200"
        >
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path d="M3 6l0 13" />
              <path d="M12 6l0 13" />
              <path d="M21 6l0 13" />
            </svg>
          </div>
          <h2 class="flex-1 text-lg sm:text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            القراءة
          </h2>
          <div class="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </div>
        </RouterLink>

        <!-- الكتابة -->
        <RouterLink
          to="/write"
          class="group sm:col-span-2 flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-xs hover:border-indigo-300 hover:shadow-md active:scale-[0.99] transition-all duration-200"
        >
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
              <path d="M13.5 6.5l4 4" />
            </svg>
          </div>
          <h2 class="flex-1 text-lg sm:text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            الكتابة
          </h2>
          <div class="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </div>
        </RouterLink>

      </div>
    </section>
  </div>
</template>
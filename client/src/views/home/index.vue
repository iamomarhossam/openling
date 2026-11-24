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

      <!-- Category Links Grid (Vertical/Responsive Stack) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        <!-- الكلمات -->
        <RouterLink
          to="/words"
          class="group flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-xs hover:border-indigo-300 hover:shadow-md active:scale-[0.99] transition-all duration-200"
        >
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-7 h-7 fill-current">
              <path d="M208,32H80A24,24,0,0,0,56,56V200a24,24,0,0,0,24,24H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,200V56a8,8,0,0,1,8-8H208V192H80A8,8,0,0,1,72,200Zm136-168H80a24,24,0,0,0,0,48H208Z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">الكلمات</h2>
            <p class="text-xs sm:text-sm text-slate-500">احفظ كلمات جديدة واختبر حصيلتك</p>
          </div>
          <div class="text-slate-300 group-hover:text-indigo-500 group-hover:-translate-x-1 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current">
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/>
            </svg>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
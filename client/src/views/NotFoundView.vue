<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div dir="rtl" class="w-full flex flex-col items-center justify-center py-12 px-4">
    <div class="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-lg text-center space-y-6">
      
      <!-- Icon Illustration -->
      <div class="w-20 h-20 mx-auto bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-10 h-10 fill-current">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM120,84a12,12,0,1,1,12,12A12,12,0,0,1,120,84Z"/>
        </svg>
      </div>

      <!-- Text Content -->
      <div class="space-y-2">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800">
          لم يتم العثور على هذه الصفحة
        </h1>
        <p class="text-sm sm:text-base text-slate-500 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة حالياً، أو ربما ستتوفر في الإصدارات القادمة قريباً! 🚀
        </p>
      </div>

      <!-- Action Button -->
      <RouterLink
        to="/"
        class="inline-flex items-center justify-center w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg active:scale-[0.99] transition-all duration-200"
      >
        العودة إلى الرئيسية
      </RouterLink>

    </div>
  </div>
</template>
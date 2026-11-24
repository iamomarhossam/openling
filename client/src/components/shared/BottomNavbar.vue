<script setup>
import { RouterLink, useRoute } from 'vue-router'

</script>

<template>
  <nav
    id="bottom-nav"
    dir="rtl"
    class="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-slate-100 shadow-[0_-8px_25px_-5px_rgba(15,23,42,0.06)] sm:bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md sm:rounded-2xl sm:border-2 sm:border-slate-200/80 sm:shadow-xl"
  >
    <div class="grid grid-cols-4 items-center px-2 py-2 sm:px-3 sm:py-2.5 gap-1">
      
      <!-- رئيسية (Home) - Active on Home and all general/sub-pages EXCEPT speak, library, settings -->
      <RouterLink
        to="/"
        active-class="!bg-indigo-50 !text-indigo-600 !border-indigo-200 shadow-xs"
        class="group flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl border-2 border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50 active:scale-95 transition-all duration-200"
      >
        <div class="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:-translate-y-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-full h-full">
            <rect width="256" height="256" fill="none" />
            <path
              d="M104,216V152h48v64h64V120a8,8,0,0,0-2.34-5.66l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,40,120v96Z"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
          </svg>
        </div>
        <span class="text-xs sm:text-sm font-bold tracking-tight">رئيسية</span>
      </RouterLink>

      <!-- تحدث (Speak) -->
      <RouterLink
        to="/speak"
        active-class="!bg-indigo-50 !text-indigo-600 !border-indigo-200 shadow-xs"
        class="group flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl border-2 border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50 active:scale-95 transition-all duration-200"
      >
        <div class="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:-translate-y-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-full h-full">
            <rect width="256" height="256" fill="none" />
            <rect
              x="96"
              y="32"
              width="64"
              height="112"
              rx="32"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
            <path
              d="M48,128a80,80,0,0,0,160,0"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
            <line
              x1="128"
              y1="208"
              x2="128"
              y2="240"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
          </svg>
        </div>
        <span class="text-xs sm:text-sm font-bold tracking-tight">تحدث</span>
      </RouterLink>

      <RouterLink
        to="/library"
        active-class="!bg-indigo-50 !text-indigo-600 !border-indigo-200 shadow-xs"
        class="group flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl border-2 border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50 active:scale-95 transition-all duration-200"
      >
        <div class="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:-translate-y-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-full h-full">
            <rect width="256" height="256" fill="none" />
            <rect
              x="40"
              y="40"
              width="48"
              height="176"
              rx="8"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
            <line
              x1="40"
              y1="80"
              x2="88"
              y2="80"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
            <rect
              x="88"
              y="40"
              width="48"
              height="176"
              rx="8"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
            <line
              x1="88"
              y1="176"
              x2="136"
              y2="176"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
            <rect
              x="158"
              y="38.58"
              width="48"
              height="176"
              rx="8"
              transform="translate(-26.56 51.42) rotate(-15)"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
            <line
              x1="171.24"
              y1="179.16"
              x2="217.61"
              y2="166.74"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
          </svg>
        </div>
        <span class="text-xs sm:text-sm font-bold tracking-tight">مكتبة</span>
      </RouterLink>

      <RouterLink
        to="/settings"
        active-class="!bg-indigo-50 !text-indigo-600 !border-indigo-200 shadow-xs"
        class="group flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl border-2 border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50 active:scale-95 transition-all duration-200"
      >
        <div class="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:rotate-45">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-full h-full">
            <rect width="256" height="256" fill="none" />
            <circle
              cx="128"
              cy="128"
              r="40"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
            <path
              d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="20"
            />
          </svg>
        </div>
        <span class="text-xs sm:text-sm font-bold tracking-tight">اعدادات</span>
      </RouterLink>

    </div>
  </nav>
</template>
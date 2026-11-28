<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
    <nav
      id="top-nav"
      dir="rtl"
      aria-label="الشريط العلوي"
      class="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
    >
      <!-- Logo Only -->
      <RouterLink to="/" class="flex items-center">
        <img
          class="h-13 sm:h-13 w-auto object-contain"
          src="/logo.png"
          alt="يلا انجلش"
          width="92"
          height="92"
        />
      </RouterLink>

      <!-- Streak Counter Badge -->
      <RouterLink
        class="flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200/80 rounded-full shadow-2xs transition-transform hover:scale-105 duration-200"
        role="status"
        aria-label="سلسلة الأيام: 0"
        to="/streak"
      >
        <div class="w-5 h-5 text-amber-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            aria-hidden="true"
            focusable="false"
            class="w-full h-full fill-current"
          >
            <rect width="256" height="256" fill="none"/>
            <path d="M136,192c20-3.37,36.61-20,40-40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/>
            <path d="M112,96l26.27-72C159.86,41.92,208,88.15,208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/>
          </svg>
        </div>
        <p class="text-sm font-black text-amber-700 tracking-wide" aria-hidden="true">0</p>
      </RouterLink>
    </nav>
  </header>
</template>
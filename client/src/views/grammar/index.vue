<script setup>
import data from '@/data/grammar.json'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div dir="rtl" class="w-full flex flex-col items-center">
    <section class="w-full max-w-2xl sm:max-w-3xl space-y-6">
      
      <!-- Page Header -->
      <div class="space-y-1">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800">
          النحو 📐
        </h1>
        <p class="text-sm sm:text-base text-slate-500">
          اختر القاعدة واختبر مستواك فيها
        </p>
      </div>

      <!-- Lessons Grid Cards -->
      <ul v-if="data?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <li v-for="(lesson, i) in data" :key="lesson.topic || i">
          <RouterLink
            :to="`/grammar/${lesson.topic}`"
            class="group flex flex-col bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-xs hover:border-indigo-300 hover:shadow-md active:scale-[0.99] transition-all duration-200"
          >
            <!-- Card Image Container -->
            <div class="relative w-full rounded-t-2xl aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
              <img
                :src="`/images/${lesson.topic}.jpg`"
                :alt="`صورة تعبر عن ${lesson.title}`"
                loading="lazy"
                class="w-full h-full rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Card Body -->
            <div class="p-4 sm:p-5 flex flex-col justify-between gap-4 flex-1">
              <h2 class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {{ lesson.title }}
              </h2>

              <!-- Progress / Questions Counter Pill -->
              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-200/60">
                  <span>🎯</span>
                  <span>0/10 أسئلة</span>
                </span>

                <span class="text-indigo-600 text-xs font-extrabold group-hover:translate-x-[-2px] transition-transform">
                  ابدأ الدرس ←
                </span>
              </div>
            </div>
          </RouterLink>
        </li>
      </ul>

      <!-- Empty State -->
      <div v-else class="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center space-y-2">
        <p class="text-slate-500 font-semibold">لا توجد دروس نحو متاحة حالياً</p>
      </div>

    </section>
  </div>
</template>
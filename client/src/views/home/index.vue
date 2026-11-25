
<script setup>
import { RouterLink } from 'vue-router'
import {
  BookOpen,
  Languages,
  Headphones,
  BookText,
  PenLine,
  ArrowLeft,
  Sparkles
} from 'lucide-vue-next'

const categories = [
  {
    title: 'الكلمات',
    description: 'احفظ كلمات جديدة واختبر حصيلتك',
    path: '/words',
    icon: Languages,
    color: 'indigo'
  },
  {
    title: 'النحو',
    description: 'قواعد اللغة بطريقة مبسطة',
    path: '/grammar',
    icon: BookText,
    color: 'violet'
  },
  {
    title: 'الاستماع',
    description: 'طور مهارة الاستماع والنطق',
    path: '/listen',
    icon: Headphones,
    color: 'blue'
  },
  {
    title: 'القراءة',
    description: 'نصوص وقصص قصيرة للفهم',
    path: '/read',
    icon: BookOpen,
    color: 'cyan'
  },
  {
    title: 'الكتابة',
    description: 'تمارين الإنشاء وصياغة الجمل',
    path: '/write',
    icon: PenLine,
    color: 'purple',
    wide: true
  }
]
</script>

<template>
  <main
    dir="rtl"
    class="min-h-screen w-full flex justify-center px-4 py-8 sm:py-12"
  >
    <section class="w-full max-w-3xl space-y-7">

      <!-- Header -->
      <header
        class="relative overflow-hidden rounded-[2rem]
        bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800
        px-6 py-9 sm:px-10 sm:py-12 text-white shadow-xl shadow-indigo-200/50"
      >
        <!-- Decorative elements -->
        <div
          class="absolute -top-16 -left-12 h-48 w-48 rounded-full
          bg-white/10 blur-2xl pointer-events-none"
        ></div>

        <div
          class="absolute -bottom-20 right-1/3 h-48 w-48 rounded-full
          bg-violet-400/20 blur-3xl pointer-events-none"
        ></div>

        <div class="relative z-10 space-y-4 text-center">

          <div
            class="mx-auto flex h-14 w-14 items-center justify-center
            rounded-2xl bg-white/15 border border-white/20
            shadow-inner"
          >
            <Sparkles :size="29" :stroke-width="1.8" />
          </div>

          <div class="space-y-2">
            <h1
              class="text-2xl sm:text-4xl font-extrabold tracking-tight"
            >
              ماذا تود أن تتعلم اليوم؟
            </h1>

            <p class="text-indigo-100 text-sm sm:text-base font-medium">
              اختر أحد أقسام التعلم أدناه وابدأ رحلتك اليومية
            </p>
          </div>

          <div
            class="mx-auto h-1 w-12 rounded-full bg-white/50"
          ></div>

        </div>
      </header>

      <!-- Section heading -->
      <div class="flex items-center justify-between px-1">
        <div>
          <h2 class="text-lg font-extrabold text-slate-800">
            أقسام التعلم
          </h2>
          <p class="text-xs text-slate-400 mt-1">
            اختر المهارة التي تريد تطويرها
          </p>
        </div>

        <span
          class="rounded-full bg-indigo-50 px-3 py-1.5
          text-xs font-bold text-indigo-600"
        >
          ٥ أقسام
        </span>
      </div>

      <!-- Categories -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <RouterLink
          v-for="category in categories"
          :key="category.path"
          :to="category.path"
          :class="[
            'group relative flex items-center gap-4',
            'rounded-2xl border border-slate-200/80',
            'bg-white p-4 sm:p-5',
            'shadow-sm hover:shadow-lg hover:shadow-indigo-100/60',
            'hover:-translate-y-1 hover:border-indigo-200',
            'active:scale-[0.98]',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
            category.wide ? 'sm:col-span-2' : ''
          ]"
        >

          <!-- Icon -->
          <div
            :class="[
              'flex h-14 w-14 shrink-0 items-center justify-center',
              'rounded-2xl transition-all duration-200',
              'group-hover:scale-105',
              category.color === 'indigo'
                ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                : '',
              category.color === 'violet'
                ? 'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white'
                : '',
              category.color === 'blue'
                ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                : '',
              category.color === 'cyan'
                ? 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white'
                : '',
              category.color === 'purple'
                ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                : ''
            ]"
          >
            <component
              :is="category.icon"
              :size="27"
              :stroke-width="1.8"
              :aria-hidden="true"
            />
          </div>

          <!-- Text -->
          <div class="min-w-0 flex-1">
            <h3
              class="text-base sm:text-lg font-extrabold
              text-slate-800 transition-colors
              group-hover:text-indigo-600"
            >
              {{ category.title }}
            </h3>

            <p class="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
              {{ category.description }}
            </p>
          </div>

          <!-- Navigation icon -->
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full text-slate-300
            transition-all duration-200
            group-hover:bg-indigo-50 group-hover:text-indigo-600
            group-hover:-translate-x-1"
          >
            <ArrowLeft :size="19" :stroke-width="2" />
          </div>

        </RouterLink>

      </div>

      <!-- Footer -->
      <footer class="pt-2 text-center">
        <p class="text-xs text-slate-400 font-medium">
          <span class="text-indigo-500">✦</span>
          تعلم شيئاً جديداً كل يوم، وتقدم بخطوات صغيرة
        </p>
      </footer>

    </section>
  </main>
</template>

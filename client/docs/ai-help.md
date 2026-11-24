# Ai Help

In this document I'm explaining how I was using AI.

## Style

Before AI:

```vue
<template>
  <main>
    <section>
      <p>{{ translation }}</p>

      <input
        dir="ltr"
        type="text"
        v-model="userInput"
        :disabled="isCorrect"
        :class="{ correct: isCorrect }"
        placeholder="اكتبها بالانجليزية"
      />

      <div v-if="showDiv" class="feedback">
        <div v-if="isCorrect" class="example-container">
          <p @click="speak(example)" class="example" dir="ltr">{{ example }}</p>
          <p class="example-translation">{{ exampleTranslation }}</p>
        </div>
        <div v-else class="hint">
          <p>{{ word }}</p>
        </div>

        <button @click="speak(word)" class="speak">🔊 استمع</button>
      </div>
    </section>

    <button class="myBtn" @click="handle">استمر</button>
  </main>
</template>
```

**After AI:**

```vue
<template>
  <main dir="rtl" class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6">
    <!-- Main Card -->
    <section class="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8 flex flex-col gap-6 transition-all">
      
      <!-- Prompt / Arabic Translation -->
      <div class="text-center space-y-1.5">
        <span class="text-xs font-semibold uppercase tracking-wider text-indigo-500">
          ترجم الكلمة التالية
        </span>
        <p class="text-2xl sm:text-3xl font-bold text-slate-800 leading-relaxed">
          {{ translation }}
        </p>
      </div>

      <!-- English Input Field -->
      <div class="w-full">
        <input
          dir="ltr"
          type="text"
          v-model="userInput"
          :disabled="isCorrect"
          :class="[
            isCorrect
              ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500/20'
              : 'border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15'
          ]"
          class="w-full px-4 py-3.5 text-lg sm:text-xl font-medium text-center rounded-xl border-2 outline-none transition-all duration-200 placeholder:text-slate-400 placeholder:text-base disabled:cursor-not-allowed"
          placeholder="اكتبها بالانجليزية"
        />
      </div>

      <!-- Feedback Section -->
      <div
        v-if="showDiv"
        :class="isCorrect ? 'bg-emerald-50/80 border-emerald-200' : 'bg-indigo-50/70 border-indigo-100'"
        class="rounded-xl p-4 border transition-all duration-300 flex flex-col gap-3"
      >
        <!-- Correct Answer & Example -->
        <div v-if="isCorrect" class="space-y-1.5">
          <div class="flex items-center gap-1.5 text-emerald-700 font-semibold text-sm">
            <span>✓</span>
            <span>إجابة صحيحة! مثال في جملة:</span>
          </div>
          <p
            @click="speak(example)"
            dir="ltr"
            title="اضغط للاستماع للجملة"
            class="text-base sm:text-lg font-semibold text-indigo-950 hover:text-indigo-600 cursor-pointer transition-colors text-left"
          >
            {{ example }}
          </p>
          <p class="text-sm text-slate-600 leading-relaxed">
            {{ exampleTranslation }}
          </p>
        </div>

        <!-- Hint / Correct Word -->
        <div v-else class="flex items-center justify-between">
          <span class="text-sm font-medium text-indigo-900">الإجابة الصحيحة:</span>
          <p dir="ltr" class="text-lg font-bold text-indigo-700 tracking-wide">
            {{ word }}
          </p>
        </div>

        <!-- Audio Pronunciation Button -->
        <div class="pt-2 border-t border-slate-200/60 flex justify-end">
          <button
            type="button"
            @click="speak(word)"
            class="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-semibold text-indigo-700 bg-white hover:bg-indigo-50 active:scale-95 rounded-lg border border-indigo-200 shadow-xs transition-all cursor-pointer"
          >
            <span>🔊</span>
            <span>استمع للنطق</span>
          </button>
        </div>
      </div>

      <!-- Action Button -->
      <button
        type="button"
        @click="handle"
        :class="
          isCorrect
            ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500/30'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500/30'
        "
        class="w-full py-3.5 px-6 text-white font-bold text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg active:scale-[0.99] focus:ring-4 transition-all duration-200 cursor-pointer"
      >
        استمر
      </button>

    </section>
  </main>
</template>
```

**What Changed?**
- Code & logic stays same but AI (Gemini) adding tailwindcss styles

Why? so I focus on what's important and don't waste time and ship faster :)
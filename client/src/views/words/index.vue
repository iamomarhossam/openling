<script setup>
import { RouterLink } from 'vue-router'
import vocabsData from '@/data/data.json'
import { ref } from "vue";

const order = ref("a-z")

const vocabs = ref(vocabsData)

function filterVocabs() {  
  if (order.value === "a-z") {
    vocabs.value = vocabsData.sort((a, b) => a.word.localeCompare(b.word))
  }
  if (order.value === "z-a") {
    vocabs.value = vocabsData.sort((a, b) => b.word.localeCompare(a.word))
  }
  if (order.value === "noun") {
    vocabs.value = vocabsData.filter(v => v.types.includes("noun"))
  }
  if (order.value === "verb") {
    vocabs.value = vocabsData.filter(v => v.types.includes("verb"))
  }
  if (order.value === "adj") {
    vocabs.value = vocabsData.filter(v => v.types.includes("adj"))
  }
  if (order.value === "adv") {
    vocabs.value = vocabsData.filter(v => v.types.includes("adv"))
  }
}

/*function checkWord(e) {
  e.currentTarget.classList.toggle('marked')
}
@click="checkWord($event)"
*/
</script>

<template>
  <main dir="rtl" class="w-full pb-10 space-y-6">
    
    <!-- Page Header & Action Button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div class="space-y-1">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          <span>الكلمات</span>
          <span class="text-xl">📖</span>
        </h1>
        <p class="text-sm text-slate-500">إدارة وتدريب الكلمات الخاصة بك بسهولة</p>
      </div>

      <RouterLink
        to="/words/practice"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg active:scale-98 transition-all duration-200"
      >
        <span>ابدأ التدريب</span>
        <span class="text-lg">💪</span>
      </RouterLink>
    </div>

    <!-- Filter Control Bar -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <label for="order" class="text-sm font-bold text-slate-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 text-indigo-600">
          <rect width="256" height="256" fill="none"/>
          <path d="M36,120H220M64,64H192M96,176H160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/>
        </svg>
        <span>ترتيب القائمة وحسب التصنيف:</span>
      </label>

      <div class="relative w-full sm:w-56">
        <select
          v-model="order"
          id="order"
          @change="filterVocabs"
          class="w-full appearance-none bg-slate-50 border-2 border-slate-200 text-slate-700 font-semibold text-sm rounded-xl px-4 py-2.5 pr-4 pl-10 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer"
        >
          <option value="a-z" selected>A إلي Z</option>
          <option value="z-a">Z إلي A</option>
          <option value="noun">كلمات (أسماء)</option>
          <option value="verb">أفعال</option>
          <option value="adv">حال</option>
          <option value="adj">صفات</option>
        </select>
        <!-- Custom Dropdown Arrow -->
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current">
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Vocab Table Section -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div v-if="vocabs.length" class="overflow-x-auto">
        <table class="w-full text-right border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <th class="py-3.5 px-4 sm:px-6">الكلمة</th>
              <th class="py-3.5 px-4 sm:px-6">الترجمة</th>
              <th class="py-3.5 px-4 sm:px-6">النوع</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr
              v-for="(vocab, i) in vocabs"
              :key="i"
              class="hover:bg-indigo-50/40 transition-colors"
            >
              <td class="py-4 px-4 sm:px-6 font-bold text-indigo-950 text-base" dir="ltr">{{ vocab.word }}</td>
              <td class="py-4 px-4 sm:px-6 font-medium text-slate-800">{{ vocab.translation }}</td>
              <td class="py-4 px-4 sm:px-6">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="(type, j) in vocab.types"
                    :key="j"
                    class="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100/60"
                  >
                    {{ type }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="py-16 text-center space-y-3">
        <div class="w-12 h-12 mx-auto text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-full h-full fill-current">
            <rect width="256" height="256" fill="none"/>
            <path d="M208,80H176V56a24,24,0,0,0-24-24H104A24,24,0,0,0,80,56V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8V80H96ZM208,208H48V96H208V208Z"/>
          </svg>
        </div>
        <p class="text-slate-500 font-medium">لا يتوفر كلمات حالياً</p>
      </div>
    </div>

  </main>
</template>
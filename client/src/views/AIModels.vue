
<script setup>
import { ref, onMounted } from 'vue'
import {
  initTranslation,
  initVoice,
  getAIStatus
} from '@/utils/ai'

const translationEnabled = ref(false)
const voiceEnabled = ref(false)

const translationReady = ref(false)
const voiceReady = ref(false)

const loadingTranslation = ref(false)
const loadingVoice = ref(false)

const persistentStorage = ref(false)
const storageUsed = ref(0)
const storageQuota = ref(0)

const error = ref('')

async function refreshStatus() {
  translationEnabled.value =
    localStorage.getItem('translation-approved') === 'true'

  voiceEnabled.value =
    localStorage.getItem('voice-approved') === 'true'

  const status = getAIStatus()

  translationReady.value = !!status.translationReady
  voiceReady.value = !!status.voiceReady

  if (navigator.storage) {
    persistentStorage.value = await navigator.storage.persisted()

    const estimate = await navigator.storage.estimate()
    storageUsed.value = estimate.usage || 0
    storageQuota.value = estimate.quota || 0
  }
}

async function enableTranslation() {
  error.value = ''
  loadingTranslation.value = true

  try {
    localStorage.setItem('translation-approved', 'true')
    await initTranslation()
    await refreshStatus()
  } catch (e) {
    error.value = 'Could not load the translation model. Please try again.'
    console.error(e)
  } finally {
    loadingTranslation.value = false
  }
}

async function enableVoice() {
  error.value = ''
  loadingVoice.value = true

  try {
    localStorage.setItem('voice-approved', 'true')
    await initVoice()
    await refreshStatus()
  } catch (e) {
    error.value = 'Could not load the voice model. Please try again.'
    console.error(e)
  } finally {
    loadingVoice.value = false
  }
}

async function protectStorage() {
  if (!navigator.storage?.persist) return

  persistentStorage.value = await navigator.storage.persist()
  await refreshStatus()
}

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

onMounted(refreshStatus)
</script>

<template>
  

    <header>
      <h1 class="text-2xl font-black text-slate-800">
        نماذج الذكاء الاصطناعي 🤖
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        إدارة النماذج المحمّلة على جهازك.
      </p>
    </header>

    <!-- Storage -->
    <section class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 class="font-bold text-slate-800">💾 مساحة التخزين</h2>

      <div class="mt-3 flex justify-between text-sm">
        <span class="text-slate-500">المساحة المستخدمة</span>
        <span class="font-semibold text-slate-700">
          {{ formatBytes(storageUsed) }}
          <span v-if="storageQuota">
            / {{ formatBytes(storageQuota) }}
          </span>
        </span>
      </div>

      <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          class="h-full rounded-full bg-indigo-500"
          :style="{
            width: storageQuota
              ? Math.min(100, storageUsed / storageQuota * 100) + '%'
              : '0%'
          }"
        ></div>
      </div>

      <div class="mt-4 flex items-center justify-between gap-3">
        <p class="text-sm text-slate-600">
          التخزين الدائم:
          <span :class="persistentStorage ? 'text-green-600' : 'text-amber-600'">
            {{ persistentStorage ? 'مفعّل' : 'غير مفعّل' }}
          </span>
        </p>

        <button
          v-if="!persistentStorage"
          @click="protectStorage"
          class="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700"
        >
          حماية التخزين
        </button>
      </div>

      <p class="mt-2 text-xs text-slate-400">
        حماية التخزين تقلل احتمال حذف المتصفح للملفات تلقائياً،
        لكنها لا تمنع حذفها يدوياً.
      </p>
    </section>

    <!-- Translation -->
    <section class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h2 class="font-bold text-lg text-slate-800">
            🌍 الترجمة الإنجليزية - العربية
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            نموذج ترجمة النصوص إلى العربية.
          </p>
        </div>

        <span
          class="shrink-0 rounded-full px-3 py-1 text-xs font-bold"
          :class="translationReady
            ? 'bg-green-50 text-green-700'
            : translationEnabled
              ? 'bg-amber-50 text-amber-700'
              : 'bg-slate-100 text-slate-500'"
        >
          {{ translationReady ? 'جاهز' : translationEnabled ? 'مفعّل' : 'غير مفعّل' }}
        </span>
      </div>

      <button
        @click="enableTranslation"
        :disabled="loadingTranslation"
        class="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {{ loadingTranslation ? 'جاري التحميل...' : translationReady ? 'تحميل النموذج مجدداً' : 'تفعيل وتحميل النموذج' }}
      </button>
    </section>

    <!-- Kokoro -->
    <section class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h2 class="font-bold text-lg text-slate-800">
            🔊 Kokoro Voice
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            صوت طبيعي لقراءة الكلمات والجمل الإنجليزية.
          </p>
        </div>

        <span
          class="shrink-0 rounded-full px-3 py-1 text-xs font-bold"
          :class="voiceReady
            ? 'bg-green-50 text-green-700'
            : voiceEnabled
              ? 'bg-amber-50 text-amber-700'
              : 'bg-slate-100 text-slate-500'"
        >
          {{ voiceReady ? 'جاهز' : voiceEnabled ? 'مفعّل' : 'غير مفعّل' }}
        </span>
      </div>

      <button
        @click="enableVoice"
        :disabled="loadingVoice"
        class="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {{ loadingVoice ? 'جاري التحميل...' : voiceReady ? 'تحميل النموذج مجدداً' : 'تفعيل وتحميل النموذج' }}
      </button>
    </section>

    <p v-if="error" class="rounded-xl bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
    </p>

    <button
      @click="refreshStatus"
      class="w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-600"
    >
      تحديث الحالة ↻
    </button>

</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  fallback: {
    type: String,
    default: '/'
  },
  label: {
    type: String,
    default: 'رجوع'
  }
})

const router = useRouter()

const goBack = () => {
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push(props.fallback)
  }
}
</script>

<template>
  <button
    type="button"
    @click="goBack"
    class="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-bold text-slate-600 bg-white hover:bg-indigo-50 hover:text-indigo-600 border-2 border-slate-100 hover:border-indigo-200 rounded-xl shadow-2xs active:scale-95 transition-all duration-200 cursor-pointer"
  >
    <!-- Right arrow for RTL "Back" -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current">
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
    <span>{{ label }}</span>
  </button>
</template>
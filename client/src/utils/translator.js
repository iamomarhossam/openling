import { pipeline, env } from '@huggingface/transformers'

env.allowLocalModels = false
env.useBrowserCache = true

const MODEL = 'Xenova/opus-mt-en-ar'

let translator = null
let loadingPromise = null

const cache = new Map()

export async function loadTranslator(onProgress = () => {}) {
  if (translator) return translator
  if (loadingPromise) return loadingPromise

  loadingPromise = pipeline('translation', MODEL, {
    dtype: 'q8',
    progress_callback: onProgress
  })
    .then(instance => {
      translator = instance
      return instance
    })
    .finally(() => {
      loadingPromise = null
    })

  return loadingPromise
}

export async function translateWord(word) {
  const clean = word.trim().toLowerCase()

  if (!clean) return ''

  if (cache.has(clean)) return cache.get(clean)

  const model = await loadTranslator()

  const result = await model(clean, {
    max_new_tokens: 64
  })

  const translated = result[0]?.translation_text || ''

  cache.set(clean, translated)

  return translated
}

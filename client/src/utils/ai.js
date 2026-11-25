
import { pipeline, env } from '@huggingface/transformers'
import { KokoroTTS } from 'kokoro-js'

env.useBrowserCache = true
env.allowLocalModels = false

const TRANSLATION_MODEL = 'Xenova/opus-mt-en-ar'
const VOICE_MODEL = 'onnx-community/Kokoro-82M-v1.0-ONNX'

let translator = null
let kokoro = null

let translationPromise = null
let voicePromise = null

let currentAudio = null
let currentAudioUrl = null

let speakId = 0

const translations = new Map()

// Ask browser to protect downloaded data from automatic eviction.
export async function requestPersistentStorage() {
  if (!navigator.storage?.persist) return false

  try {
    return await navigator.storage.persist()
  } catch {
    return false
  }
}

// Check available browser storage.
export async function getStorageInfo() {
  if (!navigator.storage?.estimate) return null

  return navigator.storage.estimate()
}

// Initialize translation model.
export async function initTranslation(onProgress = () => {}) {
  if (translator) return translator
  if (translationPromise) return translationPromise

  translationPromise = pipeline(
    'translation',
    TRANSLATION_MODEL,
    {
      dtype: 'q8',
      progress_callback: onProgress
    }
  )
    .then(model => {
      translator = model
      return model
    })
    .finally(() => {
      translationPromise = null
    })

  return translationPromise
}

// Translate a word or sentence.
export async function translate(text) {
  const word = text.trim().toLowerCase()

  if (!word) return ''

  if (translations.has(word)) {
    return translations.get(word)
  }

  const model = await initTranslation()

  const result = await model(word, {
    max_new_tokens: 128
  })

  const value = result[0]?.translation_text || ''

  translations.set(word, value)

  return value
}

// Initialize Kokoro.
export async function initVoice(onProgress = () => {}) {
  if (kokoro) return kokoro
  if (voicePromise) return voicePromise

  voicePromise = KokoroTTS.from_pretrained(VOICE_MODEL, {
    dtype: 'q8',
    device: 'wasm',
    progress_callback: onProgress
  })
    .then(model => {
      kokoro = model
      return model
    })
    .finally(() => {
      voicePromise = null
    })

  return voicePromise
}

// Stop currently playing audio.
export function stopSpeaking() {
  speakId++

  if (currentAudio) {
    currentAudio.pause()
    currentAudio.onended = null
    currentAudio.onerror = null
    currentAudio.onpause = null
    currentAudio = null
  }

  if (currentAudioUrl) {
    URL.revokeObjectURL(currentAudioUrl)
    currentAudioUrl = null
  }

  if (typeof window !== 'undefined') {
    window.speechSynthesis?.cancel()
  }
}

// Split text into sentences.
function splitIntoSentences(text) {
  return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map(sentence => sentence.trim())
    .filter(Boolean) || [text]
}

// Generate one sentence.
async function generateAudio(text) {
  const audio = await kokoro.generate(text, {
    voice: 'af_heart',
    speed: 0.9
  })

  return URL.createObjectURL(audio.toBlob())
}

// Play one generated audio file.
function playAudio(url, id) {
  return new Promise((resolve, reject) => {
    if (id !== speakId) {
      URL.revokeObjectURL(url)
      resolve()
      return
    }

    const player = new Audio(url)

    currentAudio = player
    currentAudioUrl = url

    let finished = false

    function cleanup() {
      if (finished) return
      finished = true

      player.onended = null
      player.onerror = null
      player.onpause = null

      if (currentAudio === player) {
        currentAudio = null
        currentAudioUrl = null
      }

      URL.revokeObjectURL(url)
    }

    player.onended = () => {
      cleanup()
      resolve()
    }

    player.onerror = () => {
      cleanup()
      reject(new Error('Audio playback failed'))
    }

    // Stop also resolves the waiting playback promise.
    player.onpause = () => {
      if (id !== speakId) {
        cleanup()
        resolve()
      }
    }

    player.play().catch(error => {
      cleanup()
      reject(error)
    })
  })
}

// Normal browser voice fallback.
function browserSpeak(text) {
  if (typeof window === 'undefined') return

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9

    window.speechSynthesis.speak(utterance)
  }
}

// Speak using Kokoro, with browser fallback.
export async function speak(text) {
  if (!text?.trim()) return

  stopSpeaking()

  const id = speakId
  const cleanText = text.trim()

  try {
    // Only initialize Kokoro if the user enabled it.
    if (!kokoro) {
      const approved =
        localStorage.getItem('voice-approved') === 'true'

      if (approved) {
        await initVoice()
      }
    }

    if (id !== speakId) return

    // Use browser voice if Kokoro isn't enabled.
    if (!kokoro) {
      browserSpeak(cleanText)
      return
    }

    const sentences = splitIntoSentences(cleanText)

    // Generate the first sentence.
    let nextAudio = generateAudio(sentences[0])

    for (let i = 0; i < sentences.length; i++) {
      // Wait for the current sentence to finish generating.
      let url

      try {
        url = await nextAudio
      } catch (error) {
        if (id !== speakId) return

        console.error('Kokoro generation error:', error)

        // Fall back for the remaining text.
        browserSpeak(sentences.slice(i).join(' '))
        return
      }

      if (id !== speakId) {
        URL.revokeObjectURL(url)
        return
      }

      // Start playing immediately.
      const playback = playAudio(url, id)

      // Generate the next sentence while this one plays.
      if (i + 1 < sentences.length) {
        nextAudio = generateAudio(sentences[i + 1])
      }

      try {
        await playback
      } catch (error) {
        if (id !== speakId) return

        console.error('Kokoro playback error:', error)

        // Fall back for the remaining text.
        browserSpeak(sentences.slice(i + 1).join(' ') || sentences[i])
        return
      }

      if (id !== speakId) return
    }

  } catch (error) {
    if (id !== speakId) return

    console.error('Voice error:', error)

    // Final fallback.
    browserSpeak(cleanText)
  }
}

// Check model readiness.
export function getAIStatus() {
  return {
    translation: !!translator,
    voice: !!kokoro,
    translationReady: !!translator,
    voiceReady: !!kokoro
  }
}

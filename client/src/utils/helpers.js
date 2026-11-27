export function speak(text) {
  if (typeof window === 'undefined') return
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9

    window.speechSynthesis.speak(utterance)
  }
}

export function textToUrl(text) { // "Ahmed in the Zoo" -> "ahmed-in-the-zoo"
  return text.trim().toLowerCase().replace(/\s+/g, "-")
}
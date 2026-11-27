export function speak(text) {
  if (typeof window === 'undefined') return
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9

    window.speechSynthesis.speak(utterance)
  }
}

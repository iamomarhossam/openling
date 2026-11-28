export function speak(text) {
  if (typeof window === 'undefined') return
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9

    window.speechSynthesis.speak(utterance)
  }
}

export function stopSpeak() {
  if (typeof window === 'undefined') return
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

export function speakAsync(text) { // I used that in reading page
  return new Promise((resolve) => {
    speak(text)
    const check = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(check)
        resolve()
      }
    }, 100)
  })
}

export function textToUrl(text) { // "Ahmed in the Zoo" -> "ahmed-in-the-zoo"
  return text.trim().toLowerCase().replace(/\s+/g, "-")
}
import { speak as aiSpeak } from '@/utils/ai'

export function speak(word) {
  return aiSpeak(word)
}

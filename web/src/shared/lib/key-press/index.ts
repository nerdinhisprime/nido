import { onMounted, onUnmounted } from "vue";

type ShortcutActions = Record<string, (e: KeyboardEvent) => void>

export const useKeyPress = (actions: ShortcutActions) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    const modifiers: string[] = []
    if(event.ctrlKey) modifiers.push('ctrl')

    modifiers.push(event.key.toLowerCase())
    const shortcut = modifiers.join('+')
    if(actions[shortcut]) {
      event.preventDefault()
      actions[shortcut](event)
    }
  }
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
}

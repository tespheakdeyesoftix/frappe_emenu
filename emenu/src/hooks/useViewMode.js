import { ref } from "vue"

const STORAGE_KEY = "product-view-mode"
const viewMode = ref(localStorage.getItem(STORAGE_KEY) ?? "grid")

function setViewMode(mode) {
  viewMode.value = mode
  localStorage.setItem(STORAGE_KEY, mode)
}

export function useViewMode() {
  return { viewMode, setViewMode }
}

import { reactive, ref } from 'vue'
import router from '@/router'
import showAlert from '@/scripts/showAlert'
import { changeLocale } from '@/main'

export const useAlert = reactive({
  visible: false,
  title: '',
  message: '',
  type: '',
  toggleVisibility(visibility: boolean) {
    this.visible = visibility
  },
  changeTitle(title: string) {
    this.title = title
  },
  changeMessage(message: string) {
    this.message = message
  },
  changeType(type: string) {
    this.type = type
  }
})

export const useLoading = reactive({
  visible: ref(localStorage.getItem('loadingVisible')),

  toggleVisibility(visibility: any) {
    this.visible = visibility
  }
})

export const usePath = reactive({
  name: ref(''),

  changeName(newName: any) {
    this.name = newName
  }
})

export const useResponse = reactive({
  responses: ref(localStorage.getItem('responses') ?? ''),
  tausi: ref(localStorage.getItem('tausi') ?? ''),

  setResponse(newResponse: any) {
    this.responses = newResponse
    localStorage.setItem('responses', newResponse)
  },

  setTausi(newTausi: any) {
    this.tausi = newTausi
    localStorage.setItem('tausi', newTausi)
  },

  removeResponse() {
    this.responses.value = ''
    localStorage.removeItem('responses')
    localStorage.removeItem('path')
  }
})

export const useHistory = reactive({
  history: JSON.parse(localStorage.getItem('history') || '[]'),
  isFull: ref(false),

  setHistory(newHistory: any) {
    this.history.push(newHistory)
    localStorage.setItem('history', JSON.stringify(this.history))
  },

  async clearHistory() {
    localStorage.setItem('history', '[]')
    this.history.length = 0
    usePrompt.changeVisibility(false)
    showAlert('alert-success', 'Success', 'Search history has been cleared!')
    await router.push('/')
    usePath.changeName('home')
  },

  changeSize(newSize: any) {
    this.isFull = newSize
  }
})

export const usePrompt = {
  isVisible: ref(false),

  changeVisibility(visibility: any) {
    this.isVisible.value = visibility
  }
}

export const useLocale = reactive({
  language: ref(localStorage.getItem('locale') || 'en_US'),

  changeLanguage(selectedLanguage: any) {
    this.language = selectedLanguage
    changeLocale(selectedLanguage)
  }
})

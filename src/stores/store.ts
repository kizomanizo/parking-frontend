import { reactive, ref } from 'vue'

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
  name: ref(localStorage.getItem('path') || 'home'),

  changeName(newName: any) {
    this.name = newName
    localStorage.setItem('path', newName)
  }
})

export const useResponse = reactive({
  responses: ref(localStorage.getItem('responses') || ''),

  setResponse(newResponse: any) {
    this.responses = newResponse
    localStorage.setItem('responses', newResponse)
  },

  removeResponse() {
    this.responses.value = ''
    localStorage.removeItem('responses')
    localStorage.removeItem('path')
  }
})

export const useHistory = {
  history: JSON.parse(localStorage.getItem('history') || '[]'),

  setHistory(newHistory: any) {
    this.history.push(newHistory)
    localStorage.setItem('history', JSON.stringify(this.history))
  }
}

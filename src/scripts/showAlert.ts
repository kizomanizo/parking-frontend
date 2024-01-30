import { useAlert } from '@/stores/store'

function showAlert(alertType: string, alertTitle: string, alertMessage: string) {
  useAlert.toggleVisibility(true)
  useAlert.changeType(alertType)
  useAlert.changeTitle(alertTitle)
  useAlert.changeMessage(alertMessage)
  setTimeout(() => {
    useAlert.toggleVisibility(false)
  }, 3000)
}

export default showAlert

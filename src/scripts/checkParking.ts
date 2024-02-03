import axios from 'axios'
import showAlert from '@/scripts/showAlert'
import { useLoading, useResponse, usePath, useHistory } from '@/stores/store'
import router from '@/router' // Import the router instance from the router file

const tzRegex = /^[Tt]\d{3}[A-Za-z]{3}$/

export const handleCheckParking = async (regNumber: any) => {
  if (useLoading.visible) return
  useLoading.toggleVisibility(true)
  try {
    if (tzRegex.test(regNumber)) {
      const termisUrl = import.meta.env.VITE_TERMIS_ENDPOINT
      const termisResponse = await axios.get(termisUrl + regNumber, {})
      // Store the token in Vue store
      const response = termisResponse.data
      if (!response.status) {
        showAlert('alert-warning', 'WARNING', `${regNumber} has no bills!!`)
        return
      }
      // Add the REG to the history
      useHistory.setHistory(regNumber)
      useResponse.setResponse(JSON.stringify(response.data))
      usePath.changeName('results')
      await router.push('/results')
    } else {
      showAlert('alert-danger', 'Error', `${regNumber} is an invalid plate number`)
    }
  } catch (error: any) {
    console.error(error)
  } finally {
    useLoading.toggleVisibility(false)
  }
}

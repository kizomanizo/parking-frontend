import axios from 'axios'
import showAlert from '@/scripts/showAlert'
import { useLoading, useResponse, usePath, useHistory } from '@/stores/store'
import router from '@/router' // Import the router instance from the router file

export const handleCheckParking = async (regNumber: any) => {
  if (useLoading.visible) return
  useLoading.toggleVisibility(true)

  // Define the regex patterns
  const tzRegex = /^[Tt]\d{3}[A-Za-z]{3}$/ // Final format: T + 3 digits + 3 letters
  const unsanitizedRegex = /^[0-9]{3}[A-Za-z]{3}$/ // Unsanitized format: 3 digits + 3 letters

  try {
    let sanitizedRegNumber = regNumber

    // Check if the input matches the unsanitized format
    if (unsanitizedRegex.test(regNumber)) {
      // Extract the 3 digits and 3 letters, then ensure letters are uppercase
      const digits = regNumber.substring(0, 3)
      const letters = regNumber.substring(3, 6).toUpperCase()
      sanitizedRegNumber = `T${digits}${letters}` // Prepend 'T' and ensure letters are caps
    } else if (tzRegex.test(regNumber)) {
      // If it already has 'T' prefix, just ensure the letters are uppercase
      const prefix = regNumber.substring(0, 4) // 'T' + 3 digits
      const letters = regNumber.substring(4, 7).toUpperCase()
      sanitizedRegNumber = `${prefix}${letters}`
    }
    // Validate the sanitized registration number
    if (tzRegex.test(sanitizedRegNumber)) {
      const termisUrl = import.meta.env.VITE_TERMIS_ENDPOINT
      const termisResponse = await axios.get(termisUrl + sanitizedRegNumber, {})

      // Store the token in Vue store
      const response = termisResponse.data
      if (!response.status) {
        showAlert('alert-info', 'INFO', `${sanitizedRegNumber} has no bills!!`)
        return
      }

      // Add the sanitized REG to the history
      useHistory.setHistory(sanitizedRegNumber)
      useResponse.setResponse(JSON.stringify(response.data))
      useResponse.setTausi(JSON.stringify(response.tausi))
      usePath.changeName('results')
      await router.push('/results')
    } else {
      showAlert('alert-danger', 'Error', `${regNumber || 'EMPTY'} is an invalid plate number`)
    }
  } catch (error: any) {
    console.error(error)
  } finally {
    useLoading.toggleVisibility(false)
  }
}

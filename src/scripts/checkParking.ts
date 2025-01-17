import axios from 'axios'
import showAlert from '@/scripts/showAlert'
import { useLoading, useResponse, usePath, useHistory } from '@/stores/store'
import router from '@/router' // Import the router instance from the router file

// const tzRegex = /^[Tt]\d{3}[A-Za-z]{3}$/

// export const handleCheckParking = async (regNumber: any) => {
//   if (useLoading.visible) return
//   useLoading.toggleVisibility(true)
//   try {
//     if (tzRegex.test(regNumber)) {
//       const termisUrl = import.meta.env.VITE_TERMIS_ENDPOINT
//       const termisResponse = await axios.get(termisUrl + regNumber, {})
//       // Store the token in Vue store
//       const response = termisResponse.data
//       if (!response.status) {
//         showAlert('alert-warning', 'WARNING', `${regNumber} has no bills!!`)
//         return
//       }
//       // Add the REG to the history
//       useHistory.setHistory(regNumber)
//       useResponse.setResponse(JSON.stringify(response.data))
//       usePath.changeName('results')
//       await router.push('/results')
//     } else {
//       showAlert('alert-danger', 'Error', `${regNumber || 'EMPTY'} is an invalid plate number`)
//     }
//   } catch (error: any) {
//     console.error(error)
//   } finally {
//     useLoading.toggleVisibility(false)
//   }
// }

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
      sanitizedRegNumber = `T${regNumber}` // Prepend 'T' to sanitize the input
    }
    // Validate the sanitized registration number
    if (tzRegex.test(sanitizedRegNumber)) {
      const termisUrl = import.meta.env.VITE_TERMIS_ENDPOINT
      const termisResponse = await axios.get(termisUrl + sanitizedRegNumber, {})

      // Store the token in Vue store
      const response = termisResponse.data
      if (!response.status) {
        showAlert('alert-warning', 'WARNING', `${sanitizedRegNumber} has no bills!!`)
        return
      }

      // Add the sanitized REG to the history
      useHistory.setHistory(sanitizedRegNumber)
      useResponse.setResponse(JSON.stringify(response.data))
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

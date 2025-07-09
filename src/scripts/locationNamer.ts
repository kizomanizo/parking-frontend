import axios from 'axios'

interface LocationComponents {
  road?: string
  suburb?: string
  ward?: string
}

interface GeocodingResult {
  components: LocationComponents
}

interface GeocodingResponse {
  results: GeocodingResult[]
  status: {
    code: number
    message: string
  }
}

export const locationNamer = async (lat: number, lng: number): Promise<string> => {
  try {
    // const apiUrl = import.meta.env.VITE_GEOLOCATION_API
    const apiUrl = import.meta.env.VITE_OPENCAGEDATA_API
    // const apiKey = import.meta.env.VITE_GEO_KEY
    const apiKey = import.meta.env.VITE_OPENCAGEDATA_API_KEY

    if (!apiUrl || !apiKey) {
      console.error('Missing geolocation API configuration')
      return ''
    }

    // Use a CORS proxy for development
    const response = await axios.get<GeocodingResponse>(apiUrl, {
      params: {
        q: `${lat},${lng}`,
        key: apiKey,
        no_annotations: 1,
        language: 'en'
      }
    })

    if (response.data.status.code !== 200 || !response.data.results.length) {
      console.error('Geocoding API error:', response.data.status)
      return ''
    }

    const components = response.data.results[0].components
    const road = components.road ?? ''
    const suburb = components.suburb ?? ''
    const ward = components.ward ?? ''

    // Format: "Road: Suburb - Ward" (only include available parts)
    const parts = []
    if (road) parts.push(road)
    if (suburb) parts.push(suburb)
    if (ward) parts.push(ward)

    if (parts.length === 0) return ''

    // Join with appropriate separators
    if (parts.length === 1) {
      return parts[0]
    } else if (parts.length === 2) {
      return `${parts[0]} - ${parts[1]}`
    } else {
      return `${parts[0]}: ${parts[1]} - ${parts[2]}`
    }
  } catch (error) {
    console.error('Error fetching location name:', error)
    // Fallback for development/testing
    return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
  }
}

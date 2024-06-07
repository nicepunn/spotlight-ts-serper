type CurlCommand = {
  url: string
  method: string
  headers: { [key: string]: string }
  body: string
}

const parseCurlCommand = (curl: string): CurlCommand => {
  const lines = curl.split('\\\n').map((line) => line.trim())
  const urlLine = lines.find((line) => line.startsWith('curl'))
  if (!urlLine) throw new Error('Invalid cURL command')

  const urlMatch = urlLine.match(/'([^']+)'/)
  if (!urlMatch) throw new Error('URL not found in cURL command')

  const url = urlMatch[1]
  const method = urlLine.includes('--request') ? 'POST' : 'GET'

  const headers: { [key: string]: string } = {}
  let body = ''

  lines.forEach((line) => {
    if (line.startsWith('--header')) {
      const headerMatch = line.match(/'([^']+): ([^']+)'/)
      if (headerMatch) {
        headers[headerMatch[1]] = headerMatch[2]
      }
    } else if (line.startsWith('--data-raw')) {
      const bodyMatch = line.match(/'([^']+)'/)
      if (bodyMatch) {
        body = bodyMatch[1]
      }
    }
  })

  return { url, method, headers, body }
}

export const fetchFromCurl = async (curl: string): Promise<any> => {
  const { url, method, headers, body } = parseCurlCommand(curl)

  const response = await fetch(url, {
    method,
    headers,
    body: method === 'POST' ? body : undefined,
  })

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }

  return response.json()
}

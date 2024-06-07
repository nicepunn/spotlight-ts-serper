import { FormFilterProps } from '../../interfaces'
import { defaultFilterProps } from '../../zustand/store'
import * as curlconverter from 'curlconverter'

export const convertToCurl = (data: FormFilterProps, apiKey: string) => {
  const {
    Autocorrect,
    CodingLanguage,
    Country,
    DateRange,
    Language,
    Location,
    Method,
    MiniBatch,
    Page,
    Query,
    Results,
    Type,
    CID,
    GPSPosition,
    PlaceID,
    URL,
  } = data
  const dateRangeMapper: { [key: string]: string } = {
    'Past hour': 'h',
    'Past 24 hours': 'd',
    'Past week': 'w',
    'Past month': 'm',
    'Past year': 'y',
  }

  const extractValueInParentheses = (str: string): string => {
    const match = str.match(/\(([^)]+)\)/)
    return match ? match[1] : ''
  }

  const autocorrect =
    !Autocorrect &&
    Type.name !== 'Maps' &&
    Type.name !== 'Patents' &&
    Type.name !== 'Webpage'
      ? `"autocorrect":false`
      : ``
  const country =
    Country !== defaultFilterProps.Country &&
    Type.name !== 'Maps' &&
    Type.name !== 'Patents'
      ? `"gl":"${extractValueInParentheses(Country)}"`
      : ``
  const dateRange =
    DateRange !== defaultFilterProps.DateRange &&
    Type.name !== 'Places' &&
    Type.name !== 'Shopping' &&
    Type.name !== 'Scholar' &&
    Type.name !== 'Maps' &&
    Type.name !== 'Patents' &&
    Type.name !== 'Webpage' &&
    Type.name !== 'Autocomplete'
      ? `"tbs":"qdr:${dateRangeMapper[DateRange]}"`
      : ``
  const language =
    Language !== defaultFilterProps.Language && Type.name !== 'Patents'
      ? `"hl":"${extractValueInParentheses(Language)}"`
      : ``
  const location =
    Location !== defaultFilterProps.Location &&
    Type.name !== 'Maps' &&
    Type.name !== 'Patents'
      ? `"location":"${extractValueInParentheses(Location)}"`
      : ``
  const page = Page !== defaultFilterProps.Page ? `"page":${Page}` : ``
  const query = Query !== '' ? `"q":"${Query}"` : ''
  const results =
    Results !== defaultFilterProps.Results &&
    Type.name !== 'Places' &&
    Type.name !== 'Scholar' &&
    Type.name !== 'Maps' &&
    Type.name !== 'Autocomplete'
      ? `"num":${Results}`
      : ``
  const type = Type.name.toLowerCase()
  const gPSPosition =
    GPSPosition !== '' && Type.name === 'Maps' ? `"ll":"${GPSPosition}"` : ``
  const placeID =
    PlaceID !== '' && Type.name === 'Maps' ? `"placeId":"${PlaceID}"` : ``
  const cID = CID !== '' && Type.name === 'Maps' ? `"cid":"${CID}"` : ``
  //   const method = Method ? `"autocorrect":false` : ``
  //   const codingLanguage = CodingLanguage ? `"autocorrect":false` : ``

  const dfPayload: string[] = [
    query,
    location,
    country,
    language,
    gPSPosition,
    placeID,
    cID,
    results,
    autocorrect,
    dateRange,
    page,
  ].filter((item) => item !== '')

  const ggPayload: string[] = [
    `"q":"google inc"`,
    location,
    country,
    language,
    gPSPosition,
    placeID,
    cID,
    results,
    autocorrect,
    dateRange,
    page,
  ].filter((item) => item !== '')

  const tlPayload: string[] = [
    `"q":"tesla inc"`,
    location,
    country,
    language,
    gPSPosition,
    placeID,
    cID,
    results,
    autocorrect,
    dateRange,
    page,
  ].filter((item) => item !== '')

  const payload =
    Type.name === 'Webpage'
      ? `{"url":"${URL}"}`
      : MiniBatch
        ? `[{${dfPayload.join(',')}},{${ggPayload.join(',')}},{${tlPayload.join(
            ',',
          )}}]`
        : `{${dfPayload.join(',')}}`

  const curlCommand = `curl --location --request POST ${
    Type.name === 'Webpage'
      ? `'https://scrape.serper.dev'`
      : `'https://google.serper.dev/${type}'`
  } \\
  --header 'X-API-KEY: ${apiKey}' \\
  --header 'Content-Type: application/json' \\
  --data-raw '${payload}'`

  //   const C = curlconverter.toC(curlCommand)

  return curlCommand
}

interface ConvertedCode {
  python: string
  csharp: string
  java: string
  node: string
  go: string
  rust: string
}

// export function convertCurl(curlCommand: string): ConvertedCode {
//   const converter = curlconverter
//   return {
//     python: converter.toPython(curlCommand),
//     csharp: converter.toCSharp(curlCommand),
//     java: converter.toJava(curlCommand),
//     node: converter.toNode(curlCommand),
//     go: converter.toGo(curlCommand),
//     rust: converter.toRust(curlCommand),
//   }
// }

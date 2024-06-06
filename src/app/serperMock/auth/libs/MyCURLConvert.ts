import { FormFilterProps } from '../../interfaces'
import { defaultFilterProps } from '../../zustand/store'
import curlconverter from 'curlconverter'

export const convertToCurl = (data: FormFilterProps) => {
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
  } = data

  const apiKey = '2aa1f782fa840f29ef0629249d621449d7235651'
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

  const autocorrect = Autocorrect ? `` : `"autocorrect":false`
  const country =
    Country !== defaultFilterProps.Country
      ? `"gl":"${extractValueInParentheses(Country)}"`
      : ``
  const dateRange =
    DateRange !== defaultFilterProps.DateRange
      ? `"tbs":"qdr:${dateRangeMapper[DateRange]}"`
      : ``
  const language =
    Language !== defaultFilterProps.Language
      ? `"hl":"${extractValueInParentheses(Language)}"`
      : ``
  const location =
    Location !== defaultFilterProps.Location
      ? `"location":"${extractValueInParentheses(Location)}"`
      : ``
  const page = Page !== defaultFilterProps.Page ? `"page":${Page}` : ``
  const query = Query !== '' ? `"q":"${Query}"` : ''
  const results =
    Results !== defaultFilterProps.Results ? `"num":${Results}` : ``
  const type = Type.name.toLowerCase()
  //   const method = Method ? `"autocorrect":false` : ``
  //   const codingLanguage = CodingLanguage ? `"autocorrect":false` : ``

  const dfPayload: string[] = [
    query,
    location,
    country,
    language,
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
    results,
    autocorrect,
    dateRange,
    page,
  ].filter((item) => item !== '')

  const payload = MiniBatch
    ? `[{${dfPayload.join(',')}},{${ggPayload.join(',')}},{${tlPayload.join(
        ',',
      )}}]`
    : `{${dfPayload.join(',')}}`

  const curlCommand = `curl --location --request POST 'https://google.serper.dev/${type}' \\
  --header 'X-API-KEY: ${apiKey}' \\
  --header 'Content-Type: application/json' \\
  --data-raw '${payload}'`

  //   const C = curlconverter.toC(curlCommand)

  return curlCommand
}

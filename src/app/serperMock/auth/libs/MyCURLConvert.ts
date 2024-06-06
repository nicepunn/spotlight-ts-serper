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
    'Past hour': 'qdr:h',
    'Past 24 hours': 'qdr:d',
    'Past week': 'qdr:w',
    'Past month': 'qdr:m',
    'Past year': 'qdr:y',
  }

  const autocorrect = Autocorrect ? `` : `"autocorrect":false`
  const country =
    Country !== defaultFilterProps.Country ? `"gl":"${Country}"` : ``
  const dateRange =
    DateRange !== defaultFilterProps.DateRange
      ? `"tbs":"qdr:${dateRangeMapper[DateRange]}"`
      : ``
  const language =
    Language !== defaultFilterProps.Language ? `"hl":"${Language}"` : ``
  const location =
    Location !== defaultFilterProps.Location ? `"location":"${Location}"` : ``
  const page = Page !== defaultFilterProps.Page ? `"page":${Page}` : ``
  const query = Query !== '' ? `"q":"${Query}"` : ''
  const results =
    Results !== defaultFilterProps.Results ? `"num":${Results}` : ``
  const type = Type.name.toLowerCase()
  const miniBatch = MiniBatch ? `"autocorrect":false` : ``
  //   const method = Method ? `"autocorrect":false` : ``
  //   const codingLanguage = CodingLanguage ? `"autocorrect":false` : ``

  const rawPayload: string[] = [
    query,
    location,
    country,
    language,
    results,
    autocorrect,
    dateRange,
    page,
  ]

  const payload = rawPayload.filter((item) => item !== '')

  const curlCommand = `curl --location --request POST 'https://google.serper.dev/${type}' \\
  --header 'X-API-KEY: ${apiKey}' \\
  --header 'Content-Type: application/json' \\
  --data-raw '{${payload.join(',')}}'`

  //   const C = curlconverter.toC(curlCommand)

  return curlCommand
}

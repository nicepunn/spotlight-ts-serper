import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FormFilterProps } from '../interfaces'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export const defaultFilterProps: FormFilterProps = {
  Type: {
    id: 1,
    name: 'Search',
    icon: MagnifyingGlassIcon,
  },
  Query: '',
  Country: 'United States (us)',
  Location: 'None',
  Language: 'English (en)',
  DateRange: 'Anytime',
  Autocorrect: true,
  Results: '10',
  Page: 1,
  MiniBatch: false,
  CodingLanguage: 'cURL',
  Method: 'cURL',
  CID: '',
  GPSPosition: '',
  PlaceID: '',
  URL: '',
}

interface FilterState {
  filterProps: FormFilterProps
  setFilterProps: (props: FormFilterProps) => void
}

interface ApiKey {
  apiKey: string
  setApiKey: (props: string) => void
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      filterProps: defaultFilterProps,
      setFilterProps: (props) => set({ filterProps: props }),
    }),
    {
      name: 'filter-props', // name of the item in storage
    },
  ),
)

export const useApiKeyStore = create<ApiKey>()(
  persist(
    (set) => ({
      apiKey: '2aa1f782fa840f29ef0629249d621449d7235651',
      setApiKey: (props) => set({ apiKey: props }),
    }),
    {
      name: 'filter-props', // name of the item in storage
    },
  ),
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FormFilterProps } from '../interfaces'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const defaultFilterProps: FormFilterProps = {
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
  Results: '20',
  Page: 1,
  MiniBatch: false,
  CodingLanguage: 'C#',
  Method: { id: 1, name: 'cURL', aka: 'cURL' },
}

interface MyState {
  filterProps: FormFilterProps
  setFilterProps: (props: FormFilterProps) => void
}

const useStore = create<MyState>()(
  persist(
    (set) => ({
      filterProps: defaultFilterProps,
      setFilterProps: (props) => set({ filterProps: props }),
    }),
    {
      name: 'filter-props', // name of the item in storage
      getStorage: () => localStorage, // (optional) by default localStorage is used
    },
  ),
)

export default useStore
'use client'
/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/Button'
import { Fragment, useState } from 'react'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
  Transition,
} from '@headlessui/react'
import {
  AcademicCapIcon,
  CheckIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MapPinIcon,
  NewspaperIcon,
  PencilIcon,
  PhotoIcon,
  ShoppingBagIcon,
  VideoCameraIcon,
} from '@heroicons/react/20/solid'
interface FilterProps {
  Type:
    | 'Search'
    | 'Images'
    | 'Videos'
    | 'Places'
    | 'Maps'
    | 'News'
    | 'Shopping'
    | 'Scholar'
    | 'Patents'
    | 'Autocomplete'
    | 'Webpage'
  Query: string
  Country: string
  Location: string | null
  Language: string
  DateRange:
    | 'Any time'
    | 'Past hour'
    | 'Past 24 hours'
    | 'Past week'
    | 'Past month'
    | 'Past year'
  Autocorrect: boolean
  Results: 10 | 20 | 30 | 40 | 50 | 100
  Page: number
  MiniBatch: boolean
  CodingLanguage:
    | 'C#'
    | 'cURL'
    | 'Dart'
    | 'Go'
    | 'HTTP'
    | 'Java'
    | 'JavaScript'
    | 'C'
    | 'NodeJs'
    | 'Objective-C'
    | 'OCaml'
    | 'PHP'
    | 'PowerShell'
    | 'Python'
    | 'R'
    | 'Ruby'
    | 'Shell'
    | 'Swift'
  Method: string
}

export default function Playground() {
  return (
    <div className="flex w-full flex-col">
      <div className="text-2xl font-semibold lg:text-3xl dark:text-zinc-100">
        Playground
      </div>
      <div className="flex w-full flex-col gap-x-10 lg:flex-row">
        <InputCard />
        <OutputCard />
      </div>
    </div>
  )
}

function InputCard() {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="mt-12 flex h-fit w-full flex-col rounded-lg bg-zinc-100 px-6 py-5 shadow lg:mt-10 lg:w-[40vw] lg:min-w-[310px] dark:bg-zinc-900">
      <form className="flex w-full flex-col gap-y-[23px]">
        <div className="flex w-full flex-col">
          <label
            htmlFor="Type"
            className="block text-sm font-semibold leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Type
          </label>
          <div className="mt-1 flex w-full flex-row gap-x-2">
            <TypeSelector />
            <Button
              type="submit"
              variant="primary"
              className="h-10 w-fit flex-none px-4"
            >
              Search
            </Button>
          </div>
        </div>
        <div>
          <label
            htmlFor="Query"
            className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Query
          </label>
          <div className="mt-1">
            <input
              id="Query"
              name="Query"
              type="text"
              required
              className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-zinc-100 px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="Country"
            className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Country
          </label>
          <div className="mt-1">
            <TextSelector list={countryList} />
          </div>
        </div>
        <div>
          <label
            htmlFor="Location"
            className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Location
          </label>
          <div className="mt-1">
            <TextSelector list={locationList} />
          </div>
        </div>
        <div>
          <label
            htmlFor="Language"
            className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Language
          </label>
          <div className="mt-1">
            <TextSelector list={languageList} />
          </div>
        </div>
        <div className="flex w-full flex-row items-center gap-x-4">
          <div className="w-full">
            <label
              htmlFor="DateRange"
              className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
            >
              Date range
            </label>
            <div className="mt-1">
              <TextSelector list={dateRangeList} />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="Autocorrect"
              className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
            >
              Autocorrect
            </label>
            <div className="mt-1">
              <input
                id="Autocorrect"
                name="Autocorrect"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-zinc-800 accent-zinc-800 focus:ring-zinc-800 dark:text-zinc-100 dark:accent-zinc-100 dark:focus:ring-zinc-100"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center gap-x-4">
          <div className="w-full">
            <label
              htmlFor="Result"
              className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
            >
              Result
            </label>
            <div className="mt-1">
              <TextSelector list={resultList} />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="Page"
              className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
            >
              Page
            </label>
            <div className="mt-1">
              <input
                id="Page"
                name="Page"
                type="text"
                required
                className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-zinc-100 px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="MiniBatch"
            className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Mini-batch (up to 100 queries)
          </label>
          <div className="mt-1">
            <MySwitch enabled={enabled} setEnabled={setEnabled} />
          </div>
        </div>
      </form>
    </div>
  )
}

function OutputCard() {
  return (
    <div className="mt-2 flex h-[800px] w-full flex-col items-center justify-center rounded-lg bg-zinc-100 shadow dark:bg-zinc-900">
      output raw
    </div>
  )
}

function MySwitch(props: {
  enabled: boolean
  setEnabled: Dispatch<SetStateAction<boolean>>
}) {
  const { enabled, setEnabled } = props
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? 'bg-zinc-700' : 'bg-zinc-200',
        'relative mt-1 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-1',
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-zinc-100 shadow ring-0 transition duration-200 ease-in-out',
        )}
      />
    </Switch>
  )
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function TypeSelector() {
  const [selected, setSelected] = useState(typeList[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative w-full">
            <ListboxButton className="relative h-10 w-full cursor-default rounded-md bg-zinc-50 py-1.5 pl-3 pr-10 text-left text-base font-normal text-zinc-900 shadow-sm outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none disabled:cursor-not-allowed disabled:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 disabled:dark:text-zinc-400">
              <span className="flex items-center">
                <selected.icon
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                />
                <span className="ml-3 block truncate">
                  {selected.id === 0 ? 'Optional' : selected.name}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-zinc-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="no-scrollbar absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-zinc-100 ring-opacity-5 focus:outline-none sm:text-sm">
                {typeList.map((item) => (
                  <ListboxOption
                    key={item.id}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-zinc-700 text-zinc-300' : '',
                        !focus ? 'text-zinc-400' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <div className="flex items-center">
                          <item.icon
                            className="h-5 w-5 shrink-0"
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            )}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? 'text-zinc-900' : 'text-zinc-900',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

function TextSelector(props: { list: any[] }) {
  const [selected, setSelected] = useState((props.list ?? [])[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative w-full">
            <ListboxButton
              className={classNames(
                'relative h-10 w-full cursor-default rounded-md bg-zinc-50 py-1.5 pl-3 pr-10 text-left text-base font-normal shadow-sm outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:transition-none disabled:cursor-not-allowed disabled:text-zinc-600 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 dark:active:bg-zinc-800/50 disabled:dark:text-zinc-400',
                selected.id === 0
                  ? 'text-zinc-300 active:text-zinc-600/40 dark:text-zinc-600'
                  : 'text-zinc-900 active:text-zinc-900/80 dark:text-zinc-100 dark:hover:text-zinc-50 dark:active:text-zinc-50/70',
              )}
            >
              <span className="flex items-center">
                {selected.id === 0 ? 'Optional' : selected.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon
                  className={classNames(
                    'h-5 w-5 text-zinc-400',
                    selected.id === 0
                      ? 'dark:text-zinc-100'
                      : 'dark:text-zinc-100',
                  )}
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="no-scrollbar absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-zinc-100 ring-opacity-5 focus:outline-none sm:text-sm">
                {props.list.map((item: any) => (
                  <ListboxOption
                    key={item.id}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-zinc-700 text-zinc-300' : '',
                        !focus ? 'text-zinc-400' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            )}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? 'text-zinc-900' : 'text-zinc-900',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

const typeList = [
  {
    id: 1,
    name: 'Search',
    icon: MagnifyingGlassIcon,
  },
  {
    id: 2,
    name: 'Images',
    icon: PhotoIcon,
  },
  {
    id: 3,
    name: 'Videos',
    icon: VideoCameraIcon,
  },
  {
    id: 4,
    name: 'Places',
    icon: MapPinIcon,
  },
  {
    id: 5,
    name: 'Maps',
    icon: MapIcon,
  },
  {
    id: 6,
    name: 'News',
    icon: NewspaperIcon,
  },
  {
    id: 7,
    name: 'Shopping',
    icon: ShoppingBagIcon,
  },
  {
    id: 8,
    name: 'Scholar',
    icon: AcademicCapIcon,
  },
  {
    id: 9,
    name: 'Patents',
    icon: DocumentTextIcon,
  },
  {
    id: 10,
    name: 'Autocomplete',
    icon: PencilIcon,
  },
  {
    id: 11,
    name: 'Webpage',
    icon: GlobeAltIcon,
  },
]

const countryList = [
  { id: 95, name: 'United States (us)', aka: 'US' },
  { id: 1, name: 'Afghanistan (af)', aka: 'AF' },
  { id: 2, name: 'Albania (al)', aka: 'AL' },
  { id: 3, name: 'Algeria (dz)', aka: 'DZ' },
  { id: 4, name: 'Andorra (ad)', aka: 'AD' },
  { id: 5, name: 'Angola (ao)', aka: 'AO' },
  { id: 6, name: 'Antigua and Barbuda (ag)', aka: 'AG' },
  { id: 7, name: 'Argentina (ar)', aka: 'AR' },
  { id: 8, name: 'Armenia (am)', aka: 'AM' },
  { id: 9, name: 'Australia (au)', aka: 'AU' },
  { id: 10, name: 'Austria (at)', aka: 'AT' },
  { id: 11, name: 'Azerbaijan (az)', aka: 'AZ' },
  { id: 12, name: 'Bahamas (bs)', aka: 'BS' },
  { id: 13, name: 'Bahrain (bh)', aka: 'BH' },
  { id: 14, name: 'Bangladesh (bd)', aka: 'BD' },
  { id: 15, name: 'Barbados (bb)', aka: 'BB' },
  { id: 16, name: 'Belarus (by)', aka: 'BY' },
  { id: 17, name: 'Belgium (be)', aka: 'BE' },
  { id: 18, name: 'Belize (bz)', aka: 'BZ' },
  { id: 19, name: 'Benin (bj)', aka: 'BJ' },
  { id: 20, name: 'Bhutan (bt)', aka: 'BT' },
  { id: 21, name: 'Bolivia (bo)', aka: 'BO' },
  { id: 22, name: 'Bosnia and Herzegovina (ba)', aka: 'BA' },
  { id: 23, name: 'Botswana (bw)', aka: 'BW' },
  { id: 24, name: 'Brazil (br)', aka: 'BR' },
  { id: 25, name: 'Brunei (bn)', aka: 'BN' },
  { id: 26, name: 'Bulgaria (bg)', aka: 'BG' },
  { id: 27, name: 'Burkina Faso (bf)', aka: 'BF' },
  { id: 28, name: 'Burundi (bi)', aka: 'BI' },
  { id: 29, name: 'Cabo Verde (cv)', aka: 'CV' },
  { id: 30, name: 'Cambodia (kh)', aka: 'KH' },
  { id: 31, name: 'Cameroon (cm)', aka: 'CM' },
  { id: 32, name: 'Canada (ca)', aka: 'CA' },
  { id: 33, name: 'Central African Republic (cf)', aka: 'CF' },
  { id: 34, name: 'Chad (td)', aka: 'TD' },
  { id: 35, name: 'Chile (cl)', aka: 'CL' },
  { id: 36, name: 'China (cn)', aka: 'CN' },
  { id: 37, name: 'Colombia (co)', aka: 'CO' },
  { id: 38, name: 'Comoros (km)', aka: 'KM' },
  { id: 39, name: 'Congo (cg)', aka: 'CG' },
  { id: 40, name: 'Congo, Democratic Republic of the (cd)', aka: 'CD' },
  { id: 41, name: 'Costa Rica (cr)', aka: 'CR' },
  { id: 42, name: 'Croatia (hr)', aka: 'HR' },
  { id: 43, name: 'Cuba (cu)', aka: 'CU' },
  { id: 44, name: 'Cyprus (cy)', aka: 'CY' },
  { id: 45, name: 'Czechia (cz)', aka: 'CZ' },
  { id: 46, name: 'Denmark (dk)', aka: 'DK' },
  { id: 47, name: 'Djibouti (dj)', aka: 'DJ' },
  { id: 48, name: 'Dominica (dm)', aka: 'DM' },
  { id: 49, name: 'Dominican Republic (do)', aka: 'DO' },
  { id: 50, name: 'Ecuador (ec)', aka: 'EC' },
  { id: 51, name: 'Egypt (eg)', aka: 'EG' },
  { id: 52, name: 'El Salvador (sv)', aka: 'SV' },
  { id: 53, name: 'Equatorial Guinea (gq)', aka: 'GQ' },
  { id: 54, name: 'Eritrea (er)', aka: 'ER' },
  { id: 55, name: 'Estonia (ee)', aka: 'EE' },
  { id: 56, name: 'Eswatini (sz)', aka: 'SZ' },
  { id: 57, name: 'Ethiopia (et)', aka: 'ET' },
  { id: 58, name: 'Fiji (fj)', aka: 'FJ' },
  { id: 59, name: 'Finland (fi)', aka: 'FI' },
  { id: 60, name: 'France (fr)', aka: 'FR' },
  { id: 61, name: 'Gabon (ga)', aka: 'GA' },
  { id: 62, name: 'Gambia (gm)', aka: 'GM' },
  { id: 63, name: 'Georgia (ge)', aka: 'GE' },
  { id: 64, name: 'Germany (de)', aka: 'DE' },
  { id: 65, name: 'Ghana (gh)', aka: 'GH' },
  { id: 66, name: 'Greece (gr)', aka: 'GR' },
  { id: 67, name: 'Grenada (gd)', aka: 'GD' },
  { id: 68, name: 'Guatemala (gt)', aka: 'GT' },
  { id: 69, name: 'Guinea (gn)', aka: 'GN' },
  { id: 70, name: 'Guinea-Bissau (gw)', aka: 'GW' },
  { id: 71, name: 'Guyana (gy)', aka: 'GY' },
  { id: 72, name: 'Haiti (ht)', aka: 'HT' },
  { id: 73, name: 'Honduras (hn)', aka: 'HN' },
  { id: 74, name: 'Hungary (hu)', aka: 'HU' },
  { id: 75, name: 'Iceland (is)', aka: 'IS' },
  { id: 76, name: 'India (in)', aka: 'IN' },
  { id: 77, name: 'Indonesia (id)', aka: 'ID' },
  { id: 78, name: 'Iran (ir)', aka: 'IR' },
  { id: 79, name: 'Iraq (iq)', aka: 'IQ' },
  { id: 80, name: 'Ireland (ie)', aka: 'IE' },
  { id: 81, name: 'Israel (il)', aka: 'IL' },
  { id: 82, name: 'Italy (it)', aka: 'IT' },
  { id: 83, name: 'Jamaica (jm)', aka: 'JM' },
  { id: 84, name: 'Japan (jp)', aka: 'JP' },
  { id: 85, name: 'Jordan (jo)', aka: 'JO' },
  { id: 86, name: 'Kazakhstan (kz)', aka: 'KZ' },
  { id: 87, name: 'Kenya (ke)', aka: 'KE' },
  { id: 88, name: 'Kiribati (ki)', aka: 'KI' },
  { id: 89, name: 'Kuwait (kw)', aka: 'KW' },
  { id: 90, name: 'Kyrgyzstan (kg)', aka: 'KG' },
  { id: 91, name: 'Laos (la)', aka: 'LA' },
  { id: 92, name: 'Latvia (lv)', aka: 'LV' },
  { id: 93, name: 'Lebanon (lb)', aka: 'LB' },
  { id: 94, name: 'Lesotho (ls)', aka: 'LS' },
]

const locationList = [
  {
    id: 0,
    name: 'None',
    aka: '',
  },
  {
    id: 1,
    name: 'Thailand (th)',
    aka: 'TH',
  },
  {
    id: 95,
    name: 'United States (us)',
    aka: 'US',
  },
]

const languageList = [
  { id: 95, name: 'English (en)', aka: 'EN' },
  { id: 1, name: 'Afghanistan (af)', aka: 'AF' },
  { id: 2, name: 'Albania (al)', aka: 'AL' },
  { id: 3, name: 'Algeria (dz)', aka: 'DZ' },
  { id: 4, name: 'Andorra (ad)', aka: 'AD' },
  { id: 5, name: 'Angola (ao)', aka: 'AO' },
  { id: 6, name: 'Antigua and Barbuda (ag)', aka: 'AG' },
  { id: 7, name: 'Argentina (ar)', aka: 'AR' },
  { id: 8, name: 'Armenia (am)', aka: 'AM' },
  { id: 9, name: 'Australia (au)', aka: 'AU' },
  { id: 10, name: 'Austria (at)', aka: 'AT' },
  { id: 11, name: 'Azerbaijan (az)', aka: 'AZ' },
  { id: 12, name: 'Bahamas (bs)', aka: 'BS' },
  { id: 13, name: 'Bahrain (bh)', aka: 'BH' },
  { id: 14, name: 'Bangladesh (bd)', aka: 'BD' },
  { id: 15, name: 'Barbados (bb)', aka: 'BB' },
  { id: 16, name: 'Belarus (by)', aka: 'BY' },
  { id: 17, name: 'Belgium (be)', aka: 'BE' },
  { id: 18, name: 'Belize (bz)', aka: 'BZ' },
  { id: 19, name: 'Benin (bj)', aka: 'BJ' },
  { id: 20, name: 'Bhutan (bt)', aka: 'BT' },
  { id: 21, name: 'Bolivia (bo)', aka: 'BO' },
  { id: 22, name: 'Bosnia and Herzegovina (ba)', aka: 'BA' },
  { id: 23, name: 'Botswana (bw)', aka: 'BW' },
  { id: 24, name: 'Brazil (br)', aka: 'BR' },
  { id: 25, name: 'Brunei (bn)', aka: 'BN' },
  { id: 26, name: 'Bulgaria (bg)', aka: 'BG' },
  { id: 27, name: 'Burkina Faso (bf)', aka: 'BF' },
  { id: 28, name: 'Burundi (bi)', aka: 'BI' },
  { id: 29, name: 'Cabo Verde (cv)', aka: 'CV' },
  { id: 30, name: 'Cambodia (kh)', aka: 'KH' },
  { id: 31, name: 'Cameroon (cm)', aka: 'CM' },
  { id: 32, name: 'Canada (ca)', aka: 'CA' },
  { id: 33, name: 'Central African Republic (cf)', aka: 'CF' },
  { id: 34, name: 'Chad (td)', aka: 'TD' },
  { id: 35, name: 'Chile (cl)', aka: 'CL' },
  { id: 36, name: 'China (cn)', aka: 'CN' },
  { id: 37, name: 'Colombia (co)', aka: 'CO' },
  { id: 38, name: 'Comoros (km)', aka: 'KM' },
  { id: 39, name: 'Congo (cg)', aka: 'CG' },
  { id: 40, name: 'Congo, Democratic Republic of the (cd)', aka: 'CD' },
  { id: 41, name: 'Costa Rica (cr)', aka: 'CR' },
  { id: 42, name: 'Croatia (hr)', aka: 'HR' },
  { id: 43, name: 'Cuba (cu)', aka: 'CU' },
  { id: 44, name: 'Cyprus (cy)', aka: 'CY' },
  { id: 45, name: 'Czechia (cz)', aka: 'CZ' },
  { id: 46, name: 'Denmark (dk)', aka: 'DK' },
  { id: 47, name: 'Djibouti (dj)', aka: 'DJ' },
  { id: 48, name: 'Dominica (dm)', aka: 'DM' },
  { id: 49, name: 'Dominican Republic (do)', aka: 'DO' },
  { id: 50, name: 'Ecuador (ec)', aka: 'EC' },
  { id: 51, name: 'Egypt (eg)', aka: 'EG' },
  { id: 52, name: 'El Salvador (sv)', aka: 'SV' },
  { id: 53, name: 'Equatorial Guinea (gq)', aka: 'GQ' },
  { id: 54, name: 'Eritrea (er)', aka: 'ER' },
  { id: 55, name: 'Estonia (ee)', aka: 'EE' },
  { id: 56, name: 'Eswatini (sz)', aka: 'SZ' },
  { id: 57, name: 'Ethiopia (et)', aka: 'ET' },
  { id: 58, name: 'Fiji (fj)', aka: 'FJ' },
  { id: 59, name: 'Finland (fi)', aka: 'FI' },
  { id: 60, name: 'France (fr)', aka: 'FR' },
  { id: 61, name: 'Gabon (ga)', aka: 'GA' },
  { id: 62, name: 'Gambia (gm)', aka: 'GM' },
  { id: 63, name: 'Georgia (ge)', aka: 'GE' },
  { id: 64, name: 'Germany (de)', aka: 'DE' },
  { id: 65, name: 'Ghana (gh)', aka: 'GH' },
  { id: 66, name: 'Greece (gr)', aka: 'GR' },
  { id: 67, name: 'Grenada (gd)', aka: 'GD' },
  { id: 68, name: 'Guatemala (gt)', aka: 'GT' },
  { id: 69, name: 'Guinea (gn)', aka: 'GN' },
  { id: 70, name: 'Guinea-Bissau (gw)', aka: 'GW' },
  { id: 71, name: 'Guyana (gy)', aka: 'GY' },
  { id: 72, name: 'Haiti (ht)', aka: 'HT' },
  { id: 73, name: 'Honduras (hn)', aka: 'HN' },
  { id: 74, name: 'Hungary (hu)', aka: 'HU' },
  { id: 75, name: 'Iceland (is)', aka: 'IS' },
  { id: 76, name: 'India (in)', aka: 'IN' },
  { id: 77, name: 'Indonesia (id)', aka: 'ID' },
  { id: 78, name: 'Iran (ir)', aka: 'IR' },
  { id: 79, name: 'Iraq (iq)', aka: 'IQ' },
  { id: 80, name: 'Ireland (ie)', aka: 'IE' },
  { id: 81, name: 'Israel (il)', aka: 'IL' },
  { id: 82, name: 'Italy (it)', aka: 'IT' },
  { id: 83, name: 'Jamaica (jm)', aka: 'JM' },
  { id: 84, name: 'Japan (jp)', aka: 'JP' },
  { id: 85, name: 'Jordan (jo)', aka: 'JO' },
  { id: 86, name: 'Kazakhstan (kz)', aka: 'KZ' },
  { id: 87, name: 'Kenya (ke)', aka: 'KE' },
  { id: 88, name: 'Kiribati (ki)', aka: 'KI' },
  { id: 89, name: 'Kuwait (kw)', aka: 'KW' },
  { id: 90, name: 'Kyrgyzstan (kg)', aka: 'KG' },
  { id: 91, name: 'Laos (la)', aka: 'LA' },
  { id: 92, name: 'Latvia (lv)', aka: 'LV' },
  { id: 93, name: 'Lebanon (lb)', aka: 'LB' },
  { id: 94, name: 'Lesotho (ls)', aka: 'LS' },
]

const dateRangeList = [
  { id: 1, name: 'Anytime', aka: '' },
  { id: 2, name: 'Past hour', aka: '' },
  { id: 3, name: 'Past 24 hours', aka: '' },
  { id: 4, name: 'Past week', aka: '' },
  { id: 5, name: 'Past month', aka: '' },
  { id: 6, name: 'Past year', aka: '' },
]

const resultList = [
  { id: 1, name: 10, aka: '' },
  { id: 2, name: 20, aka: '' },
  { id: 3, name: 30, aka: '' },
  { id: 4, name: 40, aka: '' },
  { id: 5, name: 50, aka: '' },
  { id: 6, name: 100, aka: '' },
]

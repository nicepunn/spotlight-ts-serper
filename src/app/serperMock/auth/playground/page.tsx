/* eslint-disable react-hooks/exhaustive-deps */
'use client'
/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/Button'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
  Transition,
} from '@headlessui/react'
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  MapIcon,
  MapPinIcon,
  NewspaperIcon,
  PencilIcon,
  PhotoIcon,
  ShoppingBagIcon,
  VideoCameraIcon,
} from '@heroicons/react/20/solid'
import {
  CodingLanguage,
  DateRange,
  FilterPropsSchema,
  FormFilterProps,
  LanguageState,
  ListItem,
  Result,
  TypeItem,
} from '../../interfaces'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useApiKeyStore,
  useFilterStore,
  useResultStore,
} from '../../zustand/store'
import { convertToCurl } from '../libs/MyCURLConvert'
import { fetchFromCurl } from '../libs/MyResultConverter'
import { init } from 'next/dist/compiled/webpack/webpack'

export default function Playground() {
  const filterProp = useFilterStore((state) => state.filterProps)
  const setFilterProp = useFilterStore((state) => state.setFilterProps)

  const defaultValues: FormFilterProps = useMemo(() => filterProp, [filterProp])
  const [tempFilterProp, setTempFilterProp] =
    useState<FormFilterProps>(defaultValues)

  // useEffect(() => {
  //   console.log(tempFilterProp)
  // }, [tempFilterProp])

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormFilterProps>({
    resolver: zodResolver(FilterPropsSchema),
    defaultValues,
  })

  useEffect(() => {
    reset(filterProp)
  }, [filterProp, reset])

  const formValues = watch()

  useEffect(() => {
    const timer = setTimeout(() => {
      setTempFilterProp(formValues)
    }, 20)
    return () => clearTimeout(timer)
  }, [watch, formValues])

  const onSubmit = (data: FormFilterProps) => {
    // console.log(data)
    setFilterProp(data)
  }

  const [initLoading, setInitLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitLoading(false)
    }, 30)
    return () => clearTimeout(timer)
  }, [])
  if (initLoading) {
    return <></>
  }

  return (
    <div className="flex w-full flex-col">
      <div className="text-2xl font-semibold lg:text-3xl dark:text-zinc-100">
        Playground
      </div>
      <div className="flex w-full flex-col gap-x-10 lg:flex-row">
        <InputCard
          tempFilterprop={tempFilterProp}
          control={control}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
        />
        <OutputCard
          filterProp={filterProp}
          tempFilterProp={tempFilterProp}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

function InputCard(props: {
  tempFilterprop: FormFilterProps
  register: any
  handleSubmit: any
  control: any
  errors: any
  onSubmit: any
}) {
  const { control, handleSubmit, register, errors, onSubmit, tempFilterprop } =
    props

  return (
    <div className="mt-12 flex h-fit w-full flex-col rounded-lg bg-zinc-100 p-4 shadow md:px-6 md:py-5 lg:mt-10 lg:w-[40vw] lg:min-w-[310px] dark:bg-zinc-900">
      <form
        className="flex w-full flex-col gap-y-[23px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col">
          <label
            htmlFor="Type"
            className="block text-sm font-semibold leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Type
          </label>
          <div className="mt-1 flex w-full flex-row gap-x-2">
            <TypeSelector control={control} />
            <Button
              type="submit"
              variant="primary"
              className="h-10 w-fit flex-none px-4"
            >
              {tempFilterprop.Type.name === 'Webpage' ? 'Scrape' : 'Search'}
            </Button>
          </div>
          {tempFilterprop.Type.name !== 'Webpage' ? (
            <></>
          ) : (
            <div className="mt-4 flex w-full flex-row gap-x-3 rounded-lg bg-zinc-200 p-3 dark:bg-zinc-700">
              <div className="flex flex-col justify-center">
                <InformationCircleIcon className="h-6 w-6" area-hidden="true" />
              </div>
              <div className="text-sm font-normal leading-[21px] text-zinc-950 dark:text-zinc-50">
                This feature is in beta and subject to change. If you plan to
                use it in production, please contact us.
              </div>
            </div>
          )}
        </div>

        {tempFilterprop.Type.name === 'Webpage' ? (
          <div>
            <label
              htmlFor="URL"
              className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
            >
              URL
            </label>
            <div className="mt-1">
              <input
                {...register('URL')}
                id="URL"
                name="URL"
                type="text"
                placeholder="Paste a URL to scrape"
                required
                className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-zinc-100 px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-base placeholder:font-normal placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-y-[23px]">
            <div>
              <label
                htmlFor="Query"
                className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
              >
                Query
              </label>
              <div className="mt-1">
                <input
                  {...register('Query')}
                  id="Query"
                  name="Query"
                  type="text"
                  required
                  className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-zinc-100 px-3 py-[calc(theme(spacing.2)-1px)] text-left text-base font-normal shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                />
              </div>
            </div>

            {tempFilterprop.Type.name === 'Maps' ? (
              <div>
                <label
                  htmlFor="GPSPosition"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  GPS position & zoom level
                </label>
                <div className="mt-1">
                  <input
                    {...register('GPSPosition')}
                    id="GPSPosition"
                    name="GPSPosition"
                    type="text"
                    placeholder="@latitude, longtitude, zoom"
                    required
                    className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-zinc-100 px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-base placeholder:font-normal placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            {tempFilterprop.Type.name === 'Maps' ? (
              <div>
                <label
                  htmlFor="PlaceID"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  Place ID
                </label>
                <div className="mt-1">
                  <input
                    {...register('PlaceID')}
                    id="PlaceID"
                    name="PlaceID"
                    type="text"
                    placeholder="Optional"
                    className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-zinc-100 px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-base placeholder:font-normal placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {tempFilterprop.Type.name === 'Maps' ? (
              <div>
                <label
                  htmlFor="CID"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  CID
                </label>
                <div className="mt-1">
                  <input
                    {...register('CID')}
                    id="CID"
                    name="CID"
                    type="text"
                    placeholder="Optional"
                    className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-zinc-100 px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-base placeholder:font-normal placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {tempFilterprop.Type.name === 'Patents' ||
            tempFilterprop.Type.name === 'Maps' ? (
              <></>
            ) : (
              <div>
                <label
                  htmlFor="Country"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  Country
                </label>
                <div className="mt-1">
                  <LongTextSelector
                    control={control}
                    label="Country"
                    list={countryList}
                  />
                </div>
              </div>
            )}
            {tempFilterprop.Type.name === 'Patents' ||
            tempFilterprop.Type.name === 'Maps' ? (
              <></>
            ) : (
              <div>
                <label
                  htmlFor="Location"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  Location
                </label>
                <div className="mt-1">
                  <LongTextSelector
                    control={control}
                    label="Location"
                    list={locationList}
                  />
                </div>
              </div>
            )}

            {tempFilterprop.Type.name === 'Patents' ? (
              <></>
            ) : (
              <div>
                <label
                  htmlFor="Language"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  Language
                </label>
                <div className="mt-1">
                  <LongTextSelector
                    control={control}
                    label="Language"
                    list={languageList}
                  />
                </div>
              </div>
            )}

            {tempFilterprop.Type.name === 'Maps' ||
            tempFilterprop.Type.name === 'Patents' ? (
              <></>
            ) : (
              <div className="flex w-full flex-row items-center gap-x-4">
                {tempFilterprop.Type.name === 'Places' ||
                tempFilterprop.Type.name === 'Shopping' ||
                tempFilterprop.Type.name === 'Scholar' ||
                tempFilterprop.Type.name === 'Autocomplete' ? (
                  <></>
                ) : (
                  <div className="w-full">
                    <label
                      htmlFor="DateRange"
                      className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                    >
                      Date range
                    </label>
                    <div className="mt-1">
                      <ShortTextSelector
                        control={control}
                        label="DateRange"
                        list={dateRangeList}
                      />
                    </div>
                  </div>
                )}
                <div className="w-full">
                  <label
                    htmlFor="Autocorrect"
                    className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                  >
                    Autocorrect
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('Autocorrect')}
                      id="Autocorrect"
                      name="Autocorrect"
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-700 text-zinc-800 accent-zinc-800 focus:ring-zinc-800 dark:text-zinc-100 dark:accent-zinc-100 dark:focus:ring-zinc-100"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex w-full flex-row items-center gap-x-4">
              {tempFilterprop.Type.name === 'Maps' ||
              tempFilterprop.Type.name === 'Places' ||
              tempFilterprop.Type.name === 'Scholar' ||
              tempFilterprop.Type.name === 'Autocomplete' ? (
                <></>
              ) : (
                <div className="w-full">
                  <label
                    htmlFor="Result"
                    className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                  >
                    Result
                  </label>
                  <div className="mt-1">
                    <ShortTextSelector
                      control={control}
                      label="Results"
                      list={resultList}
                    />
                  </div>
                </div>
              )}

              <div className="w-full">
                <label
                  htmlFor="Page"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  Page
                </label>
                <div className="mt-1">
                  <input
                    {...register('Page', { valueAsNumber: true })}
                    min="1"
                    id="Page"
                    name="Page"
                    type="number"
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
                <Controller
                  name="MiniBatch"
                  control={control}
                  render={({ field }) => (
                    <MySwitch
                      enabled={field.value}
                      setEnabled={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

import { useRef } from 'react'
import { toOtherLang } from '../libs/MyOtherLangConverter'

const initialLanguageState: LanguageState = {
  cSharp: 'C#',
  dart: 'dart',
  go: 'go',
  http: 'http',
  java: 'java',
  javaScript: 'javaScript',
  c: 'c',
  nodeJs: 'nodeJs',
  objectiveC: 'objectiveC',
  ocaml: 'ocaml',
  php: 'php',
  powerShell: 'powerShell',
  python: 'python',
  r: 'r',
  ruby: 'ruby',
  shell: 'shell',
  swift: 'swift',
}

function OutputCard(props: {
  filterProp: FormFilterProps
  tempFilterProp: FormFilterProps
  onSubmit: any
  handleSubmit: any
  control: any
}) {
  const { filterProp, tempFilterProp, handleSubmit, onSubmit, control } = props
  const apiKey = useApiKeyStore((state) => state.apiKey)
  const [modeSelected, setModeSelect] = useState<'Results' | 'Code'>('Code')
  const resultJsonData = useResultStore((state) => state.result)
  const setResultJsonData = useResultStore((state) => state.setResult)
  const [curl, setCurl] = useState('')
  const [otherLang, setOtherLang] =
    useState<LanguageState>(initialLanguageState)
  const [copyState, setCopyState] = useState<'Copy' | 'Copied'>('Copy')
  useEffect(() => {
    setCurl(convertToCurl(tempFilterProp, apiKey))
  }, [tempFilterProp, apiKey])

  const fetchResult = async (init?: 'init') => {
    const validCurlExample = `curl --location --request POST 'https://google.serper.dev/videos' \\
--header 'X-API-KEY: 2aa1f782fa840f29ef0629249d621449d7235651' \\
--header 'Content-Type: application/json' \\
--data-raw '[{"q":"apple","location":"United Kingdom","gl":"al","hl":"ak","num":20,"autocorrect":false,"tbs":"qdr:w","page":2}]'`
    try {
      const rawResult = await fetchFromCurl(
        init === 'init' ? convertToCurl(filterProp, apiKey) : curl,
      )
      console.log(rawResult)
      const result = JSON.stringify(rawResult)

      setResultJsonData(result)
    } catch (error) {
      setResultJsonData('Invalid JSON format in headers or body.')
      console.error('Error: ', error)
      ;('')
    }
  }

  const useIsMount = () => {
    const isMountRef = useRef(true)
    useEffect(() => {
      isMountRef.current = false
    }, [])
    return isMountRef.current
  }
  const isMount = useIsMount()

  useEffect(() => {
    if (isMount) {
      fetchResult('init')
    } else {
      fetchResult()
      setModeSelect('Results')
    }
  }, [filterProp])

  useEffect(() => {
    if (modeSelected === 'Results') {
      const element = document.getElementById('json') as HTMLElement
      if (element) {
        try {
          const obj = JSON.parse(element.innerText)
          element.innerHTML = JSON.stringify(obj, undefined, 2)
        } catch (e) {
          console.error('Error parsing JSON:', e)
        }
      } else {
        console.error("Element with id 'json' not found")
      }
    }
  }, [modeSelected, fetchResult])

  const downloadJSON = () => {
    const blob = new Blob([resultJsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url) // Clean up the URL object
  }

  const getLanguageValue = (
    codingLanguage: string,
    otherLang: LanguageState,
  ) => {
    switch (codingLanguage) {
      case 'C':
        return otherLang.c
      case 'C#':
        return otherLang.cSharp
      case 'Dart':
        return otherLang.dart
      case 'Go':
        return otherLang.go
      case 'HTTP':
        return otherLang.http
      case 'Java':
        return otherLang.java
      case 'JavaScript':
        return otherLang.javaScript
      case 'NodeJs':
        return otherLang.nodeJs
      case 'Objective-C':
        return otherLang.objectiveC
      case 'OCaml':
        return otherLang.ocaml
      case 'PHP':
        return otherLang.php
      case 'PowerShell':
        return otherLang.powerShell
      case 'Python':
        return otherLang.python
      case 'R':
        return otherLang.r
      case 'Ruby':
        return otherLang.ruby
      case 'Shell':
        return otherLang.shell
      case 'Swift':
        return otherLang.swift
      default:
        return ''
    }
  }

  useEffect(() => {
    setOtherLang(toOtherLang(curl, tempFilterProp.Method))
  }, [curl, tempFilterProp])

  return (
    <nav className="mt-1 flex w-full flex-col overflow-auto bg-inherit">
      <div className="relative flex h-10 justify-between">
        <div className="flex w-full flex-row justify-between border-b-[1.5px] dark:border-zinc-500">
          <div className="flex flex-row">
            <button
              type="button"
              className={classNames(
                'z-10 inline-flex h-[41px] items-center border-b-2 px-4 text-base font-medium transition active:transition-none',
                modeSelected === 'Results'
                  ? 'border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100 dark:active:bg-zinc-900'
                  : 'border-transparent text-zinc-500 dark:hover:border-zinc-500 dark:hover:text-zinc-300 dark:active:bg-zinc-900',
              )}
              onClick={() => setModeSelect('Results')}
            >
              Results
            </button>
            <button
              type="button"
              className={classNames(
                'z-10 inline-flex h-[41px] items-center border-b-2 px-4 text-base font-medium transition active:transition-none',
                modeSelected === 'Code'
                  ? 'border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100 dark:active:bg-zinc-900'
                  : 'border-transparent text-zinc-500 dark:hover:border-zinc-500 dark:hover:text-zinc-300 dark:active:bg-zinc-900',
              )}
              onClick={() => setModeSelect('Code')}
            >
              Code
            </button>
          </div>
          <div className="flex flex-row">
            <div className="z-10 inline-flex h-[41px] items-center border-b-2 border-transparent text-base font-medium dark:text-zinc-100">
              Credits: 3
            </div>
          </div>
        </div>
      </div>
      {modeSelected === 'Results' ? (
        <div className="mt-4 flex w-full flex-col gap-y-0 overflow-auto rounded-lg bg-zinc-100 px-4 py-5 md:p-6 dark:bg-zinc-900">
          <div className="flex w-full flex-row-reverse">
            <Button
              onClick={() => {
                downloadJSON()
              }}
              variant="secondary"
              className="h-9 items-center gap-x-2 pl-3 pr-4"
            >
              <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
              Download
            </Button>
          </div>
          <pre
            className="overflow-scroll text-[12px]/[18px] font-extralight"
            id="json"
          >
            {resultJsonData}
          </pre>
        </div>
      ) : (
        <div className="mt-4 flex min-h-48 w-full flex-col gap-y-4 overflow-auto rounded-lg bg-zinc-100 p-4 md:p-6 dark:bg-zinc-900">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-10 w-full flex-row-reverse gap-x-2"
          >
            <Button
              type="button"
              disabled={copyState === 'Copied'}
              variant="secondary"
              className="box-border h-full items-center gap-x-2 border border-zinc-100 px-4 dark:border-zinc-900"
              onClick={() => {
                navigator.clipboard
                  .writeText(
                    tempFilterProp.CodingLanguage === 'cURL'
                      ? curl
                      : getLanguageValue(
                          tempFilterProp.CodingLanguage,
                          otherLang,
                        ),
                  )
                  .then(() => {
                    setCopyState('Copied')
                    setTimeout(() => {
                      setCopyState('Copy')
                    }, 2000)
                  })
              }}
            >
              {copyState}
            </Button>
            <div className="h-full w-full sm:w-fit sm:min-w-40 lg:w-full lg:min-w-0 lg:max-w-40">
              <ShortTextSelector
                control={control}
                label="Method"
                list={getMethodList(tempFilterProp.CodingLanguage)}
              />
            </div>
            <div className="h-full w-full sm:w-fit sm:min-w-40 lg:w-full lg:min-w-0 lg:max-w-40">
              <ShortTextSelector
                control={control}
                label="CodingLanguage"
                list={codingLanguageList}
              />
            </div>
          </form>
          {curl === '' ? (
            <div className="flex h-full w-full items-center justify-center text-zinc-700">
              No query input
            </div>
          ) : (
            <pre className="overflow-scroll whitespace-pre-wrap text-[12px]/[18px] font-extralight">
              {tempFilterProp.CodingLanguage === 'cURL'
                ? curl
                : getLanguageValue(tempFilterProp.CodingLanguage, otherLang)}
            </pre>
          )}
        </div>
      )}
    </nav>
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

function TypeSelector(props: { control: any }) {
  const { control } = props

  const getIconComponent = (name: string) => {
    const item = typeList.find((type) => type.name === name)
    return item ? (
      <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
    ) : null
  }
  return (
    <Controller
      name="Type"
      control={control}
      render={({ field }) => (
        <Listbox value={field.value.name} onChange={field.onChange}>
          {({ open }) => (
            <>
              <div className="relative w-full">
                <ListboxButton className="relative h-10 w-full cursor-default rounded-md bg-zinc-50 py-1.5 pl-3 pr-10 text-left text-base font-normal text-zinc-900 shadow-sm outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none disabled:cursor-not-allowed disabled:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 disabled:dark:text-zinc-400">
                  <span className="flex items-center">
                    {getIconComponent(field.value.name)}
                    <span className="ml-3 block truncate">
                      {field.value.id === 0 ? 'Optional' : field.value.name}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
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
                  <ListboxOptions className="no-scrollbar absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-zinc-200 py-1 text-base shadow-lg focus:outline-none sm:text-sm dark:bg-zinc-800">
                    {typeList.map((item: TypeItem) => (
                      <ListboxOption
                        key={item.id}
                        className={({ focus }) =>
                          classNames(
                            focus
                              ? 'bg-zinc-300 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                              : '',
                            !focus ? 'text-zinc-600 dark:text-zinc-400' : '',
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
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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
      )}
    />
  )
}

function LongTextSelector(props: { list: any[]; label: string; control: any }) {
  const { label, list, control } = props

  return (
    <Controller
      name={label}
      control={control}
      render={({ field }) => (
        <Listbox value={field.value.name} onChange={field.onChange}>
          {({ open }) => (
            <>
              <div className="relative w-full">
                <ListboxButton
                  className={classNames(
                    'relative h-10 w-full cursor-default rounded-md bg-zinc-50 py-1.5 pl-3 pr-10 text-left text-base font-normal shadow-sm outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:transition-none disabled:cursor-not-allowed disabled:text-zinc-600 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 dark:active:bg-zinc-800/50 disabled:dark:text-zinc-400',
                    field.value === 'None'
                      ? 'text-zinc-300 active:text-zinc-600/40 dark:text-zinc-600'
                      : 'text-zinc-900 active:text-zinc-900/80 dark:text-zinc-100 dark:hover:text-zinc-50 dark:active:text-zinc-50/70',
                  )}
                >
                  <span className="flex items-center">
                    {field.value === 'None' ? 'Optional' : field.value}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronDownIcon
                      className={classNames(
                        'h-5 w-5 text-zinc-400',
                        field.value === 'None'
                          ? 'text-zinc-900 dark:text-zinc-100'
                          : 'text-zinc-900 dark:text-zinc-100',
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
                  <ListboxOptions className="no-scrollbar absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-zinc-200 py-1 text-base shadow-lg focus:outline-none sm:text-sm dark:bg-zinc-800">
                    {list.map((item: any) => (
                      <ListboxOption
                        key={item.id}
                        className={({ focus }) =>
                          classNames(
                            focus
                              ? 'bg-zinc-300 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                              : '',
                            !focus ? 'text-zinc-600 dark:text-zinc-400' : '',
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                          )
                        }
                        value={item.name}
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
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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
      )}
    />
  )
}

function ShortTextSelector(props: {
  list: any[]
  label: string
  control: any
}) {
  const { label, list, control } = props

  useEffect(() => {}, [list])

  return (
    <Controller
      name={label}
      control={control}
      render={({ field }) => (
        <Listbox value={field.value.name} onChange={field.onChange}>
          {({ open }) => (
            <>
              <div className="relative w-full">
                <ListboxButton
                  className={classNames(
                    'relative  h-10 w-full cursor-default rounded-md bg-zinc-50 py-1.5 pl-3 pr-10 text-left text-base font-normal shadow-sm outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:transition-none disabled:cursor-not-allowed disabled:text-zinc-600 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 dark:active:bg-zinc-800/50 disabled:dark:text-zinc-400',
                    field.value === 'None'
                      ? 'text-zinc-300 active:text-zinc-600/40 dark:text-zinc-600'
                      : 'text-zinc-900 active:text-zinc-900/80 dark:text-zinc-100 dark:hover:text-zinc-50 dark:active:text-zinc-50/70',
                  )}
                >
                  <span className="flex items-center">
                    {field.value === 'None' ? 'Optional' : field.value}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronDownIcon
                      className={classNames(
                        'h-5 w-5 text-zinc-400',
                        field.value === 'None'
                          ? 'text-zinc-900 dark:text-zinc-100'
                          : 'text-zinc-900 dark:text-zinc-100',
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
                  <ListboxOptions className="no-scrollbar absolute z-10 mt-1 max-h-[120px] w-full overflow-auto rounded-md bg-zinc-200 py-1 text-base shadow-lg focus:outline-none sm:text-sm dark:bg-zinc-800">
                    {list.map((item: any) => (
                      <ListboxOption
                        key={item.id}
                        className={({ focus }) =>
                          classNames(
                            focus
                              ? 'bg-zinc-300 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                              : '',
                            !focus ? 'text-zinc-600 dark:text-zinc-400' : '',
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                          )
                        }
                        value={item.name}
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
                                  focus
                                    ? 'dark:text-zinc-900'
                                    : 'dark:text-zinc-900',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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
      )}
    />
  )
}
const typeList: TypeItem[] = [
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

const countryList: ListItem[] = [
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

const locationList: ListItem[] = [
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

const languageList: ListItem[] = [
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

const dateRangeList: DateRange[] = [
  { id: 1, name: 'Anytime', aka: '' },
  { id: 2, name: 'Past hour', aka: '' },
  { id: 3, name: 'Past 24 hours', aka: '' },
  { id: 4, name: 'Past week', aka: '' },
  { id: 5, name: 'Past month', aka: '' },
  { id: 6, name: 'Past year', aka: '' },
]

const resultList: Result[] = [
  { id: 1, name: '10', aka: '' },
  { id: 2, name: '20', aka: '' },
  { id: 3, name: '30', aka: '' },
  { id: 4, name: '40', aka: '' },
  { id: 5, name: '50', aka: '' },
  { id: 6, name: '100', aka: '' },
]

const codingLanguageList: CodingLanguage[] = [
  { id: 1, name: 'C#', aka: 'CSharp' },
  { id: 2, name: 'cURL', aka: 'cURL' },
  { id: 3, name: 'Dart', aka: 'Dart' },
  { id: 4, name: 'Go', aka: 'Go' },
  { id: 5, name: 'HTTP', aka: 'HTTP' },
  { id: 6, name: 'Java', aka: 'Java' },
  { id: 7, name: 'JavaScript', aka: 'JavaScript' },
  { id: 8, name: 'C', aka: 'C' },
  { id: 9, name: 'NodeJs', aka: 'NodeJs' },
  { id: 10, name: 'Objective-C', aka: 'ObjectiveC' },
  { id: 11, name: 'OCaml', aka: 'OCaml' },
  { id: 12, name: 'PHP', aka: 'PHP' },
  { id: 13, name: 'PowerShell', aka: 'PowerShell' },
  { id: 14, name: 'Python', aka: 'Python' },
  { id: 15, name: 'R', aka: 'R' },
  { id: 16, name: 'Ruby', aka: 'Ruby' },
  { id: 17, name: 'Shell', aka: 'Shell' },
  { id: 18, name: 'Swift', aka: 'Swift' },
]

const getMethodList = (codingLanguage: string): ListItem[] => {
  switch (codingLanguage) {
    case 'C':
      return [{ id: 1, name: 'libcurl', aka: 'libcurl' }]
    case 'C#':
      return [{ id: 1, name: 'RestSharp', aka: 'RestSharp' }]
    case 'Dart':
      return [{ id: 1, name: 'http', aka: 'http' }]
    case 'Go':
      return [{ id: 1, name: 'Native', aka: 'Native' }]
    case 'HTTP':
      return [{ id: 1, name: 'HTTP', aka: 'HTTP' }]
    case 'Java':
      return [
        { id: 1, name: 'OkHttp', aka: 'OkHttp' },
        { id: 2, name: 'Unirest', aka: 'Unirest' },
      ]
    case 'JavaScript':
      return [
        { id: 1, name: 'Fetch', aka: 'Fetch' },
        { id: 2, name: 'jQuery', aka: 'jQuery' },
        { id: 3, name: 'XHR', aka: 'XHR' },
      ]
    case 'NodeJs':
      return [
        { id: 1, name: 'Axios', aka: 'Axios' },
        { id: 2, name: 'Native', aka: 'Native' },
        { id: 3, name: 'Request', aka: 'Request' },
        { id: 4, name: 'Unirest', aka: 'Unirest' },
      ]
    case 'Objective-C':
      return [{ id: 1, name: 'NSURLSession', aka: 'NSURLSession' }]
    case 'OCaml':
      return [{ id: 1, name: 'Cohttp', aka: 'Cohttp' }]
    case 'PHP':
      return [
        { id: 1, name: 'cURL', aka: 'cURL' },
        { id: 2, name: 'Guzzle', aka: 'Guzzle' },
        { id: 3, name: 'HTTP_Request2', aka: 'HTTP_Request2' },
        { id: 4, name: 'pecl_http', aka: 'pecl_http' },
      ]
    case 'PowerShell':
      return [{ id: 1, name: 'RestMethod', aka: 'RestMethod' }]
    case 'Python':
      return [
        { id: 1, name: 'http.client', aka: 'http.client' },
        { id: 2, name: 'Requests', aka: 'Requests' },
      ]
    case 'R':
      return [
        { id: 1, name: 'httr', aka: 'httr' },
        { id: 2, name: 'RCurl', aka: 'RCurl' },
      ]
    case 'Ruby':
      return [{ id: 1, name: 'Net::HTTP', aka: 'Net::HTTP' }]
    case 'Shell':
      return [
        { id: 1, name: 'Httpie', aka: 'Httpie' },
        { id: 2, name: 'wget', aka: 'wget' },
      ]
    case 'Swift':
      return [{ id: 1, name: 'URLSession', aka: 'URLSession' }]
    default:
      return [{ id: 1, name: 'cURL', aka: 'cURL' }]
  }
}

'use client'

import { Button } from '@/components/Button'
import { Dispatch, SetStateAction, useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Logs() {
  const [enabled, setEnabled] = useState(false)
  return (
    // <div className="flex w-full min-w-[718px] flex-col">
    <div className="flex w-full flex-col">
      <div className="text-2xl font-semibold lg:text-3xl dark:text-zinc-100">
        Activity logs
      </div>
      <div className="mt-1 flex h-10 w-full flex-row items-center justify-between lg:mt-[6px]">
        <div className="line-clamp-1 text-base font-normal dark:text-zinc-200">
          An overview of your latest requests
        </div>
        <div className="flex w-fit flex-row-reverse items-center gap-x-8">
          <Button variant="secondary" className="px-4">
            Refresh
          </Button>
          <div className="flex flex-row items-center gap-x-2">
            <div className="line-clamp-1 text-base font-normal dark:text-zinc-200">
              Anonymize queries
            </div>
            <MySwitch enabled={enabled} setEnabled={setEnabled} />
          </div>
        </div>
      </div>
      <div className="mt-8 flex w-full">
        <MyTable />
      </div>
    </div>
  )
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
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

const people = [
  {
    Id: 1,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 2,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 3,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 4,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 5,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
]

function MyTable() {
  return (
    <div className="w-full bg-zinc-100 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full px-6 align-middle">
              <table className="min-w-full divide-y divide-zinc-300 dark:divide-zinc-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0 dark:text-zinc-100"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold dark:text-zinc-100"
                    >
                      Query
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold dark:text-zinc-100"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold dark:text-zinc-100"
                    >
                      GI
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold dark:text-zinc-100"
                    >
                      HI
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold dark:text-zinc-100"
                    >
                      Page
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold dark:text-zinc-100"
                    >
                      Num
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold dark:text-zinc-100"
                    >
                      Credits
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold dark:text-zinc-100"
                    >
                      Response time (ms)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {people.map((person) => (
                    <tr key={person.Id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0 dark:text-zinc-100">
                        {person.Time}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                        {person.Query}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                        {person.Type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                        {person.GI}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                        {person.HI}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                        {person.Page}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                        {person.Num}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                        {person.Credits}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                        {person.ResponseTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/components/Button'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
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

const allRequests = [
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
    Page: '2',
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
  {
    Id: 6,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '3',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 7,
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
    Id: 8,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1842',
  },
  {
    Id: 9,
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
    Id: 10,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1878',
  },
  {
    Id: 11,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1753',
  },
  {
    Id: 12,
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
    Id: 13,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1663',
  },
  {
    Id: 14,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '2',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 15,
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
    Id: 16,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '3',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 17,
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
    Id: 18,
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
    Id: 19,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'videos',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 20,
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
    Id: 21,
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
    Id: 22,
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
    Id: 23,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '4',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 24,
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
    Id: 25,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '2',
    Num: '100',
    Credits: '2',
    ResponseTime: '1853',
  },
  {
    Id: 26,
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
    Id: 27,
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
    Id: 28,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1704',
  },
  {
    Id: 29,
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
    Id: 30,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1863',
  },
  {
    Id: 31,
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
    Id: 32,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1452',
  },
  {
    Id: 33,
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
    Id: 34,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1527',
  },
  {
    Id: 35,
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
    Id: 36,
    Time: '2024-05-26 19:10:25',
    Query: '*****',
    Type: 'search',
    GI: '',
    HI: '',
    Page: '1',
    Num: '100',
    Credits: '2',
    ResponseTime: '1893',
  },
]

function MyTable() {
  const limitReq = 10
  const [page, setPage] = useState(1)
  const [showRequests, setShowRequests] = useState<any>(
    allRequests.slice(0, 10),
  )

  const fetchReq = useCallback(async (_page: number, _limitReq: number) => {
    try {
      const response = await fetch(
        `https://api.serper.dev/stats/logs?offset=${
          _limitReq * (_page - 1)
        }&limit=${_limitReq}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,ja;q=0.8',
            'cache-control': 'no-cache',
            pragma: 'no-cache',
            priority: 'u=1, i',
            'sec-ch-ua':
              '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            cookie:
              '_ga=GA1.1.1971740701.1716871086; _gcl_au=1.1.616450131.1716871086.369678705.1717293775.1717293775; connect.sid=s%3ALcMepT4fa3qifEFTs6Zu-ZxPOs_AL7Qg.8LVtybUiH71lfJB75qbxAjdYkD%2B%2F9sGzVUt1CWvLOak; _clck=r4vuaq%7C2%7Cfmc%7C0%7C1609; _clsk=gr2zso%7C1717486584370%7C10%7C1%7Co.clarity.ms%2Fcollect; _ga_M5LDW4K59C=GS1.1.1717484391.30.1.1717486597.0.0.0; __cf_bm=JYe0Q02BAOjls4Hx6Rj7nSe95VHVyYXvP40hwXskltw-1717486600-1.0.1.1-6..yBY.SdBuSsl1LvOLvDddhr35JzJTljeYN6UeyfHmWx37zfcBrR0b_woujuhaKD3eN_jk4bJdhS.L3.W2CcQ',
            Referer: 'https://serper.dev/',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
          },
          body: null,
          method: 'GET',
        },
      )
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }, [])

  useEffect(() => {
    // fetchReq(page, limitReq)
    setShowRequests(allRequests.slice(limitReq * (page - 1), limitReq * page))
  }, [fetchReq, page])
  return (
    <div className="w-full rounded-b-md bg-zinc-100 pb-1 shadow dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full divide-y divide-zinc-200 overflow-x-auto px-6 align-middle dark:divide-zinc-800">
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
                {showRequests.map((req: any) => (
                  <tr key={req.Id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0 dark:text-zinc-100">
                      {req.Time}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                      {req.Query}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                      {req.Type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                      {req.GI}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                      {req.HI}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                      {req.Page}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                      {req.Num}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                      {req.Credits}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300">
                      {req.ResponseTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex w-full flex-row-reverse gap-x-2 py-4">
              <Button
                onClick={() => {
                  setPage(page + 1)
                }}
                disabled={showRequests.length < limitReq}
                variant="secondary"
                className="box-border border border-inherit px-4"
              >
                Next
              </Button>
              <Button
                onClick={() => {
                  setPage(page - 1)
                }}
                disabled={page <= 1}
                variant="secondary"
                className="box-border border border-inherit px-4 "
              >
                Previous
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

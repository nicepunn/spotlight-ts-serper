'use client'

import { Button } from '@/components/Button'
import { KeyIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  return (
    <div className="flex w-full flex-col gap-y-8 lg:gap-y-6">
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-y-[1.5px] lg:gap-y-1">
          <div className="text-2xl font-semibold lg:text-3xl dark:text-zinc-100">
            Dashboard
          </div>
          <div className="text-base font-normal dark:text-zinc-200">
            All usage metrics at a glance
          </div>
        </div>
        <div className="flex h-10 w-fit flex-row-reverse gap-x-3">
          <Button variant="primary" className="px-4">
            Top up
          </Button>
          <Button variant="secondary" className="gap-x-2 pl-3 pr-4">
            <KeyIcon className="h-6 w-6" aria-hidden="true" />
            API key
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-6 md:h-[121px] md:flex-row md:justify-between">
        <div className="flex h-[107px] w-full flex-col justify-between rounded-lg bg-zinc-100 px-4 py-5 md:h-full md:grow md:px-6 md:py-6 dark:bg-zinc-900">
          <div className="text-sm font-normal leading-4 text-zinc-800 dark:text-zinc-200">
            Requests last 30 days
          </div>
          <div className="text-[30px]/[42px] font-semibold text-zinc-800 md:text-[36px]/[48px] md:font-semibold md:tracking-tight dark:text-zinc-200">
            248
          </div>
        </div>
        <div className="flex h-[107px] w-full flex-col justify-between rounded-lg bg-zinc-100 px-4 py-5 md:h-full md:grow md:px-6 md:py-6 dark:bg-zinc-900">
          <div className="text-sm font-normal leading-4 text-zinc-800 dark:text-zinc-200">
            Requests last 24 hours
          </div>
          <div className="text-[30px]/[42px] font-semibold text-zinc-800 md:text-[36px]/[48px] md:font-semibold md:tracking-tight dark:text-zinc-200">
            +3
          </div>
        </div>
        <div className="flex h-[107px] w-full flex-col justify-between rounded-lg bg-zinc-100 px-4 py-5 md:h-full md:grow md:px-6 md:py-6 dark:bg-zinc-900">
          <div className="text-sm font-normal leading-4 text-zinc-800 dark:text-zinc-200">
            Credits left
          </div>
          <div className="text-[30px]/[42px] font-semibold text-zinc-800 md:text-[36px]/[48px] md:font-semibold md:tracking-tight dark:text-zinc-200">
            348,973
          </div>
        </div>
      </div>
      <MyGraph />
    </div>
  )
}

function MyGraph() {
  return (
    <div className="flex h-fit w-full flex-col overflow-hidden rounded-lg bg-zinc-100 px-4 dark:bg-zinc-900">
      <form
        action="#"
        method="POST"
        className="flex h-[60px] w-full flex-row items-center justify-between"
      >
        <div className="flex flex-row gap-x-2">
          <select
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border-r-[12px] border-solid border-transparent bg-zinc-50 py-2 pl-3 pr-1 text-base font-normal text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none disabled:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 disabled:dark:text-zinc-400"
            id="graph-mode"
            name="graph-mode"
          >
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="requests"
            >
              Requests
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="credits"
            >
              Credits
            </option>
          </select>
          <input
            type="date"
            className="line-clamp-1 inline-flex h-10 items-center justify-center gap-2 rounded-md border-r-[12px] border-solid border-transparent bg-zinc-50 py-2 pl-3 pr-1 text-base font-normal text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none disabled:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 disabled:dark:text-zinc-400"
            id="date-picker"
            name="date-picker"
          />
          {/* <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="datePicker"
            >
              05/16/2024 - 05/30/2024
            </option> */}
        </div>
        <div className="flex flex-col items-end gap-y-1">
          <div className="text-sm font-normal leading-4 text-zinc-800 dark:text-zinc-200">
            Total
          </div>
          <div className="text-base font-bold leading-4 text-zinc-800 dark:text-zinc-200">
            243
          </div>
        </div>
      </form>
      <div className="flex h-fit w-full items-center justify-center py-4">
        <MyBarChart />
      </div>
    </div>
  )
}

import { BarChart, Card, Divider, Switch } from '@tremor/react'

const data = [
  {
    date: 'Jan 23',
    'This Year': 68560,
    'Last Year': 28560,
  },
  {
    date: 'Feb 23',
    'This Year': 70320,
    'Last Year': 30320,
  },
  {
    date: 'Mar 23',
    'This Year': 80233,
    'Last Year': 70233,
  },
  {
    date: 'Apr 23',
    'This Year': 55123,
    'Last Year': 45123,
  },
  {
    date: 'May 23',
    'This Year': 56000,
    'Last Year': 80600,
  },
  {
    date: 'Jun 23',
    'This Year': 100000,
    'Last Year': 85390,
  },
  {
    date: 'Jul 23',
    'This Year': 85390,
    'Last Year': 45340,
  },
  {
    date: 'Aug 23',
    'This Year': 80100,
    'Last Year': 70120,
  },
  {
    date: 'Sep 23',
    'This Year': 75090,
    'Last Year': 69450,
  },
  {
    date: 'Oct 23',
    'This Year': 71080,
    'Last Year': 63345,
  },
  {
    date: 'Nov 23',
    'This Year': 61210,
    'Last Year': 100330,
  },
  {
    date: 'Dec 23',
    'This Year': 60143,
    'Last Year': 45321,
  },
]

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(number)
}

function MyBarChart() {
  return (
    <div className="w-full">
      <BarChart
        data={data}
        index="date"
        categories={['This Year']}
        colors={['zinc-950']}
        valueFormatter={valueFormatter}
        yAxisWidth={45}
        className="h-[360px] text-zinc-100 sm:block"
        showAnimation
        showLegend={false}
        // barColor="#4caf50" // Customize the bar color
        // barOpacity={0.8} // Customize the bar opacity
        // axisColor="#333" // Customize the axis color
        // axisLineColor="#ccc" // Customize the axis line color
        // axisLabelColor="#333" // Customize the axis label color
        // gridColor="#e0e0e0" // Customize the grid color
      />
    </div>
  )
}

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
          <div className="text-[36px]/[48px] font-semibold text-zinc-800 dark:text-zinc-200">
            244
          </div>
        </div>
        <div className="flex h-[107px] w-full flex-col justify-between rounded-lg bg-zinc-100 px-4 py-5 md:h-full md:grow md:px-6 md:py-6 dark:bg-zinc-900">
          <div className="text-sm font-normal leading-4 text-zinc-800 dark:text-zinc-200">
            Requests last 24 hours
          </div>
          <div className="text-[36px]/[48px] font-semibold text-zinc-800 dark:text-zinc-200">
            +0
          </div>
        </div>
        <div className="flex h-[107px] w-full flex-col justify-between rounded-lg bg-zinc-100 px-4 py-5 md:h-full md:grow md:px-6 md:py-6 dark:bg-zinc-900">
          <div className="text-sm font-normal leading-4 text-zinc-800 dark:text-zinc-200">
            Credits left
          </div>
          <div className="text-[36px]/[48px] font-semibold text-zinc-800 dark:text-zinc-200">
            348,977
          </div>
        </div>
      </div>
      <MyGraph />
    </div>
  )
}

function MyGraph() {
  return (
    <div className="flex h-[450px] w-full flex-col overflow-hidden rounded-lg bg-zinc-100 px-4 dark:bg-zinc-900">
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
          <select
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border-r-[12px] border-solid border-transparent bg-zinc-50 py-2 pl-3 pr-1 text-base font-normal text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none disabled:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 disabled:dark:text-zinc-400"
            id="date-picker"
            name="date-picker"
          >
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="datePicker"
            >
              05/16/2024 - 05/30/2024
            </option>
          </select>
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
    </div>
  )
}

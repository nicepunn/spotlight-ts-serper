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
      <div className="h-[450px] w-full rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
    </div>
  )
}

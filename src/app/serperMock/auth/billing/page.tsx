import { Button } from '@/components/Button'
import { KeyIcon } from '@heroicons/react/24/outline'

export default function Billing() {
  return (
    <div className="flex w-full flex-col gap-y-8 lg:gap-y-6">
      <div className="flex flex-col gap-y-[1.5px] lg:gap-y-1">
        <div className="text-2xl font-semibold lg:text-3xl dark:text-zinc-100">
          Billing
        </div>
        <div className="text-base font-normal dark:text-zinc-200">
          Manage payment details
        </div>
      </div>
      <div className="h-20 w-96 bg-zinc-100 dark:bg-zinc-900"></div>
    </div>
  )
}

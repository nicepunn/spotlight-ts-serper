import { Button } from '@/components/Button'

export default function APIKey() {
  return (
    <div className="flex w-full flex-col gap-y-16 sm:gap-y-12">
      <div className="flex flex-col gap-y-[1.5px] lg:gap-y-1">
        <div className="text-2xl font-semibold lg:text-3xl dark:text-zinc-100">
          API key
        </div>
        <div className="text-base font-normal dark:text-zinc-200">
          The key to the magic world of google
        </div>
      </div>
      <MyCard />
    </div>
  )
}

function MyCard() {
  return (
    <div className="h-[320px] w-full max-w-[448px] rounded-lg bg-zinc-100 shadow dark:bg-zinc-900">
      <form className="p-8">
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full flex-row gap-x-2">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              value={'yourkeyyourkeyyourkeyyourkeyyourkeyyourkey'}
              type="password"
              name="your key"
              id="your key"
              className="block w-full rounded-md border-0 px-4 py-1.5 text-zinc-900 shadow-sm ring-0 ring-inset ring-zinc-400 placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6 dark:text-zinc-100"
              placeholder="Your key"
            />
            <Button className="px-4" variant="secondary">
              Copy
            </Button>
          </div>
          <Button className="w-fit px-4" variant="primary">
            Reset key
          </Button>
        </div>
      </form>
    </div>
  )
}

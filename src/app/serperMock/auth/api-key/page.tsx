'use client'
import { Button } from '@/components/Button'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

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
  const [isKeyVisible, setKeyVisible] = useState(false)
  return (
    <div className="h-[320px] w-full max-w-[448px] rounded-lg bg-zinc-100 shadow dark:bg-zinc-900">
      <form className="p-8">
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full flex-row gap-x-2">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative h-fit w-full">
              <input
                value={'2aa1f782fa840f29ef0629249d621449d7'}
                type={isKeyVisible ? 'text' : 'password'}
                name="your key"
                id="your key"
                className="block h-10 w-full items-center rounded-md border-0 py-1.5 pl-3 pr-11 text-base leading-6 text-zinc-900 shadow-sm ring-0 ring-inset ring-zinc-400 placeholder:text-zinc-400 focus:ring-1 focus:ring-inset focus:ring-zinc-600 dark:text-zinc-100"
                placeholder="Your key"
              />
              {isKeyVisible ? (
                <EyeSlashIcon
                  onClick={() => setKeyVisible(!isKeyVisible)}
                  className="absolute right-[11px] top-[11px] h-5 w-5 items-center justify-center hover:cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setKeyVisible(!isKeyVisible)}
                  className="absolute right-[11px] top-[11px] h-5 w-5 items-center justify-center hover:cursor-pointer"
                />
              )}
            </div>
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

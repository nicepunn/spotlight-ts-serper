'use client'
import { Button } from '@/components/Button'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useApiKeyStore } from '../../zustand/store'
import { useForm } from 'react-hook-form'

export default function APIKey() {
  return (
    <div className="flex w-full flex-col gap-y-16 lg:gap-y-12">
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
  const [copyState, setCopyState] = useState<'Copy' | 'Copied'>('Copy')
  useEffect(() => {
    if (copyState === 'Copied') {
      const timer = setTimeout(() => {
        setCopyState('Copy')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [copyState])
  const [isKeyVisible, setKeyVisible] = useState(false)
  const apiKey = useApiKeyStore((state) => state.apiKey)

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      apiKey: apiKey,
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="h-[320px] w-full max-w-[448px] rounded-lg bg-zinc-100 shadow dark:bg-zinc-900">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full flex-row gap-x-2">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative h-fit w-full">
              <input
                {...register('apiKey')}
                value={apiKey}
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
            <CopyButton
              watch={watch}
              copyState={copyState}
              setCopyState={setCopyState}
            />
          </div>
          <Button className="w-fit px-4" variant="primary">
            Reset key
          </Button>
        </div>
      </form>
    </div>
  )
}

function CopyButton(props: {
  watch: any
  copyState: 'Copy' | 'Copied'
  setCopyState: any
}) {
  const cutFirstAndLastLetter = (str: string) => {
    if (str.length <= 2) {
      return ''
    }
    return str.slice(1, -1)
  }
  const { copyState, setCopyState, watch } = props
  const handleCopy = () => {
    const formData = watch('apiKey')
    const formattedData = cutFirstAndLastLetter(
      JSON.stringify(formData, null, 2),
    )

    navigator.clipboard.writeText(formattedData).then(() => {
      setCopyState('Copied')
      setTimeout(() => {
        setCopyState('Copy')
      }, 2000)
    })
  }

  return (
    <Button
      disabled={copyState === 'Copied'}
      type="button"
      onClick={handleCopy}
      className="box-border border border-zinc-100 px-4 dark:border-zinc-900"
      variant="secondary"
    >
      {copyState}
    </Button>
  )
}

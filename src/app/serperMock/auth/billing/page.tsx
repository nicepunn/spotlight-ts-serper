/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/Button'
import { KeyIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'
import chip from './_assets/chip.png'

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
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <PaymentDetailsCard />
          <TopUpCard />
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <PaymentHistoryCard />
          <AutoTopUpsCard />
        </div>
      </div>
    </div>
  )
}

function PaymentDetailsCard() {
  return (
    <div className="flex h-[384px] w-full flex-col rounded-lg bg-zinc-100 p-8 shadow md:max-w-[432px] dark:bg-zinc-900">
      <div className="text-2xl font-semibold dark:text-zinc-100">
        Payment details
      </div>
      <form className="flex w-full flex-col items-center" action="#">
        <div className="mt-5 h-[183px] w-[290px] rounded-2xl bg-zinc-400 px-7 py-4">
          <div className="flex h-[26px] w-[36px] items-center justify-center overflow-hidden rounded-sm bg-zinc-300">
            <Image src={chip} alt={''} />
          </div>
          <div className="mt-9 flex w-full flex-row text-xl font-semibold tracking-[0.15em]">
            **** **** **** ••••
          </div>
          <div className="flex w-full flex-row justify-between">
            <div className="mt-6 text-sm font-semibold tracking-widest">
              XXXXXX XXXXXX
            </div>
            <div className="flex flex-col items-center text-zinc-300">
              <div className="mt-3 text-[10px]/[12px] font-normal">
                valid thru
              </div>
              <div className="text-[20px]/[20px] font-semibold tracking-wider">
                ••/••
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="mt-4 h-10 w-fit flex-none px-4"
        >
          Update payment card
        </Button>
      </form>
    </div>
  )
}
function TopUpCard() {
  return (
    <div className="flex h-[384px] w-full flex-col rounded-lg bg-zinc-100 p-8 shadow md:max-w-[432px] dark:bg-zinc-900">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="text-2xl font-semibold dark:text-zinc-100">Top up</div>
        <div className="line-clamp-1 text-base font-normal dark:text-zinc-100">
          Balance: 348,977 credits
        </div>
      </div>
      <form className="flex w-full flex-col" action="#" method="POST">
        <select
          className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border-r-[12px] border-solid border-transparent bg-zinc-50 px-3 py-2 text-base font-normal text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none disabled:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 disabled:dark:text-zinc-400"
          id="topup"
          name="topup"
        >
          <option
            className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
            value="50000"
          >
            {'50,000 credits - $50 ($1.00/1k)'}
          </option>
          <option
            className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
            value="500000"
          >
            {'500,000 credits - $375 ($0.75/1k)'}
          </option>
          <option
            className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
            value="2500000"
          >
            {'2,500,000 credits - $1,250 ($0.50/1k)'}
          </option>
          <option
            className="line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
            value="12500000"
          >
            {'12,500,000 credits - $3,750 ($0.30/1k)'}
          </option>
        </select>
        <div className="mt-1 text-sm font-normal leading-5 dark:text-zinc-200">
          * All prices are excluding tax. Tax may apply depending on your
          country.
        </div>
        <div className="mt-1 text-sm font-normal leading-5 dark:text-zinc-200">
          ** Credits are valid for 6 months.
        </div>
        <Button
          type="submit"
          variant="primary"
          className="mt-4 h-10 w-fit flex-none px-4"
        >
          Buy credits
        </Button>
      </form>
    </div>
  )
}
function PaymentHistoryCard() {
  return (
    <div className="flex h-[384px] w-full flex-col rounded-lg bg-zinc-100 p-8 shadow md:max-w-[432px] dark:bg-zinc-900">
      <div className="text-2xl font-semibold dark:text-zinc-100">
        Payment history
      </div>
      <div className="mt-3 flex w-full flex-col gap-y-0 overflow-y-auto">
        <div className="flex h-10 w-full flex-row items-center justify-between">
          <div className="flex flex-row gap-x-2">
            <div className="text-base font-normal dark:text-zinc-100">
              3/29/2024
            </div>
            <div className="text-base font-normal dark:text-zinc-300">
              02:11 AM
            </div>
          </div>
          <div className="text-base font-normal dark:text-zinc-100">
            USD 408.75
          </div>
        </div>
        <div className="flex h-10 w-full flex-row items-center justify-between">
          <div className="flex flex-row gap-x-2">
            <div className="text-base font-normal dark:text-zinc-100">
              3/29/2024
            </div>
            <div className="text-base font-normal dark:text-zinc-300">
              02:10 AM
            </div>
          </div>
          <div className="text-base font-normal dark:text-zinc-100">
            USD 0.00
          </div>
        </div>
      </div>
    </div>
  )
}
function AutoTopUpsCard() {
  const [enable, setEnable] = useState(false)
  return (
    <div className="flex h-[384px] w-full flex-col rounded-lg bg-zinc-100 p-8 shadow md:max-w-[432px] dark:bg-zinc-900">
      <div className="text-2xl font-semibold dark:text-zinc-100">
        Auto top-ups
      </div>
      <form className="flex w-full flex-col" action="#">
        <div className="mt-2 flex flex-nowrap items-center">
          <input
            onChange={() => setEnable(!enable)}
            id="enable-auto"
            name="enable-auto"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-zinc-800 accent-zinc-800 focus:ring-zinc-800 dark:text-zinc-100 dark:accent-zinc-100 dark:focus:ring-zinc-100"
          />
          <label htmlFor="enable-auto">
            <div className="ml-2 mt-0.5 flex flex-nowrap text-sm font-semibold leading-6  text-zinc-800 dark:text-zinc-100">
              Enable auto top-ups
            </div>
          </label>
        </div>
        <div className="mt-3 flex w-full flex-col">
          <label
            htmlFor="automatically-top-up"
            className="block text-sm font-semibold leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Automatically top up
          </label>
          <select
            className="mt-1 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border-r-[12px] border-solid border-transparent bg-zinc-50 px-3 py-2 text-base font-normal text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none disabled:cursor-not-allowed disabled:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 disabled:dark:text-zinc-400"
            id="automatically-top-up"
            name="automatically-top-up"
            disabled={!enable}
          >
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="50000"
            >
              {'50,000 credits - $50 ($1.00/1k)'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="500000"
            >
              {'500,000 credits - $375 ($0.75/1k)'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="2500000"
            >
              {'2,500,000 credits - $1,250 ($0.50/1k)'}
            </option>
            <option
              className="line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="12500000"
            >
              {'12,500,000 credits - $3,750 ($0.30/1k)'}
            </option>
            <option
              className="line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="50000000"
            >
              {'50,000,000 credits - $15,000 ($0.30/1k)'}
            </option>
            <option
              className="line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="100000000"
            >
              {'100,000,000 credits - $30,000 ($0.30/1k)'}
            </option>
            <option
              className="line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="200000000"
            >
              {'200,000,000 credits - $60,000 ($0.30/1k)'}
            </option>
          </select>
        </div>
        <div className="mt-3 flex w-full flex-col">
          <label
            htmlFor="when-balance-falls-below"
            className="block text-sm font-semibold leading-6  text-zinc-800 dark:text-zinc-100"
          >
            When balance falls below
          </label>
          <select
            className="mt-1 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border-r-[12px] border-solid border-transparent bg-zinc-50 px-3 py-2 text-base font-normal text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none disabled:cursor-not-allowed disabled:text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 disabled:dark:text-zinc-400"
            id="when-balance-falls-below"
            name="when-balance-falls-below"
            disabled={!enable}
          >
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="500"
            >
              {'500 credits'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="2500"
            >
              {'2,500 credits'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="5000"
            >
              {'5,000 credits'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="25000"
            >
              {'25,000 credits'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="50000"
            >
              {'50,000 credits'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="125000"
            >
              {'125,000 credits'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="250000"
            >
              {'250,000 credits'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="625000"
            >
              {'625,000 credits'}
            </option>
            <option
              className=" line-clamp-1 text-base font-normal dark:bg-zinc-800 dark:text-zinc-100"
              value="1250000"
            >
              {'1,250,000 credits'}
            </option>
          </select>
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="mt-5 h-10 w-fit flex-none px-4"
        >
          Save
        </Button>
      </form>
    </div>
  )
}

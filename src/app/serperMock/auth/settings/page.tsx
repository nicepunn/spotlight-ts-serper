'use client'

import { Button } from '@/components/Button'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function Settings() {
  return (
    <div className="flex w-full flex-col gap-y-8 lg:gap-y-6">
      <div className="flex flex-col gap-y-[1.5px] lg:gap-y-1">
        <div className="text-2xl font-semibold lg:text-3xl dark:text-zinc-100">
          Settings
        </div>
        <div className="text-base font-normal dark:text-zinc-200">
          Change name or password
        </div>
      </div>
      <div className="flex flex-col gap-12 lg:flex-row">
        <UserInfoCard />
        <ChangePasswordCard />
      </div>
    </div>
  )
}

function UserInfoCard() {
  return (
    <div className="h-[330px] w-full rounded-lg bg-zinc-100 p-8 shadow md:max-w-[448px] dark:bg-zinc-900">
      <form className="flex h-full w-full flex-col justify-between">
        <div className="text-[24px]/[32px] font-semibold">User info</div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Name
          </label>
          <div className="mt-1 flex w-full flex-row justify-between gap-x-2">
            <input
              value={'Punnawat'}
              id="firstname"
              name="firstname"
              type="firstname"
              autoComplete="current-firstname"
              placeholder="First"
              required
              className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
            />
            <input
              value={'Lohanuit'}
              id="lastname"
              name="lastname"
              type="lastname"
              autoComplete="current-lastname"
              placeholder="Last"
              required
              className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6  text-zinc-300 dark:text-zinc-500"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled
              placeholder="Pun58000@gmail.com"
              className="w-full min-w-0 flex-auto cursor-not-allowed appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-300 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-700 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
            />
          </div>
        </div>
        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            className="h-10 w-full flex-none"
          >
            save
          </Button>
        </div>
      </form>
    </div>
  )
}

function ChangePasswordCard() {
  const [isCurrentPasswordShow, setCurrentPasswordShow] = useState(false)
  const [isNewPasswordShow, setNewPasswordShow] = useState(false)
  return (
    <div className="h-[330px] w-full rounded-lg bg-zinc-100 p-8 shadow md:max-w-[448px] dark:bg-zinc-900">
      <form className="flex h-full w-full flex-col justify-between">
        <div className="text-[24px]/[32px] font-semibold">Change password</div>
        <div>
          <label
            htmlFor="current-password"
            className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
          >
            Current password
          </label>
          <div className="mt-1">
            <div className="relative h-fit w-full">
              <input
                id="current-password"
                name="current-password"
                type={isCurrentPasswordShow ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white py-[calc(theme(spacing.2)-1px)] pl-3 pr-10 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
              />
              {isCurrentPasswordShow ? (
                <EyeSlashIcon
                  onClick={() => setCurrentPasswordShow(!isCurrentPasswordShow)}
                  className="absolute right-[11px] top-[11px] h-5 w-5 items-center justify-center hover:cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setCurrentPasswordShow(!isCurrentPasswordShow)}
                  className="absolute right-[11px] top-[11px] h-5 w-5 items-center justify-center hover:cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
          >
            New password
          </label>
          <div className="mt-1">
            <div className="relative h-fit w-full">
              <input
                id="new-password"
                name="new-password"
                type={isNewPasswordShow ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white py-[calc(theme(spacing.2)-1px)] pl-3 pr-10 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
              />
              {isNewPasswordShow ? (
                <EyeSlashIcon
                  onClick={() => setNewPasswordShow(!isNewPasswordShow)}
                  className="absolute right-[11px] top-[11px] h-5 w-5 items-center justify-center hover:cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setNewPasswordShow(!isNewPasswordShow)}
                  className="absolute right-[11px] top-[11px] h-5 w-5 items-center justify-center hover:cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            className="h-10 w-full flex-none"
          >
            save
          </Button>
        </div>
      </form>
    </div>
  )
}

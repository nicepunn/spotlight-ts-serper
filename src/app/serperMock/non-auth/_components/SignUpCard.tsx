'use client'

import { Button } from '@/components/Button'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction, useState } from 'react'

interface SignUpProps {
  setPage: Dispatch<SetStateAction<'Sign In' | 'Sign Up'>>
}

export default function SignUpCard(props: SignUpProps) {
  const [isKeyVisible, setKeyVisible] = useState(false)
  const { setPage } = props
  return (
    <div className="flex w-full flex-col items-center gap-y-6">
      <div className="flex h-10 w-full">
        <svg viewBox="0 0 214 75" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M35.6992 17.5264C37.571 17.5264 39.3369 17.8438 40.9971 18.4785C42.6735 19.1133 44.1383 19.9922 45.3916 21.1152C46.6449 22.2383 47.597 23.5404 48.248 25.0215C48.3945 25.347 48.4678 25.6807 48.4678 26.0225C48.4678 26.6898 48.2236 27.2676 47.7354 27.7559C47.2633 28.2279 46.6937 28.4639 46.0264 28.4639C45.5869 28.4639 45.1475 28.3255 44.708 28.0488C44.2686 27.7559 43.9593 27.4059 43.7803 26.999C43.1618 25.5993 42.1283 24.4844 40.6797 23.6543C39.2474 22.8242 37.5872 22.4092 35.6992 22.4092C34.7715 22.4092 33.7868 22.5231 32.7451 22.751C31.7197 22.9788 30.7513 23.3288 29.8398 23.8008C28.9284 24.2565 28.1878 24.8343 27.6182 25.5342C27.0485 26.234 26.7637 27.0479 26.7637 27.9756C26.7637 28.7243 27.0078 29.3753 27.4961 29.9287C27.9844 30.4658 28.5296 30.889 29.1318 31.1982C30.5479 31.8981 32.1104 32.3864 33.8193 32.6631C35.5446 32.9398 37.2861 33.2083 39.0439 33.4688C40.8018 33.7292 42.4375 34.1849 43.9512 34.8359C44.9115 35.2428 45.8311 35.8044 46.71 36.5205C47.5889 37.2367 48.305 38.1074 48.8584 39.1328C49.4118 40.1582 49.6885 41.3626 49.6885 42.7461C49.6885 44.5365 49.2572 46.1071 48.3945 47.458C47.5319 48.8089 46.4007 49.932 45.001 50.8271C43.6012 51.7223 42.0794 52.3978 40.4355 52.8535C38.8079 53.293 37.2129 53.5127 35.6504 53.5127C33.5345 53.5127 31.5488 53.179 29.6934 52.5117C27.8379 51.8281 26.2184 50.8678 24.835 49.6309C23.4515 48.3776 22.3936 46.9128 21.6611 45.2363C21.5146 44.9108 21.4414 44.5853 21.4414 44.2598C21.4414 43.5924 21.6774 43.0228 22.1494 42.5508C22.6377 42.0625 23.2155 41.8184 23.8828 41.8184C24.3385 41.8184 24.7861 41.9648 25.2256 42.2578C25.665 42.5345 25.9661 42.8844 26.1289 43.3076C26.8451 44.9515 28.0576 46.2536 29.7666 47.2139C31.4756 48.1579 33.4368 48.6299 35.6504 48.6299C37.0339 48.6299 38.4255 48.4264 39.8252 48.0195C41.2249 47.5964 42.3968 46.9535 43.3408 46.0908C44.3011 45.2119 44.7812 44.097 44.7812 42.7461C44.7812 41.8835 44.4883 41.1755 43.9023 40.6221C43.3327 40.0524 42.7061 39.6211 42.0225 39.3281C40.4762 38.6608 38.8242 38.2051 37.0664 37.9609C35.3086 37.7005 33.5589 37.432 31.8174 37.1553C30.0758 36.8623 28.4482 36.3333 26.9346 35.5684C25.6488 34.9173 24.4769 33.9733 23.4189 32.7363C22.3773 31.4831 21.8564 29.8962 21.8564 27.9756C21.8564 26.2829 22.2633 24.7936 23.0771 23.5078C23.9072 22.2057 24.9977 21.1152 26.3486 20.2363C27.7158 19.3411 29.2132 18.6657 30.8408 18.21C32.4684 17.7542 34.0879 17.5264 35.6992 17.5264Z"
            fill="#90CDF4"
          ></path>
          <path
            d="M93.209 26.3398C95.3737 26.3398 97.3594 26.877 99.166 27.9512C100.973 29.0254 102.421 30.474 103.512 32.2969C104.618 34.1035 105.172 36.1136 105.172 38.3271C105.172 38.7829 105.147 39.2467 105.099 39.7188C105.034 40.321 104.757 40.8337 104.269 41.2568C103.797 41.6637 103.259 41.8672 102.657 41.8672L85.5918 41.8916C85.8685 43.0635 86.3893 44.1621 87.1543 45.1875C87.9193 46.2129 88.847 47.043 89.9375 47.6777C91.0443 48.3125 92.2487 48.6299 93.5508 48.6299C94.9505 48.6299 96.2038 48.2881 97.3105 47.6045C98.4173 46.9209 99.2799 46.1315 99.8984 45.2363C100.094 44.9271 100.387 44.6667 100.777 44.4551C101.184 44.2435 101.567 44.1377 101.925 44.1377C102.592 44.1377 103.162 44.3818 103.634 44.8701C104.122 45.3584 104.366 45.9362 104.366 46.6035C104.366 47.1243 104.22 47.5882 103.927 47.9951C102.918 49.4762 101.526 50.762 99.752 51.8525C97.9941 52.9268 95.9515 53.4639 93.624 53.4639C91.7523 53.4639 90.0107 53.0977 88.3994 52.3652C86.8044 51.6328 85.4128 50.6318 84.2246 49.3623C83.0365 48.0928 82.1087 46.6361 81.4414 44.9922C80.7904 43.332 80.4648 41.5824 80.4648 39.7432C80.4648 37.9691 80.7904 36.2845 81.4414 34.6895C82.0924 33.0781 82.9958 31.6458 84.1514 30.3926C85.3232 29.1393 86.6823 28.1546 88.2285 27.4385C89.7747 26.7061 91.4349 26.3398 93.209 26.3398ZM100.143 36.9844C99.8333 35.3893 99.0358 34.0303 97.75 32.9072C96.4642 31.7842 94.9505 31.2227 93.209 31.2227C91.4349 31.2227 89.8643 31.8005 88.4971 32.9561C87.1462 34.1117 86.2347 35.4626 85.7627 37.0088L100.143 36.9844ZM128.015 29.3428C128.015 30.6449 127.388 31.3691 126.135 31.5156C125.679 31.5645 125.101 31.418 124.401 31.0762C123.701 30.7181 122.993 30.5391 122.277 30.5391C120.861 30.5391 119.738 30.9053 118.908 31.6377C118.078 32.3538 117.484 33.3223 117.126 34.543C116.768 35.7637 116.589 37.1309 116.589 38.6445V51.2422C116.589 51.9583 116.369 52.528 115.93 52.9512C115.507 53.3743 114.912 53.5859 114.147 53.5859C113.399 53.5859 112.805 53.3743 112.365 52.9512C111.926 52.528 111.706 51.9502 111.706 51.2178V28.7324C111.706 28 111.885 27.3978 112.243 26.9258C112.618 26.4538 113.122 26.2178 113.757 26.2178C114.131 26.2178 114.562 26.3805 115.051 26.7061C115.555 27.0153 115.905 27.5524 116.101 28.3174L116.345 30.0752C116.556 29.6195 116.963 29.0905 117.565 28.4883C118.168 27.8861 118.884 27.3652 119.714 26.9258C120.544 26.4701 121.407 26.2422 122.302 26.2422C123.962 26.2422 125.329 26.4375 126.403 26.8281C127.478 27.2025 128.015 28.0407 128.015 29.3428ZM159.72 39.9141C159.72 41.7533 159.378 43.5436 158.694 45.2852C158.027 47.0267 157.018 48.5648 155.667 49.8994C154.479 51.055 153.112 51.9502 151.565 52.585C150.019 53.2197 148.416 53.5371 146.756 53.5371C145.063 53.5371 143.558 53.179 142.239 52.4629C140.937 51.7467 139.757 50.7783 138.699 49.5576V59.8359C138.699 60.5033 138.455 61.0729 137.967 61.5449C137.495 62.0332 136.925 62.2773 136.258 62.2773C135.59 62.2773 135.013 62.0332 134.524 61.5449C134.052 61.0729 133.816 60.5033 133.816 59.8359V28.6592C133.816 27.9919 134.052 27.4222 134.524 26.9502C135.013 26.4619 135.59 26.2178 136.258 26.2178C136.925 26.2178 137.422 26.4619 137.747 26.9502C138.089 27.4222 138.309 27.9919 138.406 28.6592L138.699 30.6367C139.627 29.3021 140.848 28.2523 142.361 27.4873C143.891 26.7223 145.413 26.3398 146.927 26.3398C148.766 26.3398 150.459 26.7061 152.005 27.4385C153.567 28.1709 154.926 29.1719 156.082 30.4414C157.238 31.6947 158.133 33.1351 158.768 34.7627C159.402 36.3903 159.72 38.1074 159.72 39.9141ZM146.976 31.2227C145.918 31.2227 144.868 31.4587 143.826 31.9307C142.785 32.3864 141.897 33.0212 141.165 33.835C140.433 34.6325 139.863 35.5846 139.456 36.6914C139.065 37.7819 138.87 38.8968 138.87 40.0361C138.87 41.5986 139.212 43.0391 139.896 44.3574C140.579 45.6758 141.523 46.7337 142.728 47.5312C143.932 48.3288 145.307 48.7275 146.854 48.7275C148.4 48.7275 149.775 48.3125 150.979 47.4824C152.184 46.6361 153.128 45.5456 153.812 44.2109C154.511 42.86 154.861 41.4277 154.861 39.9141C154.861 38.3841 154.52 36.96 153.836 35.6416C153.152 34.3232 152.216 33.2572 151.028 32.4434C149.84 31.6296 148.489 31.2227 146.976 31.2227ZM177.924 26.3398C180.089 26.3398 182.074 26.877 183.881 27.9512C185.688 29.0254 187.136 30.474 188.227 32.2969C189.333 34.1035 189.887 36.1136 189.887 38.3271C189.887 38.7829 189.862 39.2467 189.813 39.7188C189.748 40.321 189.472 40.8337 188.983 41.2568C188.511 41.6637 187.974 41.8672 187.372 41.8672L170.307 41.8916C170.583 43.0635 171.104 44.1621 171.869 45.1875C172.634 46.2129 173.562 47.043 174.652 47.6777C175.759 48.3125 176.964 48.6299 178.266 48.6299C179.665 48.6299 180.919 48.2881 182.025 47.6045C183.132 46.9209 183.995 46.1315 184.613 45.2363C184.809 44.9271 185.102 44.6667 185.492 44.4551C185.899 44.2435 186.282 44.1377 186.64 44.1377C187.307 44.1377 187.877 44.3818 188.349 44.8701C188.837 45.3584 189.081 45.9362 189.081 46.6035C189.081 47.1243 188.935 47.5882 188.642 47.9951C187.632 49.4762 186.241 50.762 184.467 51.8525C182.709 52.9268 180.666 53.4639 178.339 53.4639C176.467 53.4639 174.726 53.0977 173.114 52.3652C171.519 51.6328 170.128 50.6318 168.939 49.3623C167.751 48.0928 166.824 46.6361 166.156 44.9922C165.505 43.332 165.18 41.5824 165.18 39.7432C165.18 37.9691 165.505 36.2845 166.156 34.6895C166.807 33.0781 167.711 31.6458 168.866 30.3926C170.038 29.1393 171.397 28.1546 172.943 27.4385C174.49 26.7061 176.15 26.3398 177.924 26.3398ZM184.857 36.9844C184.548 35.3893 183.751 34.0303 182.465 32.9072C181.179 31.7842 179.665 31.2227 177.924 31.2227C176.15 31.2227 174.579 31.8005 173.212 32.9561C171.861 34.1117 170.95 35.4626 170.478 37.0088L184.857 36.9844ZM212.729 29.3428C212.729 30.6449 212.103 31.3691 210.85 31.5156C210.394 31.5645 209.816 31.418 209.116 31.0762C208.416 30.7181 207.708 30.5391 206.992 30.5391C205.576 30.5391 204.453 30.9053 203.623 31.6377C202.793 32.3538 202.199 33.3223 201.841 34.543C201.483 35.7637 201.304 37.1309 201.304 38.6445V51.2422C201.304 51.9583 201.084 52.528 200.645 52.9512C200.221 53.3743 199.627 53.5859 198.862 53.5859C198.114 53.5859 197.52 53.3743 197.08 52.9512C196.641 52.528 196.421 51.9502 196.421 51.2178V28.7324C196.421 28 196.6 27.3978 196.958 26.9258C197.332 26.4538 197.837 26.2178 198.472 26.2178C198.846 26.2178 199.277 26.3805 199.766 26.7061C200.27 27.0153 200.62 27.5524 200.815 28.3174L201.06 30.0752C201.271 29.6195 201.678 29.0905 202.28 28.4883C202.882 27.8861 203.599 27.3652 204.429 26.9258C205.259 26.4701 206.121 26.2422 207.017 26.2422C208.677 26.2422 210.044 26.4375 211.118 26.8281C212.192 27.2025 212.729 28.0407 212.729 29.3428Z"
            fill="currentColor"
          ></path>
          <circle
            cx="35"
            cy="35"
            r="32"
            stroke="#90CDF4"
            stroke-width="6"
            fill="transparent"
          ></circle>
        </svg>
      </div>
      <div className="flex w-full flex-col items-center gap-y-3">
        <h2 className="line-clamp-1 text-3xl font-medium text-zinc-800 dark:text-zinc-100">
          Create an account
        </h2>
        <div className="flex h-6 flex-row items-center gap-x-2">
          <p className="line-clamp-1 text-base  font-normal text-zinc-600 dark:text-zinc-400">
            {'Create a free account, no credit-card needed.'}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-2 w-full min-w-[255px] max-w-[448px]">
        <div className="rounded-2xl border border-zinc-100 px-6 py-8 shadow sm:rounded-lg sm:px-10 dark:border-zinc-700/40">
          <form className="space-y-[19px]" action="#" method="POST">
            <div>
              <div className="flex flex-row gap-x-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  Name
                </label>
                <div className="block text-sm font-medium leading-6  text-red-500">
                  *
                </div>
              </div>
              <div className="mt-1 flex w-full flex-row justify-between gap-x-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="firstname"
                  autoComplete="current-firstname"
                  placeholder="First"
                  required
                  className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-base placeholder:font-normal placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                />
                <input
                  id="lastname"
                  name="lastname"
                  type="lastname"
                  autoComplete="current-lastname"
                  placeholder="Last"
                  required
                  className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-base placeholder:font-normal placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-x-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  Email
                </label>
                <div className="block text-sm font-medium leading-6  text-red-500">
                  *
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-x-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6  text-zinc-800 dark:text-zinc-100"
                >
                  Password
                </label>
                <div className="block text-sm font-medium leading-6  text-red-500">
                  *
                </div>
              </div>
              <div className="mt-1">
                <div className="relative h-fit w-full">
                  <input
                    id="password"
                    name="password"
                    type={isKeyVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white py-[calc(theme(spacing.2)-1px)] pl-3 pr-11 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
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
              </div>
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                variant="secondary"
                className="h-10 w-full flex-none"
              >
                Create account
              </Button>
            </div>

            <div className="flex flex-row items-center justify-center gap-x-2 pt-2">
              <p className="line-clamp-1 text-sm  font-normal text-zinc-600 dark:text-zinc-400">
                {'Already have an account?'}
              </p>
              <span
                className="line-clamp-1 text-sm font-medium text-zinc-800 hover:cursor-pointer hover:underline dark:text-zinc-100"
                onClick={() => setPage('Sign In')}
              >
                Log in
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

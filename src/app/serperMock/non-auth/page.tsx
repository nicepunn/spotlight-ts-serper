'use client'

import { useState } from 'react'
import SignInCard from './_components/SignInCard'
import SignUpCard from './_components/SignUpCard'

export default function Page() {
  const [page, setPage] = useState<'Sign In' | 'Sign Up'>('Sign In')
  const showPage = (page: 'Sign In' | 'Sign Up') => {
    switch (page) {
      case 'Sign In': {
        return <SignInCard setPage={setPage} />
      }
      case 'Sign Up': {
        return <SignUpCard setPage={setPage} />
      }
    }
  }
  return (
    <div className="flex w-full flex-col items-center px-4 py-24">
      {showPage(page)}
    </div>
  )
}

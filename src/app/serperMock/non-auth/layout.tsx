import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import { Layout } from './_components/Layout'

export const metadata: Metadata = {
  title: {
    template: '%s - Spencer Sharp',
    default:
      'Spencer Sharp - Software designer, founder, and amateur astronaut',
  },
  description:
    'I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function NonAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}

import ShortenUrlList from '@/components/Lists/ShortenUrlList'
import Button from '@/components/ui/Button'
import React from 'react'

function Page() {
  return (
    <>
      <h1 className="text-4xl">URL Shortener</h1>
      <ShortenUrlList />
    </>
  )
}

export default Page
import api from '@/api'
import ShortenUrlList from '@/components/Lists/ShortenUrlList'
import React from 'react'

async function Page() {
  const res = await api.url.getAllUrls()

  return (
    <>
      <h1 className="text-4xl">URL Shortener</h1>
      <ShortenUrlList data={res} />
    </>
  )
}

export default Page
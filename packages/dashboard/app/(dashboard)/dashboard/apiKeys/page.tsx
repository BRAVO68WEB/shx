import ApiKeyList from '@/components/Lists/ApiKeyList'
import Button from '@/components/ui/Button'
import React from 'react'

function Page() {
  return (
    <div className=''>
        <h1 className='text-4xl'>
            Your Api Keys
        </h1>
        <div className="flex flex-col w-full gap-4">
          <Button>Add</Button>
          <ApiKeyList />
        </div>

    </div>
  )
}

export default Page
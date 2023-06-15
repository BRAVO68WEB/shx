import ApiKeyList from '@/components/Lists/ApiKeyList'
import Button from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import React from 'react'

function Page() {
  return (
    <div className=''>
        <h1 className='text-4xl'>
            Your Api Keys
        </h1>
        <div className="flex flex-col gap-4">
          <Button className='w-min text-lg px-4 flex items-center gap-2'>Add <Plus /></Button>
          <ApiKeyList />
        </div>

    </div>
  )
}

export default Page
/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const BillboardClient = () => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title='Billboards (0)'
          description='Manage billboard for your store'
        />
        <Button onClick={() => { router.push(`/${params.storeId}/billboards/new`) } }>
          <Plus/>
          Add Billboard
        </Button>
      </div>
      <Separator />
    </>
  )
}

export default BillboardClient

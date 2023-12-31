import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb'
import * as React from 'react'

import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function DashboardLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth()
  if (userId === null) redirect('/sign-in')
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if (store === null) redirect('/')
  return (
        <>
            <Navbar />
            {children}
        </>
  )
}

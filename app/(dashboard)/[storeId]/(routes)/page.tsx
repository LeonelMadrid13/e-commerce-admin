import * as React from 'react'

import prismadb from '@/lib/prismadb'

interface DashboardPageProps {
  params: { storeId: string }
}

const DashvoardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  return (
        <div>
            Active Store: {store?.name}
        </div>
  )
}

export default DashvoardPage

'use client'

import { Model } from '@/components/ui/model'
import { useStoreModel } from '@/hooks/use-store-model'

export const StoreModel = () => {
  const storeModel = useStoreModel()
  return (
        <Model
        title='Create Store'
        description='Add a new store to manage products and categories'
        isOpen={storeModel.isOpen}
        onClose={storeModel.onClose}
    >
        Future create store form
    </Model>
  )
}

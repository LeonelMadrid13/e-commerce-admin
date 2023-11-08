'use client'

import { useEffect } from 'react'

import { useStoreModel } from '@/hooks/use-store-model'

const SetupPage = () => {
  const onOpen = useStoreModel((state) => state.onOpen)
  const isOpen = useStoreModel((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
        <div className='p-4'>
          Root Page
        </div>
  )
}

export default SetupPage

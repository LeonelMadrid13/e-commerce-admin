/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, useEffect } from 'react'

const useOrigin = () => {
  const [mounted, setMounted] = useState(false)
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return ''
  return origin
}

export default useOrigin

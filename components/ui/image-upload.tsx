'use client'
import * as React from 'react'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove
}) => {
  return (
    <div>
      Image Upload
    </div>
  )
}

export default ImageUpload

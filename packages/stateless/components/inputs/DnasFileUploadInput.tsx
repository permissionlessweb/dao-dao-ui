import { CloudDownloadRounded, CloudUploadRounded } from '@mui/icons-material'
import { useState } from 'react'

import { FileDropInput, FileDropInputProps } from './FileDropInput'

export type DnasFileUploadInputProps = Omit<
  FileDropInputProps,
  'onSelect' | 'loading'
> & {
  onChange: (url: string, file: File) => void | Promise<void>
  onRemove: (fileIndex: number) => void | Promise<void>
  onAddFileToForm: (file: File, fileUrl: string) => Promise<void>
  onError?: (error: unknown) => void
}

export const DnasFileUploadInput = ({
  onError,
  onAddFileToForm,
  ...props
}: DnasFileUploadInputProps) => {
  const [uploading, setUploading] = useState(false)

  return (
    <FileDropInput
      Icon={CloudUploadRounded}
      IconHover={CloudDownloadRounded}
      loading={uploading}
      onSelect={onAddFileToForm}
      {...props}
    />
  )
}

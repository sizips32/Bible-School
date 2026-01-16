import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Upload, File, X, Eye } from 'lucide-react'
import { generateId } from '../lib/localStorage'

// MIME 타입 매핑
const MIME_TYPE_MAP = {
  '.ppt': ['application/vnd.ms-powerpoint'],
  '.pptx': ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  '.mp4': ['video/mp4'],
  '.mov': ['video/quicktime'],
  '.avi': ['video/x-msvideo', 'video/avi'],
  '.pdf': ['application/pdf'],
  '.jpg': ['image/jpeg'],
  '.jpeg': ['image/jpeg'],
  '.png': ['image/png'],
  '.gif': ['image/gif'],
}

const FileUpload = ({ onFileUpload, acceptedTypes = '.ppt,.pptx', maxSize = 50, title, description }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    setErrorMessage('')
    const fileArray = Array.from(files)
    const validFiles = []
    const rejectedFiles = []

    fileArray.forEach(file => {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
      const isValidExtension = acceptedTypes.split(',').some(type => type.trim() === fileExtension)
      const isValidSize = file.size <= maxSize * 1024 * 1024

      // MIME 타입 검증
      const allowedMimeTypes = MIME_TYPE_MAP[fileExtension] || []
      const isValidMimeType = allowedMimeTypes.length === 0 || allowedMimeTypes.includes(file.type)

      if (isValidExtension && isValidSize && isValidMimeType) {
        validFiles.push(file)
      } else {
        rejectedFiles.push({
          name: file.name,
          reason: !isValidExtension ? '지원하지 않는 파일 형식' :
                  !isValidSize ? `파일 크기 초과 (최대 ${maxSize}MB)` :
                  '파일 형식이 올바르지 않습니다'
        })
      }
    })

    if (rejectedFiles.length > 0) {
      setErrorMessage(`업로드 실패: ${rejectedFiles.map(f => `${f.name} (${f.reason})`).join(', ')}`)
    }

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        id: generateId('upload')
      }))

      setUploadedFiles(prev => [...prev, ...newFiles])
      if (onFileUpload) {
        onFileUpload(newFiles)
      }
    }
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">파일을 드래그하여 놓거나 클릭하여 선택하세요</p>
          <p className="text-sm text-slate-500 mb-4">
            지원 형식: {acceptedTypes} (최대 {maxSize}MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes}
            multiple
            onChange={handleChange}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer"
          >
            파일 선택
          </Button>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">업로드된 파일:</h4>
            <div className="space-y-3">
              {uploadedFiles.map((fileData) => (
                <div key={fileData.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">{fileData.name}</p>
                      <p className="text-xs text-slate-500">{formatFileSize(fileData.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      업로드 완료
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(fileData.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default FileUpload


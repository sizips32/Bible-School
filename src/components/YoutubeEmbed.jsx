import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { X, ExternalLink } from 'lucide-react'

const YoutubeEmbed = ({ url, onClose }) => {
  // 유튜브 URL에서 비디오 ID 추출
  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const videoId = getYoutubeVideoId(url)

  if (!videoId) {
    return (
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">오류</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-slate-600 mb-4">
          유효하지 않은 유튜브 URL입니다. 올바른 유튜브 링크를 입력해주세요.
        </p>
        <Button onClick={onClose} className="w-full">
          확인
        </Button>
      </div>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`

  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">유튜브 영상</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(url, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            유튜브에서 보기
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 유튜브 임베드 */}
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* 푸터 */}
      <div className="p-4 bg-slate-50 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            유튜브 영상이 재생됩니다
          </div>
          <Button onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default YoutubeEmbed


import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Play, Youtube, Video, Heart } from 'lucide-react'

const MainVideoGallery = ({ videos, onVideoClick, title = "최신 영상" }) => {
  if (videos.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <Video className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">영상이 없습니다</h3>
          <p className="text-slate-500">자료실에서 영상을 업로드해주세요</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <Badge variant="secondary">{videos.length}개 영상</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, 6).map((video, index) => {
          const videoUrl = video.file ? URL.createObjectURL(video.file) : video.url;
          return (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* 영상 썸네일 */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
                  {video.thumbnail ? (
                    // YouTube 썸네일 표시
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // 기본 썸네일 (파일 업로드 영상용)
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        {video.type === 'youtube' ? (
                          <Youtube className="w-12 h-12 mx-auto mb-2 text-red-500" />
                        ) : (
                          <Play className="w-12 h-12 mx-auto mb-2" />
                        )}
                        <p className="text-sm opacity-80">{video.duration || '5분 32초'}</p>
                      </div>
                    </div>
                  )}
                  {/* 재생 버튼 오버레이 */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/90 text-slate-800 hover:bg-white"
                      onClick={() => onVideoClick && onVideoClick({ ...video, url: videoUrl })}
                    >
                      <Play className="w-6 h-6 mr-2" />
                      재생하기
                    </Button>
                  </div>
                </div>

                {/* 영상 정보 */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {video.category || '성경 이야기'}
                      </Badge>
                      {video.type === 'youtube' && (
                        <Badge variant="secondary" className="text-xs">
                          <Youtube className="w-3 h-3 mr-1" />
                          유튜브
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center text-xs text-slate-500">
                      <Heart className="w-3 h-3 mr-1" />
                      {video.likes || '124'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {videos.length > 6 && (
        <div className="text-center mt-6">
          <Button variant="outline">
            더 많은 영상 보기 ({videos.length - 6}개 더)
          </Button>
        </div>
      )}
    </div>
  )
}

export default MainVideoGallery


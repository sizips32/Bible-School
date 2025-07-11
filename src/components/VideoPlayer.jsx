import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Heart, X, Youtube, ExternalLink } from 'lucide-react'
import YoutubeEmbed from './YoutubeEmbed.jsx'

const VideoPlayer = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [liked, setLiked] = useState(false)
  const videoRef = useRef(null)

  // 유튜브 영상인 경우 YoutubeEmbed 컴포넌트 사용
  if (video.type === 'youtube' && video.url) {
    return <YoutubeEmbed url={video.url} onClose={onClose} />
  }

  const videoUrl = video.file ? URL.createObjectURL(video.file) : video.url

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * duration
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center space-x-2">
            {video.type === 'youtube' ? (
              <Youtube className="w-5 h-5 text-red-500" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            <span>{video.title}</span>
          </CardTitle>
          <CardDescription>{video.description}</CardDescription>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative bg-black rounded-lg overflow-hidden">
          {videoUrl ? (
            <video
              ref={videoRef}
              className="w-full aspect-video"
              src={videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              브라우저가 비디오를 지원하지 않습니다.
            </video>
          ) : (
            <div className="aspect-video flex items-center justify-center text-white">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
                <p className="text-lg font-medium">{video.title}</p>
                <p className="text-sm opacity-70">{video.duration || '5분 32초'}</p>
              </div>
            </div>
          )}

          {/* 비디오 컨트롤 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* 진행 바 */}
            <div
              className="w-full h-2 bg-white/30 rounded-full mb-4 cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>

            {/* 컨트롤 버튼들 */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => skipTime(-10)}>
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={togglePlay}>
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => skipTime(10)}>
                  <SkipForward className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLiked(!liked)}
                  className={liked ? 'text-red-500' : ''}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 비디오 정보 */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className={`w-5 h-5 ${liked ? 'text-red-500 fill-current' : 'text-slate-400'}`} />
              <span className="text-sm text-slate-600">
                {video.likes || 124}명이 좋아합니다
              </span>
            </div>
            <Badge variant="secondary">{video.category || '성경 이야기'}</Badge>
            <Badge variant="outline">{video.difficulty || '초급'}</Badge>
          </div>
          <div className="text-sm text-slate-500">
            조회수 {video.views || 1234}회
          </div>
        </div>

        {/* 비디오 설명 */}
        {video.fullDescription && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium mb-2">영상 설명</h4>
            <p className="text-sm text-slate-600">{video.fullDescription}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VideoPlayer


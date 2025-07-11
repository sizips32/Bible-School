import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ChevronLeft, ChevronRight, Book, ExternalLink } from 'lucide-react'

const MainSlider = ({ slides, onSlideClick, title = "최신 슬라이드" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
      }, 5000) // 5초마다 자동 슬라이드

      return () => clearInterval(timer)
    }
  }, [slides.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  if (slides.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <Book className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">슬라이드가 없습니다</h3>
          <p className="text-slate-500">자료실에서 슬라이드를 업로드해주세요</p>
        </CardContent>
      </Card>
    )
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <Badge variant="secondary">{slides.length}개 슬라이드</Badge>
      </div>

      <Card className="relative overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-slate-100 min-h-[300px] md:min-h-[400px] lg:min-h-[600px] max-h-[80vh]">
            {/* 슬라이드 내용 */}
            <div className="absolute inset-0">
              {currentSlide.type === 'google' && currentSlide.embedUrl ? (
                // 구글 슬라이드 임베드 (aspect-ratio 내에서만 표시, 아래 텍스트 없음)
                <div className="w-full h-full flex items-center justify-center">
                  <iframe
                    src={currentSlide.embedUrl}
                    className="w-full h-full border-0 rounded-lg bg-white"
                    allowFullScreen={true}
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                    title={currentSlide.title}
                  />
                </div>
              ) : (
                // 기본 슬라이드 표시 (텍스트가 겹치지 않도록 레이아웃 보강)
                <div className="flex flex-col items-center justify-center h-full w-full p-4 md:p-8 min-h-0 max-h-full overflow-y-auto">
                  <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 shrink-0">
                    <Book className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 break-words line-clamp-2 w-full max-w-full">
                    {currentSlide.title}
                  </h3>
                  <p className="text-slate-600 mb-4 break-words line-clamp-3 w-full max-w-full">
                    {currentSlide.content || currentSlide.description || '성경 교육 슬라이드'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Badge variant="outline">
                      {currentSlide.type === 'google' ? '구글 슬라이드' : 'PPT'}
                    </Badge>
                    <Badge variant="secondary">슬라이드 {currentIndex + 1}</Badge>
                  </div>
                </div>
              )}
            </div>

            {/* 네비게이션 버튼 */}
            {slides.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white z-10 shadow-lg"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white z-10 shadow-lg"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* 인디케이터 */}
            {slides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors shadow-lg ${index === currentIndex ? 'bg-blue-500' : 'bg-white/70'
                      }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                슬라이드 {currentIndex + 1} / {slides.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MainSlider


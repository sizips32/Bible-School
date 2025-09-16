import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ChevronLeft, ChevronRight, Book, ExternalLink, Trash2 } from 'lucide-react'
import { useTranslation } from '@/lib/i18n.js'

const MainSlider = ({ slides, onSlideClick, onSlideDelete, title }) => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const slideTitle = title || t('home.slides.title')

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
          <h3 className="text-lg font-medium text-slate-600 mb-2">{t('slider.noSlides')}</h3>
          <p className="text-slate-500">{t('slider.noSlidesDescription')}</p>
        </CardContent>
      </Card>
    )
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-800">{slideTitle}</h2>
        <Badge variant="secondary">{slides.length}{t('slider.slidesCount')}</Badge>
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
                // 기본 슬라이드 표시 (개선된 미리보기)
                <div
                  className="flex flex-col items-center justify-center h-full w-full p-4 md:p-8 min-h-0 max-h-full overflow-y-auto cursor-pointer hover:bg-gradient-to-br hover:from-blue-60 hover:to-slate-200 transition-all duration-200"
                  onClick={() => onSlideClick && onSlideClick(currentSlide)}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 shrink-0 shadow-lg hover:scale-105 transition-transform duration-200">
                    <Book className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 break-words line-clamp-2 w-full max-w-full text-center">
                    {currentSlide.title}
                  </h3>
                  <p className="text-slate-600 mb-6 break-words line-clamp-3 w-full max-w-full text-center leading-relaxed">
                    {currentSlide.content || currentSlide.description || t('slider.bibleEducationSlide')}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {currentSlide.type === 'google' ? t('slider.googleSlide') : 'PowerPoint'}
                    </Badge>
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {t('slider.slideNumber')} {currentIndex + 1}
                    </Badge>
                    {currentSlide.type === 'file' && (
                      <Badge variant="outline" className="text-sm px-3 py-1 bg-green-50 text-green-700 border-green-200">
                        📎 업로드됨
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4 text-xs text-slate-500 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    클릭하여 전체 화면으로 보기
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

            {/* 삭제 버튼 (우상단) */}
            {onSlideDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-600 text-white z-20 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('이 슬라이드를 삭제하시겠습니까?')) {
                    onSlideDelete(currentSlide.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {t('slider.slideNumber')} {currentIndex + 1}{t('slider.of')}{slides.length}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onSlideClick && onSlideClick(currentSlide)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {currentSlide.type === 'google' ? t('slider.openGoogleSlide') : t('slider.viewSlide')}
                </Button>
                {onSlideDelete && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('이 슬라이드를 삭제하시겠습니까?')) {
                        onSlideDelete(currentSlide.id);
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    삭제
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MainSlider


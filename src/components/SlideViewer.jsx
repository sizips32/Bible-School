import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react'

const SlideViewer = ({ slides, title, onClose, isFullscreen }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  // 외부에서 isFullscreen props로 제어 (내부 상태 제거)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // 전체화면 토글 버튼 제거 (외부에서만 제어)

  if (slides.length === 0) return null

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 bg-black flex items-center justify-center p-0' : 'relative'}>
      <Card className={isFullscreen ? 'h-full w-full border-0 rounded-none m-0' : ''}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className={isFullscreen ? 'h-full flex flex-col p-0' : ''}>
          <div className={isFullscreen ? 'relative flex-1 bg-white flex items-center justify-center' : 'relative aspect-video bg-white rounded border flex items-center justify-center'}>
            {slides[currentSlide].type === 'google' ? (
              <iframe
                src={slides[currentSlide].url}
                className="w-full h-full rounded"
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-8">
                <h3 className="text-xl font-bold mb-4">{slides[currentSlide].title}</h3>
                <p className="text-slate-600">{slides[currentSlide].content}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" onClick={prevSlide} disabled={slides.length <= 1}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              이전
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                {currentSlide + 1} / {slides.length}
              </span>
              <div className="flex space-x-1">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id || `slide-${index}`}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-slate-300'
                      }`}
                  />
                ))}
              </div>
            </div>

            <Button variant="outline" onClick={nextSlide} disabled={slides.length <= 1}>
              다음
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SlideViewer


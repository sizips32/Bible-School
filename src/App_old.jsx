import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Book, Cross, Heart, Star, Upload, Play, Menu, X, ExternalLink } from 'lucide-react'
import logo from './assets/logo.png'
import FileUpload from './components/FileUpload.jsx'
import SlideViewer from './components/SlideViewer.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'
import './App.css'

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState('adam')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [slideUrl, setSlideUrl] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [currentSlides, setCurrentSlides] = useState([])
  const [showSlideViewer, setShowSlideViewer] = useState(false)
  const [uploadedVideos, setUploadedVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)

  // 성경 인물 데이터
  const biblicalCharacters = [
    { id: 'adam', name: '아담', period: '약 4000년 전', description: '인류의 시조. 에덴동산에서 창조됨.', verse: '창세기 2:7-8', difficulty: '하' },
    { id: 'noah', name: '노아', period: '약 3000년 전', description: '방주를 만들어 대홍수에서 구원받음.', verse: '창세기 6-9장', difficulty: '하' },
    { id: 'abraham', name: '아브라함', period: '약 2000년 전', description: '믿음의 조상. 하나님의 부르심을 받음.', verse: '창세기 12장', difficulty: '중' },
    { id: 'joseph', name: '요셉', period: '약 1800년 전', description: '꿈을 해석하고 이집트의 총리가 됨.', verse: '창세기 37-50장', difficulty: '중' },
    { id: 'moses', name: '모세', period: '약 1500년 전', description: '이스라엘 백성을 이집트에서 인도함.', verse: '출애굽기', difficulty: '중' },
    { id: 'david', name: '다윗', period: '약 1000년 전', description: '골리앗을 물리치고 이스라엘의 왕이 됨.', verse: '사무엘상 17장', difficulty: '중' },
    { id: 'daniel', name: '다니엘', period: '약 500년 전', description: '바벨론에서 하나님께 충성함.', verse: '다니엘서', difficulty: '상' }
  ]

  const currentCharacter = biblicalCharacters.find(char => char.id === selectedCharacter)

  const handleFileUpload = (files) => {
    setUploadedFiles(prev => [...prev, ...files])
    // 실제 구현에서는 여기서 파일을 서버에 업로드하고 슬라이드로 변환
    const newSlides = files.map((file, index) => ({
      id: file.id,
      title: `슬라이드 ${index + 1}`,
      content: `${file.name}에서 변환된 슬라이드입니다.`,
      type: 'file'
    }))
    setCurrentSlides(prev => [...prev, ...newSlides])
  }

  const handleVideoUpload = (files) => {
    const videoFiles = files.map(file => ({
      id: file.id,
      title: file.name.replace(/\.[^/.]+$/, ""), // 확장자 제거
      description: "업로드된 교육 영상",
      url: URL.createObjectURL(file.file), // 로컬 URL 생성
      duration: "알 수 없음",
      likes: 0,
      views: 0,
      category: "성경 이야기",
      difficulty: "초급",
      fullDescription: `${file.name} 파일에서 업로드된 교육용 영상입니다.`
    }))
    setUploadedVideos(prev => [...prev, ...videoFiles])
  }

  const playVideo = (video) => {
    setSelectedVideo(video)
    setShowVideoPlayer(true)
  }

  const sampleVideos = [
    {
      id: 'sample1',
      title: '아담과 하와 이야기',
      description: '성경 이야기 애니메이션',
      duration: '5분 32초',
      likes: 124,
      views: 1234,
      category: '성경 이야기',
      difficulty: '초급',
      fullDescription: '하나님께서 아담과 하와를 창조하시고 에덴동산에 두신 이야기를 어린이들이 쉽게 이해할 수 있도록 애니메이션으로 제작한 영상입니다.'
    },
    {
      id: 'sample2',
      title: '노아의 방주',
      description: '대홍수와 구원 이야기',
      duration: '7분 15초',
      likes: 89,
      views: 892,
      category: '성경 이야기',
      difficulty: '초급',
      fullDescription: '하나님께서 노아에게 방주를 만들라고 하시고, 대홍수에서 구원받는 이야기입니다.'
    }
  ]

  const handleSlideUrlSubmit = () => {
    if (slideUrl) {
      // 구글 슬라이드 URL을 임베드 가능한 형태로 변환
      let embedUrl = slideUrl
      if (slideUrl.includes('/edit')) {
        embedUrl = slideUrl.replace('/edit', '/embed')
      }
      
      const newSlide = {
        id: Date.now(),
        title: '구글 슬라이드',
        url: embedUrl,
        type: 'google'
      }
      setCurrentSlides(prev => [...prev, newSlide])
      setSlideUrl('')
    }
  }

  const showSlides = () => {
    if (currentSlides.length > 0) {
      setShowSlideViewer(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 슬라이드 뷰어 모달 */}
      {showSlideViewer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl h-full max-h-[90vh]">
            <SlideViewer
              slides={currentSlides}
              title="성경 교육 슬라이드"
              onClose={() => setShowSlideViewer(false)}
            />
          </div>
        </div>
      )}

      {/* 비디오 플레이어 모달 */}
      {showVideoPlayer && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <VideoPlayer
              video={selectedVideo}
              onClose={() => setShowVideoPlayer(false)}
            />
          </div>
        </div>
      )}

      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="성경 어린이 교실" className="h-10 w-10" />
              <h1 className="text-xl font-bold text-slate-800">성경 어린이 교실</h1>
            </div>
            
            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex space-x-8">
              <a href="#timeline" className="text-slate-600 hover:text-slate-900 font-medium">말씀</a>
              <a href="#slides" className="text-slate-600 hover:text-slate-900 font-medium">찬양</a>
              <a href="#videos" className="text-slate-600 hover:text-slate-900 font-medium">활동</a>
              <a href="#resources" className="text-slate-600 hover:text-slate-900 font-medium">자료실</a>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* 모바일 네비게이션 */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                <a href="#timeline" className="text-slate-600 hover:text-slate-900 font-medium py-2">말씀</a>
                <a href="#slides" className="text-slate-600 hover:text-slate-900 font-medium py-2">찬양</a>
                <a href="#videos" className="text-slate-600 hover:text-slate-900 font-medium py-2">활동</a>
                <a href="#resources" className="text-slate-600 hover:text-slate-900 font-medium py-2">자료실</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 성경 시간선 탐험 섹션 */}
        <section id="timeline" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">성경 시간선 탐험</h2>
            <p className="text-lg text-slate-600">성경의 주요 인물들을 시간순으로 만나보세요</p>
          </div>

          {/* 시간선 */}
          <div className="relative mb-8">
            <div className="flex justify-between items-center overflow-x-auto pb-4">
              {biblicalCharacters.map((character, index) => (
                <div key={character.id} className="flex flex-col items-center min-w-0 flex-1">
                  <button
                    onClick={() => setSelectedCharacter(character.id)}
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                      selectedCharacter === character.id 
                        ? 'bg-red-500 border-red-600 text-white scale-110' 
                        : 'bg-white border-slate-300 text-slate-600 hover:border-red-400'
                    }`}
                  >
                    <Book className="w-6 h-6" />
                  </button>
                  <div className="mt-2 text-center">
                    <p className="font-medium text-sm text-slate-800">{character.name}</p>
                    <p className="text-xs text-slate-500">{character.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 선택된 인물 정보 */}
          <Card className="mb-8 bg-slate-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-red-500 rounded-lg flex items-center justify-center">
                  <Book className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{currentCharacter.name}</h3>
                  <p className="text-slate-300 mb-2">{currentCharacter.period}</p>
                  <p className="text-slate-200 mb-4">{currentCharacter.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-red-600 text-white">창세기</Badge>
                    <Badge variant="outline" className="border-white text-white">첫 인간</Badge>
                    <Badge variant="outline" className="border-white text-white">에덴동산</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 퀴즈 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>나이도: 하</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-4">아담은 어디에서 창조되었나요?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['에덴동산', '예루살렘', '바벨론', '이집트'].map((option, index) => (
                  <Button 
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    className={`justify-start ${index === 0 ? 'bg-green-500 hover:bg-green-600' : ''}`}
                  >
                    {index + 1}. {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* PPT/슬라이드 섹션 */}
        <section id="slides" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">PPT 및 슬라이드 자료</h2>
            <p className="text-lg text-slate-600">성경 교육 자료를 업로드하거나 구글 슬라이드를 연결하세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 파일 업로드 */}
            <FileUpload
              title="PPT 파일 업로드"
              description="PowerPoint 파일을 업로드하여 웹에서 바로 확인하세요"
              acceptedTypes=".ppt,.pptx"
              maxSize={50}
              onFileUpload={handleFileUpload}
            />

            {/* 구글 슬라이드 연결 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="w-5 h-5" />
                  <span>구글 슬라이드 연결</span>
                </CardTitle>
                <CardDescription>
                  구글 슬라이드 URL을 입력하여 바로 표시하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">구글 슬라이드 URL</label>
                    <Input
                      type="url"
                      placeholder="https://docs.google.com/presentation/d/..."
                      value={slideUrl}
                      onChange={(e) => setSlideUrl(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleSlideUrlSubmit}>
                    슬라이드 연결하기
                  </Button>
                </div>

                {slideUrl && (
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium mb-2">미리보기</h4>
                    <div className="aspect-video bg-white rounded border flex items-center justify-center">
                      <p className="text-slate-500">구글 슬라이드 미리보기</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 슬라이드 뷰어 버튼 */}
          {currentSlides.length > 0 && (
            <div className="mt-8 text-center">
              <Button onClick={showSlides} size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="w-5 h-5 mr-2" />
                슬라이드 보기 ({currentSlides.length}개)
              </Button>
            </div>
          )}
        </section>

        {/* 영상 섹션 */}
        <section id="videos" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">교육 영상</h2>
            <p className="text-lg text-slate-600">성경 이야기를 영상으로 만나보세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 영상 업로드 */}
            <FileUpload
              title="영상 업로드"
              description="교육용 영상을 업로드하여 학생들과 공유하세요"
              acceptedTypes=".mp4,.mov,.avi"
              maxSize={500}
              onFileUpload={handleVideoUpload}
            />

            {/* 영상 플레이어 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>추천 영상</span>
                </CardTitle>
                <CardDescription>
                  성경 이야기 애니메이션
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center mb-4 cursor-pointer hover:bg-slate-800 transition-colors"
                  onClick={() => playVideo(sampleVideos[0])}
                >
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
                    <p className="text-lg font-medium">아담과 하와 이야기</p>
                    <p className="text-sm opacity-70">5분 32초</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-slate-600">124명이 좋아합니다</span>
                  </div>
                  <Button size="sm" onClick={() => playVideo(sampleVideos[0])}>
                    재생하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 영상 갤러리 */}
          {(uploadedVideos.length > 0 || sampleVideos.length > 1) && (
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">영상 갤러리</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 업로드된 영상들 */}
                {uploadedVideos.map((video) => (
                  <Card key={video.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div 
                        className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center mb-3"
                        onClick={() => playVideo(video)}
                      >
                        <Play className="w-12 h-12 text-white opacity-70" />
                      </div>
                      <h4 className="font-medium mb-1">{video.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{video.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{video.category}</Badge>
                        <Button size="sm" variant="outline" onClick={() => playVideo(video)}>
                          재생
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* 샘플 영상들 (첫 번째 제외) */}
                {sampleVideos.slice(1).map((video) => (
                  <Card key={video.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div 
                        className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center mb-3"
                        onClick={() => playVideo(video)}
                      >
                        <Play className="w-12 h-12 text-white opacity-70" />
                      </div>
                      <h4 className="font-medium mb-1">{video.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{video.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{video.category}</Badge>
                        <Button size="sm" variant="outline" onClick={() => playVideo(video)}>
                          재생
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>

      </main>

      {/* 푸터 */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="성경 어린이 교실" className="h-8 w-8" />
                <h3 className="text-lg font-bold">성경 어린이 교실</h3>
              </div>
              <p className="text-slate-300">
                초중학생을 위한 성경 교육 플랫폼으로, 
                하나님의 말씀을 재미있고 쉽게 배울 수 있도록 도와드립니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">메뉴</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#timeline" className="hover:text-white">말씀</a></li>
                <li><a href="#slides" className="hover:text-white">찬양</a></li>
                <li><a href="#videos" className="hover:text-white">활동</a></li>
                <li><a href="#resources" className="hover:text-white">자료실</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">연락처</h4>
              <div className="text-slate-300 space-y-2">
                <p>이메일: info@biblechildren.com</p>
                <p>전화: 02-1234-5678</p>
                <div className="flex items-center space-x-2 mt-4">
                  <Cross className="w-5 h-5" />
                  <span>하나님의 사랑으로</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 성경 어린이 교실. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


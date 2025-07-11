import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Book, Cross, Heart, Star, Upload, Play, Menu, X, ExternalLink, Youtube, Moon, Sun } from 'lucide-react'
import logo from './assets/logo.png'
import SlideViewer from './components/SlideViewer.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'
import ResourcesPage from './components/ResourcesPage.jsx'
import MainSlider from './components/MainSlider.jsx'
import MainVideoGallery from './components/MainVideoGallery.jsx'
import QuizGames from './components/QuizGames.jsx'
import './App.css'

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState('adam')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [slideUrl, setSlideUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [currentSlides, setCurrentSlides] = useState([])
  const [showSlideViewer, setShowSlideViewer] = useState(false)
  const [selectedSlide, setSelectedSlide] = useState(null)
  const [uploadedVideos, setUploadedVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 앱 시작 시 localStorage에서 업로드된 영상 불러오기
  useEffect(() => {
    const savedVideos = localStorage.getItem('uploadedVideos')
    if (savedVideos) {
      setUploadedVideos(JSON.parse(savedVideos))
    }
    // eslint-disable-next-line
  }, []) // 반드시 []로 고정

  // 업로드된 영상이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('uploadedVideos', JSON.stringify(uploadedVideos))
  }, [uploadedVideos])

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
    const newSlides = files.map((file, index) => ({
      id: `file_${Date.now()}_${index}`,
      title: file.name.replace(/\.[^/.]+$/, ""),
      content: `${file.name}에서 변환된 슬라이드입니다.`,
      type: 'file',
      description: 'PPT 파일에서 변환됨'
    }))
    setCurrentSlides(prev => [...prev, ...newSlides])
  }

  const handleVideoUpload = (files) => {
    const videoFiles = files.map(file => ({
      id: `video_${Date.now()}_${Math.random()}`,
      title: file.name.replace(/\.[^/.]+$/, ""),
      description: '업로드된 교육 영상입니다.',
      category: '성경 이야기',
      duration: '미정',
      likes: 0,
      type: 'file',
      file: file,
      url: URL.createObjectURL(file) // url 속성 추가
    }))
    setUploadedVideos(prev => [...prev, ...videoFiles])
  }

  const handleSlideUrlSubmit = () => {
    if (slideUrl.trim()) {
      // 구글 슬라이드 URL에서 ID 추출
      const slideId = extractGoogleSlideId(slideUrl)
      let embedUrl = slideUrl

      // 구글 슬라이드 URL인 경우 임베드 URL로 변환
      if (slideId) {
        embedUrl = `https://docs.google.com/presentation/d/${slideId}/embed?start=false&loop=false&delayms=3000`
      }

      const newSlide = {
        id: `google_${Date.now()}`,
        title: '구글 슬라이드',
        content: slideUrl,
        type: 'google',
        description: '구글 슬라이드에서 연결됨',
        slideId: slideId,
        embedUrl: embedUrl
      }
      setCurrentSlides(prev => [...prev, newSlide])
      setSlideUrl('')
    }
  }

  // 구글 슬라이드 URL에서 ID 추출하는 함수
  const extractGoogleSlideId = (url) => {
    const match = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/)
    return match ? match[1] : null
  }

  const handleYoutubeUrlSubmit = () => {
    if (youtubeUrl.trim()) {
      const newVideo = {
        id: `youtube_${Date.now()}`,
        title: '유튜브 영상',
        description: '유튜브에서 연결된 영상입니다.',
        category: '성경 이야기',
        duration: '미정',
        likes: 0,
        type: 'youtube',
        url: youtubeUrl
      }
      setUploadedVideos(prev => [...prev, newVideo])
      setYoutubeUrl('')
    }
  }

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide)
    setShowSlideViewer(true)
  }

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
    setShowVideoPlayer(true)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const menuItems = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'word', label: '말씀', icon: '📖' },
    { id: 'praise', label: '찬양', icon: '🎵' },
    { id: 'activity', label: '활동', icon: '🎯' },
    { id: 'resources', label: '자료실', icon: '📚' }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-900' : 'bg-gray-50'}`}>
      {/* 슬라이드 뷰어 모달 */}
      {showSlideViewer && selectedSlide && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <SlideViewer
              slides={[selectedSlide]}
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
      <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="성경 어린이 교실" className="w-8 h-8" />
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                성경 어린이 교실
              </h1>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === item.id
                    ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-blue-100 text-blue-700'
                    : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* 다크모드 토글 및 모바일 메뉴 */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* 모바일 네비게이션 */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === item.id
                      ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-blue-100 text-blue-700'
                      : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                      }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <div className="space-y-12">
            {/* 성경 시간선 탐험 섹션 */}
            <section>
              <div className="text-center mb-8">
                <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  성경 시간선 탐험
                </h2>
                <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  성경의 주요 인물들을 시간순으로 만나보세요
                </p>
              </div>

              {/* 인물 선택 */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {biblicalCharacters.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => setSelectedCharacter(character.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedCharacter === character.id
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : isDarkMode ? 'border-slate-600 bg-slate-800 hover:border-slate-500' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${selectedCharacter === character.id ? 'bg-red-500' : isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                      }`}>
                      <Book className={`w-8 h-8 ${selectedCharacter === character.id ? 'text-white' : isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} />
                    </div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {character.name}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {character.period}
                    </div>
                  </button>
                ))}
              </div>

              {/* 선택된 인물 정보 */}
              <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-800'} text-white`}>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                      <Book className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{currentCharacter.name}</h3>
                      <p className="text-slate-300">{currentCharacter.period}</p>
                      <p className="text-slate-400">{currentCharacter.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-red-600 hover:bg-red-700">
                      창세기
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
                      첫 인간
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
                      에덴동산
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 최신 영상 섹션 */}
            <section>
              <MainVideoGallery
                videos={uploadedVideos}
                onVideoClick={handleVideoClick}
                title="최신 영상"
              />
            </section>

            {/* 최신 슬라이드 섹션 */}
            <section>
              <MainSlider
                slides={currentSlides}
                onSlideClick={handleSlideClick}
                title="최신 슬라이드"
              />
            </section>

            {/* 퀴즈 게임 섹션 */}
            <section>
              <QuizGames
                uploadedSlides={currentSlides}
                uploadedVideos={uploadedVideos}
                youtubeVideos={uploadedVideos.filter(v => v.type === 'youtube')}
              />
            </section>
          </div>
        )}

        {currentPage === 'resources' && (
          <ResourcesPage
            onFileUpload={handleFileUpload}
            onVideoUpload={handleVideoUpload}
            onSlideUrlSubmit={handleSlideUrlSubmit}
            onYoutubeUrlSubmit={handleYoutubeUrlSubmit}
            uploadedFiles={uploadedFiles}
            uploadedVideos={uploadedVideos}
            currentSlides={currentSlides}
            slideUrl={slideUrl}
            setSlideUrl={setSlideUrl}
            youtubeUrl={youtubeUrl}
            setYoutubeUrl={setYoutubeUrl}
          />
        )}

        {currentPage === 'word' && (
          <div className="text-center py-16">
            <Book className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>말씀 페이지</h2>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>곧 업데이트 예정입니다</p>
          </div>
        )}

        {currentPage === 'praise' && (
          <div className="text-center py-16">
            <div className={`text-4xl mb-4`}>🎵</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>찬양 페이지</h2>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>곧 업데이트 예정입니다</p>
          </div>
        )}

        {currentPage === 'activity' && (
          <div className="text-center py-16">
            <div className={`text-4xl mb-4`}>🎯</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>활동 페이지</h2>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>곧 업데이트 예정입니다</p>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-800'} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={logo} alt="성경 어린이 교실" className="w-8 h-8" />
                <h3 className="text-xl font-bold">성경 어린이 교실</h3>
              </div>
              <p className="text-slate-300">
                초중학생을 위한 성경 교육 플랫폼으로,
                하나님의 말씀을 재미있고 쉽게 배울 수
                있도록 도와드립니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">메뉴</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-400 hover:text-blue-300">📖 말씀</a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-300">🎵 찬양</a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-300">🎯 활동</a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-300">📚 자료실</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">연락처</h4>
              <div className="space-y-2">
                <p>이메일: info@biblechildren.com</p>
                <p>전화: 02-1234-5678</p>
                <div className="flex items-center space-x-2 mt-4">
                  <Cross className="w-4 h-4" />
                  <span>하나님의 사랑으로</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">© 2024 성경 어린이 교실. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


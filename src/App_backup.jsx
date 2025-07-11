import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Book, Cross, Heart, Star, Upload, Play, Menu, X, ExternalLink } from 'lucide-react'
import logo from './assets/logo.png'
import FileUpload from './components/FileUpload.jsx'
import SlideViewer from './components/SlideViewer.jsx'
import './App.css'

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState('adam')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [slideUrl, setSlideUrl] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [currentSlides, setCurrentSlides] = useState([])
  const [showSlideViewer, setShowSlideViewer] = useState(false)
  const [uploadedVideos, setUploadedVideos] = useState([])

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

  const quizQuestions = [
    { question: '아담은 어디에서 창조되었나요?', options: ['에덴동산', '예루살렘', '바벨론', '이집트'], answer: 0 },
    { question: '노아가 만든 것은 무엇인가요?', options: ['성전', '방주', '성벽', '우물'], answer: 1 },
    { question: '다윗이 물리친 거인의 이름은?', options: ['사울', '골리앗', '압살롬', '요나단'], answer: 1 }
  ]

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
    setUploadedVideos(prev => [...prev, ...files])
  }

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
                  {index < biblicalCharacters.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-slate-300 -z-10" 
                         style={{transform: `translateX(${(100 / biblicalCharacters.length) * (index + 0.5)}%)`}} />
                  )}
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>PPT 파일 업로드</span>
                </CardTitle>
                <CardDescription>
                  PowerPoint 파일을 업로드하여 웹에서 바로 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">파일을 드래그하여 놓거나 클릭하여 선택하세요</p>
                  <p className="text-sm text-slate-500 mb-4">지원 형식: .ppt, .pptx (최대 50MB)</p>
                  <input
                    type="file"
                    accept=".ppt,.pptx"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      파일 선택
                    </Button>
                  </label>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">업로드된 파일:</h4>
                    <ul className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <Book className="w-4 h-4 text-blue-500" />
                          <span>{file.name}</span>
                          <Badge variant="secondary">업로드 완료</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

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
                  <Button className="w-full">
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
        </section>

        {/* 영상 섹션 */}
        <section id="videos" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">교육 영상</h2>
            <p className="text-lg text-slate-600">성경 이야기를 영상으로 만나보세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 영상 업로드 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>영상 업로드</span>
                </CardTitle>
                <CardDescription>
                  교육용 영상을 업로드하여 학생들과 공유하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
                  <Play className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">영상 파일을 드래그하여 놓거나 클릭하여 선택하세요</p>
                  <p className="text-sm text-slate-500 mb-4">지원 형식: .mp4, .mov, .avi (최대 500MB)</p>
                  <Button variant="outline">
                    영상 선택
                  </Button>
                </div>
              </CardContent>
            </Card>

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
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center mb-4">
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
                  <Button size="sm">
                    전체화면
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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


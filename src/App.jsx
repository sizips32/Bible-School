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
import BibleExplorer from './components/BibleExplorer.jsx'
import SDADoctrines from './components/SDADoctrines.jsx'
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
  const [slideViewerFullscreen, setSlideViewerFullscreen] = useState(false)
  const [uploadedVideos, setUploadedVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [quizText, setQuizText] = useState('')
  const [quizPrompt, setQuizPrompt] = useState(`아래 텍스트를 3가지 퀴즈 유형별로 각각 7문제씩, 쉬운 난이도의 4지 선다형 객관식으로 만들어줘.\n각 문제는 반드시 question(문제), options(4개 배열), answer(정답 문자열) 필드를 포함해야 해.\n\n1. 카드 뒤집기: 구절과 출처를 매칭하는 문제\n2. 순서 기억: 구절의 단어들이 섞여있을 때 올바른 순서로 배열하는 문제 (단어들을 쉼표로 구분하여 제시)\n3. 구절 맞추기: 구절에서 중요한 단어나 구를 빈칸으로 바꿔서 빈칸 채우기 문제\n\n문제 생성 규칙:\n- 각 유형별로 서로 다른 구절이나 내용을 사용하여 중복을 피하라\n- 카드 뒤집기: 구절과 출처 매칭에 집중\n- 순서 기억: 원본 구절의 단어들을 섞어서 쉼표로 구분하여 제시하고, 올바른 순서의 구절을 선택하도록 함\n- 구절 맞추기: 핵심 단어나 구를 빈칸으로 만들고, 의미상 적절한 4개 옵션 제공\n- 모든 선택지는 의미있고 혼동할 수 있는 내용으로 구성\n- 같은 구절을 여러 유형에서 사용하지 말고, 각 유형마다 다른 구절이나 관점으로 문제를 만들어라\n\n입력 예시:\n태초에 하나님이 천지를 창조하시니라|창세기 1:1\n모세의 아내는 십보라야|출애굽기 2:21\n하나님이 아브라함을 부르셨다|창세기 12:1\n\n출력 예시(JSON, 반드시 JSON만 반환):\n{\n  \"cardFlip\": [{\"question\": \"태초에 하나님이 천지를 창조하시니라의 출처는?\", \"options\": [\"창세기 1:1\", \"요한복음 3:16\", \"시편 23:1\", \"마태복음 5:9\"], \"answer\": \"창세기 1:1\"}],\n  \"wordOrder\": [{\"question\": \"다음 단어들을 올바른 순서로 배열하세요: 아브라함을, 부르셨다, 하나님이\", \"options\": [\"하나님이 아브라함을 부르셨다\", \"아브라함을 하나님이 부르셨다\", \"부르셨다 하나님이 아브라함을\", \"하나님이 부르셨다 아브라함을\"], \"answer\": \"하나님이 아브라함을 부르셨다\"}],\n  \"fillBlank\": [{\"question\": \"모세의 아내는 ___야\", \"options\": [\"십보라\", \"라헬\", \"사라\", \"리브가\"], \"answer\": \"십보라\"}]\n}`)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizAIQuestions, setQuizAIQuestions] = useState({ cardFlip: [], wordOrder: [], fillBlank: [] })
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  // YouTube API 키 (실제 사용시 환경변수로 관리)
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY' // 실제 API 키로 교체 필요

  // 앱 시작 시 localStorage에서 업로드된 영상과 슬라이드 불러오기
  useEffect(() => {
    const savedVideos = localStorage.getItem('uploadedVideos')
    if (savedVideos) {
      setUploadedVideos(JSON.parse(savedVideos))
    }

    const savedSlides = localStorage.getItem('currentSlides')
    if (savedSlides) {
      setCurrentSlides(JSON.parse(savedSlides))
    }
    // eslint-disable-next-line
  }, []) // 반드시 []로 고정

  // 업로드된 영상이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('uploadedVideos', JSON.stringify(uploadedVideos))
  }, [uploadedVideos])

  // 슬라이드가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('currentSlides', JSON.stringify(currentSlides))
    // 개발용: 슬라이드 개수 확인
    console.log('현재 슬라이드 개수:', currentSlides.length)
    console.log('슬라이드 데이터:', currentSlides)
  }, [currentSlides])

  // YouTube URL에서 영상 ID 추출하는 함수
  const extractYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  // YouTube API를 사용하여 영상 정보 가져오기
  const fetchYouTubeVideoInfo = async (videoId) => {
    // API 키가 없으면 기본 정보만 반환
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
      return {
        title: '유튜브 영상',
        description: '유튜브에서 연결된 영상입니다.',
        duration: '미정',
        thumbnail: null
      }
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails`
      )
      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const videoInfo = data.items[0]
        return {
          title: videoInfo.snippet.title,
          description: videoInfo.snippet.description,
          duration: videoInfo.contentDetails.duration,
          thumbnail: videoInfo.snippet.thumbnails.medium.url
        }
      }
      return null
    } catch (error) {
      console.error('YouTube API 호출 중 오류:', error)
      // API 호출 실패시 기본 정보 반환
      return {
        title: '유튜브 영상',
        description: '유튜브에서 연결된 영상입니다.',
        duration: '미정',
        thumbnail: null
      }
    }
  }

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

  const handleYoutubeUrlSubmit = async () => {
    if (youtubeUrl.trim()) {
      const videoId = extractYouTubeVideoId(youtubeUrl)
      if (!videoId) {
        alert('유튜브 URL이 올바르지 않습니다.')
        return
      }

      const videoInfo = await fetchYouTubeVideoInfo(videoId)
      if (!videoInfo) {
        alert('유튜브 영상 정보를 가져올 수 없습니다.')
        return
      }

      const newVideo = {
        id: `youtube_${Date.now()}`,
        title: videoInfo.title,
        description: videoInfo.description,
        category: '성경 이야기',
        duration: videoInfo.duration,
        likes: 0,
        type: 'youtube',
        url: youtubeUrl,
        thumbnail: videoInfo.thumbnail,
        videoId: videoId // 영상 ID 저장
      }
      setUploadedVideos(prev => [...prev, newVideo])
      setYoutubeUrl('')
    }
  }

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide)
    setShowSlideViewer(true)
    setSlideViewerFullscreen(true)
  }

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
    setShowVideoPlayer(true)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // 퀴즈 텍스트 입력 핸들러
  const handleQuizTextChange = (e) => {
    setQuizText(e.target.value)
  }

  // 퀴즈 생성 핸들러: 텍스트를 문제/정답 배열로 파싱
  const handleQuizCreate = () => {
    // 각 줄을 문제로, |로 구분 (문제|정답)
    const questions = quizText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const [question, answer] = line.split('|').map(s => s.trim())
        return { question, answer }
      })
      .filter(q => q.question && q.answer)
    setQuizQuestions(questions)
  }

  const handleQuizPromptChange = (e) => {
    setQuizPrompt(e.target.value)
  }

  // 슬라이드 데이터 초기화 (개발용)
  const clearSlides = () => {
    setCurrentSlides([])
    localStorage.removeItem('currentSlides')
  }

  // AI로 퀴즈 생성 핸들러
  const handleAIGenerateQuiz = async () => {
    setAiLoading(true)
    setAiError('')
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`
      const prompt = `${quizPrompt}\n\n아래 입력을 변환:\n${quizText}\n\n각 유형별로 반드시 7문제씩, 각 문제는 쉬운 난이도의 4지 선다형 객관식으로 만들어 JSON만 반환해줘.\n중요: 각 유형별로 서로 다른 구절이나 내용을 사용하여 중복을 피하라.`
      const body = { contents: [{ parts: [{ text: prompt }] }] }
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      // Gemini 응답에서 JSON 파싱
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (!text) throw new Error('AI 응답이 비어 있습니다.')
      // 코드블록 제거 및 JSON 블록만 추출
      let jsonText = text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```/, '').replace(/```$/, '').trim();
      }
      const match = jsonText.match(/{[\s\S]*}/);
      if (!match) throw new Error('AI 응답에서 JSON을 찾을 수 없습니다. 원본: ' + jsonText);
      const aiQuiz = JSON.parse(match[0]);
      setQuizAIQuestions({
        cardFlip: aiQuiz.cardFlip || [],
        wordOrder: aiQuiz.wordOrder || [],
        fillBlank: aiQuiz.fillBlank || []
      })
    } catch (e) {
      setAiError('AI 퀴즈 생성 실패: ' + (e.message || e))
    } finally {
      setAiLoading(false)
    }
  }

  const menuItems = [
    { id: 'home', label: '홈', icon: '🏠' },
    { id: 'word', label: '말씀', icon: '📖' },
    { id: 'doctrine', label: '교리', icon: '⛪' },
    { id: 'prophecy', label: '예언의 신', icon: '🕊️' },
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
              isFullscreen={slideViewerFullscreen}
              onClose={() => {
                setShowSlideViewer(false)
                setSlideViewerFullscreen(false)
              }}
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
              <img src={logo} alt="BIBLE SCHOOL" className="w-8 h-8" />
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                BIBLE SCHOOL
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
                <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>성경 시간선 탐험</h2>
                <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>성경의 주요 인물들을 시간순으로 만나보세요</p>
              </div>

              {/* 인물 선택 */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {biblicalCharacters.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => setSelectedCharacter(character.id)}
                    className={`group p-5 rounded-2xl border-2 shadow-lg transition-all duration-200 cursor-pointer relative bg-gradient-to-br 
                      ${selectedCharacter === character.id
                        ? 'from-pink-400 to-red-400 border-red-500 scale-105'
                        : isDarkMode
                          ? 'from-slate-700 to-slate-900 border-slate-600 hover:from-pink-200 hover:to-red-200 hover:border-pink-400'
                          : 'from-white to-slate-100 border-gray-200 hover:from-pink-100 hover:to-red-100 hover:border-pink-400'}
                    `}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-md transition-all duration-200 
                      ${selectedCharacter === character.id ? 'bg-red-500 scale-110' : isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}
                    >
                      <Book className={`w-8 h-8 ${selectedCharacter === character.id ? 'text-white' : isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} />
                    </div>
                    <div className={`text-base font-bold ${selectedCharacter === character.id ? 'text-white drop-shadow' : isDarkMode ? 'text-white' : 'text-slate-800'}`}>{character.name}</div>
                    <div className={`text-xs ${selectedCharacter === character.id ? 'text-pink-100' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{character.period}</div>
                  </button>
                ))}
              </div>

              {/* 선택된 인물 정보 */}
              <div className="flex justify-center">
                <div className={`w-full max-w-2xl rounded-3xl shadow-2xl p-8 border-2 bg-gradient-to-br 
                  ${isDarkMode ? 'from-slate-800 to-slate-900 border-slate-700' : 'from-pink-100 to-red-100 border-pink-200'}`}
                >
                  {currentCharacter ? (
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center shadow-lg mb-4 md:mb-0">
                        <Book className="w-12 h-12 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-extrabold mb-2 text-red-600">{currentCharacter.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="inline-block bg-white/70 text-red-600 px-3 py-1 rounded-full text-xs font-semibold shadow">{currentCharacter.period}</span>
                          <span className="inline-block bg-white/70 text-pink-600 px-3 py-1 rounded-full text-xs font-semibold shadow">난이도: {currentCharacter.difficulty}</span>
                          <span className="inline-block bg-white/70 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold shadow">{currentCharacter.verse}</span>
                        </div>
                        <p className="text-base text-slate-700 dark:text-slate-200 mb-2">{currentCharacter.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400">인물을 선택하세요</div>
                  )}
                </div>
              </div>
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
                slides={currentSlides.filter(slide => slide.type === 'file' || slide.type === 'google')}
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
                quizQuestions={quizQuestions}
                aiQuestions={quizAIQuestions}
              />
            </section>

            {/* 십계명 섹션 */}
            <section>
              <div className="text-center mb-8">
                <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>하나님의 십계명</h2>
                <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>시내산에서 모세에게 주신 하나님의 말씀</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 첫 번째 돌비 */}
                <div className={`rounded-2xl shadow-2xl p-8 border-2 bg-gradient-to-br ${isDarkMode ? 'from-amber-900 to-yellow-800 border-amber-700' : 'from-amber-100 to-yellow-100 border-amber-300'}`}>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-amber-700' : 'bg-amber-500'} flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl">📜</span>
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>첫 번째 돌비</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>하나님과의 관계 (1-4계명)</p>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>1</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>나 외에는 다른 신들을 네게 있게 말지 말라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>하나님만을 섬기고 다른 신을 섬기지 말라</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>2</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>너를 위하여 새긴 우상을 만들지 말라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>우상을 만들거나 섬기지 말라</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>3</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>너의 하나님 여호와의 이름을 망령되이 일컫지 말라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>하나님의 이름을 함부로 사용하지 말라</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>4</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>안식일을 기억하여 거룩하게 지키라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>일곱째 날을 거룩하게 지켜라</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 두 번째 돌비 */}
                <div className={`rounded-2xl shadow-2xl p-8 border-2 bg-gradient-to-br ${isDarkMode ? 'from-amber-900 to-yellow-800 border-amber-700' : 'from-amber-100 to-yellow-100 border-amber-300'}`}>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-amber-700' : 'bg-amber-500'} flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl">📜</span>
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>두 번째 돌비</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>이웃과의 관계 (5-10계명)</p>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>5</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>네 부모를 공경하라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>부모를 존경하고 순종하라</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>6</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>살인하지 말라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>사람의 생명을 해치지 말라</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>7</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>간음하지 말라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>순결한 삶을 살라</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>8</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>도적질하지 말라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>남의 것을 훔치지 말라</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>9</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>네 이웃에 대하여 거짓 증거하지 말라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>거짓말하지 말라</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>10</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>네 이웃의 것을 탐내지 말라</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>남의 것을 부러워하지 말라</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  출애굽기 20:1-17 | 시내산에서 모세에게 주신 하나님의 말씀
                </p>
              </div>
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
            quizText={quizText}
            quizPrompt={quizPrompt}
            onQuizPromptChange={handleQuizPromptChange}
            onQuizTextChange={handleQuizTextChange}
            onQuizCreate={handleQuizCreate}
            onAIGenerateQuiz={handleAIGenerateQuiz}
            aiLoading={aiLoading}
            aiError={aiError}
          />
        )}

        {currentPage === 'word' && (
          <BibleExplorer isDarkMode={isDarkMode} />
        )}

        {currentPage === 'doctrine' && (
          <SDADoctrines isDarkMode={isDarkMode} />
        )}

        {currentPage === 'prophecy' && (
          <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>예언의 신</h2>
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>엘렌 G. 화잇의 생애와 주요 저서를 소개합니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-1 flex justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Ellen_G_White_c_1899.jpg/800px-Ellen_G_White_c_1899.jpg" alt="엘렌 G. 화잇" className="rounded-lg shadow-md"/>
              </div>
              <div className="md:col-span-2">
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>엘렌 G. 화잇 (Ellen G. White)</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  엘렌 G. 화잇(1827-1915)은 제칠일안식일예수재림교회의 초기 개척자 중 한 명으로, 하나님으로부터 2,000번 이상의 환상과 꿈을 통해 영감적인 기별을 받았습니다. 그녀는 성경 주석, 교육, 건강, 가정 등 다양한 주제에 걸쳐 40권 이상의 책과 5,000개 이상의 기사를 저술했습니다. 그녀의 저작들은 전 세계적으로 수많은 사람들에게 영적인 통찰과 인도를 제공하고 있습니다.
                </p>
                <Button variant="outline" onClick={() => window.open('https://www.whiteestate.org/', '_blank')}>
                  더 알아보기 <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>대쟁투 총서 (The Great Controversy Series)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { title: '부조와 선지자', description: '세상의 시작부터 다윗의 통치까지' },
                  { title: '선지자와 왕', description: '솔로몬의 통치부터 이스라엘의 멸망까지' },
                  { title: '시대의 소망', description: '예수 그리스도의 생애와 사역' },
                  { title: '사도행적', description: '초대 교회의 역사와 사도들의 활동' },
                  { title: '각 시대의 대쟁투', description: '선과 악의 마지막 대결과 미래' },
                ].map((book, index) => (
                  <Card key={index} className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <img src={`https://via.placeholder.com/150x200.png?text=${book.title}`} alt={book.title} className="rounded-t-lg"/>
                    <CardHeader>
                      <CardTitle className={`${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{book.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{book.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-800'} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={logo} alt="BIBLE SCHOOL" className="w-8 h-8" />
                <h3 className="text-xl font-bold">BIBLE SCHOOL</h3>
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
                <li><a href="#" className="text-blue-400 hover:text-blue-300">⛪ 교리</a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-300">🕊️ 예언의 신</a></li>
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
            <p className="text-slate-400">© 2025 BIBLE SCHOOL. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


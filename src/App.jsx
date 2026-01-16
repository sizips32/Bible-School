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
import SpiritOfProphecy from './components/SpiritOfProphecy.jsx';
import MeditationPage from './components/MeditationPage.jsx';
import SanctuaryPage from './components/SanctuaryPage.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import './App.css'
import { saveToLocalStorage, loadFromLocalStorage, generateId } from './lib/localStorage';
import { useTranslation } from './lib/i18n.js';

function App() {
  const { language, changeLanguage, t } = useTranslation()
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
  const [quizPrompt, setQuizPrompt] = useState(`아래 텍스트를 3가지 퀴즈 유형별로 각각 7문제씩, 쉬운 난이도의 4지 선다형 객관식으로 만들어줘.\n각 문제는 반드시 question(문제), options(4개 배열), answer(정답 문자열) 필드를 포함해야 해.\n\n1. 카드 뒤집기: 퀴즈 내용에서 문제를 상/중/하로 분류하여 각각 문제를 만들기\n2. 순서 기억: 퀴즈의 내용이 섞여있을 때 올바른 순서로 배열하는 문제 (단어들을 쉼표로 구분하여 제시)\n3. 구절 맞추기: 퀴즈 내용에서 중요한 단어나 구를 빈칸으로 바꿔서 빈칸 채우기 문제\n\n문제 생성 규칙:\n- 각 유형별로 서로 다른 퀴즈 내용을 사용하여 중복을 피하라\n- 카드 뒤집기: 퀴즈 내용과 정답 매칭에 집중\n- 순서 기억: 퀴즈 내용의 단어들을 섞어서 쉼표로 구분하여 제시하고, 올바른 순서의 내용을 선택하도록 함\n- 구절 맞추기: 핵심 단어나 구를 빈칸으로 만들고, 의미상 적절한 4개 옵션 제공\n- 모든 선택지는 의미있고 혼동할 수 있는 내용으로 구성\n- 같은 구절을 여러 유형에서 사용하지 말고, 각 유형마다 다른 퀴즈 내용이나 관점으로 문제를 만들어라\n\n입력 예시:\n태초에 하나님이 천지를 창조하시니라|창세기 1:1\n모세의 아내는 십보라야|출애굽기 2:21\n하나님이 아브라함을 부르셨다|창세기 12:1\n\n출력 예시(JSON, 반드시 JSON만 반환):\n{\n  \"cardFlip\": [{\"question\": \"태초에 하나님이 천지를 창조하시니라의 출처는?\", \"options\": [\"창세기 1:1\", \"요한복음 3:16\", \"시편 23:1\", \"마태복음 5:9\"], \"answer\": \"창세기 1:1\"}],\n  \"wordOrder\": [{\"question\": \"다음 단어들을 올바른 순서로 배열하세요: 아브라함을, 부르셨다, 하나님이\", \"options\": [\"하나님이 아브라함을 부르셨다\", \"아브라함을 하나님이 부르셨다\", \"부르셨다 하나님이 아브라함을\", \"하나님이 부르셨다 아브라함을\"], \"answer\": \"하나님이 아브라함을 부르셨다\"}],\n  \"fillBlank\": [{\"question\": \"모세의 아내는 ___야\", \"options\": [\"십보라\", \"라헬\", \"사라\", \"리브가\"], \"answer\": \"십보라\"}]\n}`)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizAIQuestions, setQuizAIQuestions] = useState({ cardFlip: [], wordOrder: [], fillBlank: [] })
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [savedQuizzes, setSavedQuizzes] = useState([]) // 저장된 퀴즈 목록

  // YouTube API 키 (환경변수로 관리)
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

  // 앱 시작 시 localStorage에서 자료 불러오기
  useEffect(() => {
    setUploadedVideos(loadFromLocalStorage('uploadedVideos'));
    setCurrentSlides(loadFromLocalStorage('currentSlides'));
    setSavedQuizzes(loadFromLocalStorage('savedQuizzes'));
  }, []);

  // 업로드된 영상이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    saveToLocalStorage('uploadedVideos', uploadedVideos);
  }, [uploadedVideos]);

  // 슬라이드가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    saveToLocalStorage('currentSlides', currentSlides);
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
    if (!YOUTUBE_API_KEY) {
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

  // 성경 인물 데이터 (다국어 지원)
  const getBiblicalCharacters = () => [
    {
      id: 'adam',
      name: t('home.charactersDetails.adam.name'),
      period: t('home.charactersDetails.adam.period'),
      description: t('home.charactersDetails.adam.description'),
      verse: t('home.charactersDetails.adam.verse'),
      difficulty: t('home.charactersDetails.adam.difficulty')
    },
    {
      id: 'noah',
      name: t('home.charactersDetails.noah.name'),
      period: t('home.charactersDetails.noah.period'),
      description: t('home.charactersDetails.noah.description'),
      verse: t('home.charactersDetails.noah.verse'),
      difficulty: t('home.charactersDetails.noah.difficulty')
    },
    {
      id: 'abraham',
      name: t('home.charactersDetails.abraham.name'),
      period: t('home.charactersDetails.abraham.period'),
      description: t('home.charactersDetails.abraham.description'),
      verse: t('home.charactersDetails.abraham.verse'),
      difficulty: t('home.charactersDetails.abraham.difficulty')
    },
    {
      id: 'joseph',
      name: t('home.charactersDetails.joseph.name'),
      period: t('home.charactersDetails.joseph.period'),
      description: t('home.charactersDetails.joseph.description'),
      verse: t('home.charactersDetails.joseph.verse'),
      difficulty: t('home.charactersDetails.joseph.difficulty')
    },
    {
      id: 'moses',
      name: t('home.charactersDetails.moses.name'),
      period: t('home.charactersDetails.moses.period'),
      description: t('home.charactersDetails.moses.description'),
      verse: t('home.charactersDetails.moses.verse'),
      difficulty: t('home.charactersDetails.moses.difficulty')
    },
    {
      id: 'david',
      name: t('home.charactersDetails.david.name'),
      period: t('home.charactersDetails.david.period'),
      description: t('home.charactersDetails.david.description'),
      verse: t('home.charactersDetails.david.verse'),
      difficulty: t('home.charactersDetails.david.difficulty')
    },
    {
      id: 'daniel',
      name: t('home.charactersDetails.daniel.name'),
      period: t('home.charactersDetails.daniel.period'),
      description: t('home.charactersDetails.daniel.description'),
      verse: t('home.charactersDetails.daniel.verse'),
      difficulty: t('home.charactersDetails.daniel.difficulty')
    }
  ]

  const biblicalCharacters = getBiblicalCharacters()

  const currentCharacter = biblicalCharacters.find(char => char.id === selectedCharacter)

  const handleFileUpload = (files) => {
    setUploadedFiles(prev => [...prev, ...files])
    const newSlides = files.map((file) => ({
      id: generateId('file'),
      title: file.name.replace(/\.[^/.]+$/, ""),
      content: `${file.name}에서 변환된 슬라이드입니다.`,
      type: 'file',
      description: 'PPT 파일에서 변환됨',
      file: file,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }))
    setCurrentSlides(prev => [...prev, ...newSlides])
  }

  const handleVideoUpload = (files) => {
    const videoFiles = files.map(file => ({
      id: generateId('video'),
      title: file.name.replace(/\.[^/.]+$/, ""),
      description: '업로드된 교육 영상입니다.',
      category: '성경 이야기',
      duration: '미정',
      likes: 0,
      type: 'file',
      file: file,
      url: URL.createObjectURL(file)
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
        id: generateId('google'),
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
        id: generateId('youtube'),
        title: videoInfo.title,
        description: videoInfo.description,
        category: '성경 이야기',
        duration: videoInfo.duration,
        likes: 0,
        type: 'youtube',
        url: youtubeUrl,
        thumbnail: videoInfo.thumbnail,
        videoId: videoId
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

  // 자료 초기화 예시 (슬라이드)
  const clearSlides = () => {
    setCurrentSlides([]);
    saveToLocalStorage('currentSlides', []);
  };

  // 영상 삭제 예시
  const handleDeleteVideo = (videoId) => {
    const updated = uploadedVideos.filter(v => v.id !== videoId);
    setUploadedVideos(updated);
    saveToLocalStorage('uploadedVideos', updated);
  };

  // 슬라이드 삭제 핸들러
  const handleDeleteSlide = (slideId) => {
    const updated = currentSlides.filter(slide => slide.id !== slideId);
    setCurrentSlides(updated);
    saveToLocalStorage('currentSlides', updated);

    // 현재 표시중인 슬라이드가 삭제된 경우 모달 닫기
    if (selectedSlide && selectedSlide.id === slideId) {
      setShowSlideViewer(false);
      setSelectedSlide(null);
    }
  };

  // 슬라이드 수정 핸들러
  const handleUpdateSlide = (slideId, newTitle) => {
    const updated = currentSlides.map(slide =>
      slide.id === slideId ? { ...slide, title: newTitle } : slide
    );
    setCurrentSlides(updated);
    saveToLocalStorage('currentSlides', updated);
  };

  // 영상 수정 핸들러
  const handleUpdateVideo = (videoId, newTitle) => {
    const updated = uploadedVideos.map(video =>
      video.id === videoId ? { ...video, title: newTitle } : video
    );
    setUploadedVideos(updated);
    saveToLocalStorage('uploadedVideos', updated);
  };

  // 퀴즈 저장 핸들러
  const handleSaveQuiz = (quizData, quizName) => {
    const newQuiz = {
      id: generateId('quiz'),
      name: quizName || `퀴즈 ${savedQuizzes.length + 1}`,
      data: quizData,
      createdAt: new Date().toISOString()
    };
    const updated = [...savedQuizzes, newQuiz];
    setSavedQuizzes(updated);
    saveToLocalStorage('savedQuizzes', updated);
    return newQuiz;
  };

  // 퀴즈 삭제 핸들러
  const handleDeleteQuiz = (quizId) => {
    const updated = savedQuizzes.filter(quiz => quiz.id !== quizId);
    setSavedQuizzes(updated);
    saveToLocalStorage('savedQuizzes', updated);
  };

  // 퀴즈 수정 핸들러
  const handleUpdateQuiz = (quizId, newName) => {
    const updated = savedQuizzes.map(quiz =>
      quiz.id === quizId ? { ...quiz, name: newName } : quiz
    );
    setSavedQuizzes(updated);
    saveToLocalStorage('savedQuizzes', updated);
  };

  // 퀴즈 불러오기 핸들러
  const handleLoadQuiz = (quizId) => {
    const quiz = savedQuizzes.find(q => q.id === quizId);
    if (quiz) {
      setQuizAIQuestions(quiz.data);
    }
  };

  // AI로 퀴즈 생성 핸들러
  const handleAIGenerateQuiz = async () => {
    setAiLoading(true)
    setAiError('')
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('Gemini API 키가 설정되지 않았습니다. 환경변수 VITE_GEMINI_API_KEY를 확인하세요.')
      }
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`
      const prompt = `${quizPrompt}\n\n아래 입력을 변환:\n${quizText}\n\n각 유형별로 반드시 7문제씩, 각 문제는 쉬운 난이도의 4지 선다형 객관식으로 만들어 JSON만 반환해줘.\n중요: 각 유형별로 서로 다른 구절이나 내용을 사용하여 중복을 피하라.`
      const body = { contents: [{ parts: [{ text: prompt }] }] }
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      // API 오류 응답 체크
      if (!response.ok) {
        const errorMsg = data.error?.message || `HTTP ${response.status}`
        throw new Error(`API 오류: ${errorMsg}`)
      }
      // Gemini 응답에서 JSON 파싱
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (!text) {
        // 더 자세한 오류 정보 표시
        const blockReason = data.candidates?.[0]?.finishReason
        const promptFeedback = data.promptFeedback?.blockReason
        if (blockReason) throw new Error(`AI 응답 차단: ${blockReason}`)
        if (promptFeedback) throw new Error(`프롬프트 차단: ${promptFeedback}`)
        throw new Error('AI 응답이 비어 있습니다. API 키를 확인하세요.')
      }
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
    { id: 'home', label: t('nav.home'), icon: '🏠' },
    { id: 'word', label: t('nav.word'), icon: '📖' },
    { id: 'doctrine', label: t('nav.doctrine'), icon: '⛪' },
    { id: 'sop', label: t('nav.sop'), icon: '🕊️' },
    { id: 'sanctuary', label: t('nav.sanctuary'), icon: '🏛️' },
    { id: 'meditation', label: t('nav.meditation'), icon: '🧘' },
    { id: 'resources', label: t('nav.resources'), icon: '📚' }
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
              <img src={logo} alt={t('title')} className="w-8 h-8" />
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {t('title')}
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

            {/* 언어 선택, 다크모드 토글 및 모바일 메뉴 */}
            <div className="flex items-center space-x-2">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={changeLanguage}
                isDarkMode={isDarkMode}
              />

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
                <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t('home.timeline.title')}</h2>
                <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{t('home.timeline.subtitle')}</p>
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
                          <span className="inline-block bg-white/70 text-pink-600 px-3 py-1 rounded-full text-xs font-semibold shadow">{t('common.difficulty')}: {currentCharacter.difficulty}</span>
                          <span className="inline-block bg-white/70 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold shadow">{currentCharacter.verse}</span>
                        </div>
                        <p className="text-base text-slate-700 dark:text-slate-200 mb-2">{currentCharacter.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400">{t('common.selectCharacter')}</div>
                  )}
                </div>
              </div>
            </section>

            {/* 최신 영상 섹션 */}
            <section>
              <MainVideoGallery
                videos={uploadedVideos}
                onVideoClick={handleVideoClick}
                title={t('home.videos.title')}
              />
            </section>

            {/* 최신 슬라이드 섹션 */}
            <section>
              <MainSlider
                slides={currentSlides.filter(slide => slide.type === 'file' || slide.type === 'google')}
                onSlideClick={handleSlideClick}
                onSlideDelete={handleDeleteSlide}
                title={t('home.slides.title')}
              />
              {/* 디버깅용 정보 */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">
                  <p><strong>총 슬라이드 수:</strong> {currentSlides.length}</p>
                  <p><strong>표시할 슬라이드 수:</strong> {currentSlides.filter(slide => slide.type === 'file' || slide.type === 'google').length}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer font-semibold">슬라이드 데이터</summary>
                    <pre className="mt-2 text-xs overflow-auto max-h-32">
                      {JSON.stringify(currentSlides, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
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
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment1.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment1.description')}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>2</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment2.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment2.description')}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>3</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment3.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment3.description')}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>4</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment4.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment4.description')}</p>
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
                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.secondTablet')}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.secondTabletSubtitle')}</p>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>5</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment5.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment5.description')}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>6</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment6.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment6.description')}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>7</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment7.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment7.description')}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>8</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment8.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment8.description')}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>9</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment9.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment9.description')}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-200/50'}`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>10</span>
                        <div>
                          <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>{t('home.commandments.commandment10.title')}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>{t('home.commandments.commandment10.description')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t('home.commandments.reference')}
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
            aiQuestions={quizAIQuestions}
            onDeleteSlide={handleDeleteSlide}
            onUpdateSlide={handleUpdateSlide}
            onDeleteVideo={handleDeleteVideo}
            onUpdateVideo={handleUpdateVideo}
            savedQuizzes={savedQuizzes}
            onSaveQuiz={handleSaveQuiz}
            onDeleteQuiz={handleDeleteQuiz}
            onUpdateQuiz={handleUpdateQuiz}
            onLoadQuiz={handleLoadQuiz}
          />
        )}

        {currentPage === 'word' && (
          <BibleExplorer isDarkMode={isDarkMode} />
        )}

        {currentPage === 'doctrine' && (
          <SDADoctrines isDarkMode={isDarkMode} />
        )}

        {currentPage === 'sop' && (
          <SpiritOfProphecy isDarkMode={isDarkMode} />
        )}

        {currentPage === 'meditation' && (
          <MeditationPage isDarkMode={isDarkMode} />
        )}

        {currentPage === 'sanctuary' && (
          <SanctuaryPage isDarkMode={isDarkMode} />
        )}
      </main>

      {/* 푸터 */}
      <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-800'} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={logo} alt={t('title')} className="w-8 h-8" />
                <h3 className="text-xl font-bold">{t('title')}</h3>
              </div>
              <p className="text-slate-300">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.menu')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-400 hover:text-blue-300">📖 {t('nav.word')}</a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-300">⛪ {t('nav.doctrine')}</a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-300">🕊️ {t('nav.sop')}</a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-300">📚 {t('nav.resources')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
              <div className="space-y-2">
                <p>{t('footer.email')}</p>
                <p>{t('footer.phone')}</p>
                <div className="flex items-center space-x-2 mt-4">
                  <Cross className="w-4 h-4" />
                  <span>{t('footer.withLove')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Book, Upload, Play, ExternalLink, Youtube, FileText, Video, Trash2, Edit2, Save, X, FolderOpen } from 'lucide-react'
import FileUpload from './FileUpload.jsx'
import { useTranslation } from '../lib/i18n.js'

const ResourcesPage = ({
  onFileUpload,
  onVideoUpload,
  onSlideUrlSubmit,
  onYoutubeUrlSubmit,
  uploadedFiles,
  uploadedVideos,
  currentSlides,
  slideUrl,
  setSlideUrl,
  youtubeUrl,
  setYoutubeUrl,
  quizText,
  onQuizTextChange,
  onQuizCreate,
  onAIGenerateQuiz,
  aiLoading,
  aiError,
  quizPrompt,
  onQuizPromptChange,
  aiQuestions,
  onDeleteSlide,
  onUpdateSlide,
  onDeleteVideo,
  onUpdateVideo,
  savedQuizzes = [],
  onSaveQuiz,
  onDeleteQuiz,
  onUpdateQuiz,
  onLoadQuiz
}) => {
  const { t } = useTranslation()
  const [editingSlideId, setEditingSlideId] = useState(null)
  const [editingVideoId, setEditingVideoId] = useState(null)
  const [editingQuizId, setEditingQuizId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [quizName, setQuizName] = useState('')

  // 슬라이드 수정 시작
  const startEditSlide = (slide) => {
    setEditingSlideId(slide.id)
    setEditValue(slide.title)
  }

  // 슬라이드 수정 저장
  const saveSlideEdit = () => {
    if (editingSlideId && editValue.trim()) {
      onUpdateSlide(editingSlideId, editValue.trim())
    }
    setEditingSlideId(null)
    setEditValue('')
  }

  // 영상 수정 시작
  const startEditVideo = (video) => {
    setEditingVideoId(video.id)
    setEditValue(video.title)
  }

  // 영상 수정 저장
  const saveVideoEdit = () => {
    if (editingVideoId && editValue.trim()) {
      onUpdateVideo(editingVideoId, editValue.trim())
    }
    setEditingVideoId(null)
    setEditValue('')
  }

  // 퀴즈 수정 시작
  const startEditQuiz = (quiz) => {
    setEditingQuizId(quiz.id)
    setEditValue(quiz.name)
  }

  // 퀴즈 수정 저장
  const saveQuizEdit = () => {
    if (editingQuizId && editValue.trim()) {
      onUpdateQuiz(editingQuizId, editValue.trim())
    }
    setEditingQuizId(null)
    setEditValue('')
  }

  // 퀴즈 저장
  const handleSaveCurrentQuiz = () => {
    if (aiQuestions && (aiQuestions.cardFlip?.length > 0 || aiQuestions.wordOrder?.length > 0 || aiQuestions.fillBlank?.length > 0)) {
      onSaveQuiz(aiQuestions, quizName || `퀴즈 ${new Date().toLocaleString('ko-KR')}`)
      setQuizName('')
    }
  }

  // 수정 취소
  const cancelEdit = () => {
    setEditingSlideId(null)
    setEditingVideoId(null)
    setEditingQuizId(null)
    setEditValue('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">{t('resources.title')}</h1>
        <p className="text-lg text-slate-600">{t('resources.description')}</p>
      </div>

      <Tabs defaultValue="slides" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="slides" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>슬라이드 자료</span>
            {currentSlides.length > 0 && (
              <Badge variant="secondary" className="ml-1">{currentSlides.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>영상 자료</span>
            {uploadedVideos.length > 0 && (
              <Badge variant="secondary" className="ml-1">{uploadedVideos.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center space-x-2">
            <Book className="w-4 h-4" />
            <span>퀴즈 게임</span>
            {savedQuizzes.length > 0 && (
              <Badge variant="secondary" className="ml-1">{savedQuizzes.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* 슬라이드 자료 탭 */}
        <TabsContent value="slides" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PPT 파일 업로드 */}
            <FileUpload
              title="PPT 파일 업로드"
              description="PowerPoint 파일을 업로드하여 웹에서 바로 확인하세요"
              acceptedTypes=".ppt,.pptx,.pdf,.jpg,.jpeg,.png"
              maxSize={50}
              onFileUpload={onFileUpload}
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
                  <Button className="w-full" onClick={onSlideUrlSubmit}>
                    슬라이드 연결하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 등록된 슬라이드 목록 */}
          {currentSlides.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FolderOpen className="w-5 h-5" />
                  <span>등록된 슬라이드 ({currentSlides.length}개)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSlides.map((slide) => (
                    <div key={slide.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded flex items-center justify-center ${slide.type === 'google' ? 'bg-blue-100' : 'bg-orange-100'}`}>
                          {slide.type === 'google' ? (
                            <ExternalLink className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                        {editingSlideId === slide.id ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 max-w-xs"
                            autoFocus
                          />
                        ) : (
                          <div>
                            <p className="font-medium text-sm">{slide.title}</p>
                            <p className="text-xs text-slate-500">{slide.type === 'google' ? '구글 슬라이드' : 'PPT 파일'}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {editingSlideId === slide.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={saveSlideEdit} className="text-green-600 hover:text-green-700">
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-slate-500">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => startEditSlide(slide)} className="text-blue-600 hover:text-blue-700">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDeleteSlide(slide.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 영상 자료 탭 */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 영상 파일 업로드 */}
            <FileUpload
              title="영상 파일 업로드"
              description="교육용 영상을 업로드하여 학생들과 공유하세요"
              acceptedTypes=".mp4,.mov,.avi"
              maxSize={500}
              onFileUpload={onVideoUpload}
            />

            {/* 유튜브 영상 연결 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span>유튜브 영상 연결</span>
                </CardTitle>
                <CardDescription>
                  유튜브 URL을 입력하여 영상을 연결하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">유튜브 URL</label>
                    <Input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={onYoutubeUrlSubmit}>
                    <Youtube className="w-4 h-4 mr-2" />
                    유튜브 영상 연결하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 등록된 영상 목록 */}
          {uploadedVideos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FolderOpen className="w-5 h-5" />
                  <span>등록된 영상 ({uploadedVideos.length}개)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadedVideos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded flex items-center justify-center ${video.type === 'youtube' ? 'bg-red-100' : 'bg-purple-100'}`}>
                          {video.type === 'youtube' ? (
                            <Youtube className="w-5 h-5 text-red-600" />
                          ) : (
                            <Video className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                        {editingVideoId === video.id ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 max-w-xs"
                            autoFocus
                          />
                        ) : (
                          <div>
                            <p className="font-medium text-sm">{video.title}</p>
                            <p className="text-xs text-slate-500">
                              {video.type === 'youtube' ? '유튜브 영상' : '업로드 영상'}
                              {video.duration && ` - ${video.duration}`}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {editingVideoId === video.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={saveVideoEdit} className="text-green-600 hover:text-green-700">
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-slate-500">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => startEditVideo(video)} className="text-blue-600 hover:text-blue-700">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDeleteVideo(video.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 퀴즈 게임 자료 탭 */}
        <TabsContent value="quiz" className="space-y-6">
          {/* 저장된 퀴즈 목록 */}
          {savedQuizzes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FolderOpen className="w-5 h-5" />
                  <span>저장된 퀴즈 ({savedQuizzes.length}개)</span>
                </CardTitle>
                <CardDescription>저장된 퀴즈를 불러오거나 삭제하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedQuizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded flex items-center justify-center bg-green-100">
                          <Book className="w-5 h-5 text-green-600" />
                        </div>
                        {editingQuizId === quiz.id ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 max-w-xs"
                            autoFocus
                          />
                        ) : (
                          <div>
                            <p className="font-medium text-sm">{quiz.name}</p>
                            <p className="text-xs text-slate-500">
                              {new Date(quiz.createdAt).toLocaleString('ko-KR')}
                              {quiz.data && ` - ${(quiz.data.cardFlip?.length || 0) + (quiz.data.wordOrder?.length || 0) + (quiz.data.fillBlank?.length || 0)}문제`}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {editingQuizId === quiz.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={saveQuizEdit} className="text-green-600 hover:text-green-700">
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-slate-500">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" onClick={() => onLoadQuiz(quiz.id)}>
                              불러오기
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => startEditQuiz(quiz)} className="text-blue-600 hover:text-blue-700">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDeleteQuiz(quiz.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">AI 퀴즈 프롬프트 (예시/규칙/출력형식 등)</label>
            <textarea
              className="w-full p-3 border border-blue-300 rounded-md resize-none bg-blue-50 text-blue-900 mb-4"
              rows="7"
              value={quizPrompt}
              onChange={onQuizPromptChange}
              placeholder="AI에게 보낼 프롬프트를 입력하세요. 예시, 규칙, 출력형식 등 자유롭게 작성 가능."
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 퀴즈 텍스트 입력 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="w-5 h-5" />
                  <span>퀴즈 텍스트 입력</span>
                </CardTitle>
                <CardDescription>
                  성경 구절이나 질문을 입력하여 퀴즈를 생성하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">퀴즈 내용 (문제|정답, 한 줄에 하나씩)</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md resize-none"
                      rows="6"
                      placeholder="예: 태초에 하나님이 천지를 창조하시니라|창세기 1:1"
                      value={quizText}
                      onChange={onQuizTextChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button className="w-full" onClick={onQuizCreate}>
                      수동 퀴즈 생성하기
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white" onClick={onAIGenerateQuiz} disabled={aiLoading}>
                      {aiLoading ? 'AI로 퀴즈 생성 중...' : 'AI로 퀴즈 생성(Gemini)'}
                    </Button>
                    {aiError && <div className="text-red-500 text-sm mt-2">{aiError}</div>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 퀴즈 파일 업로드 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>퀴즈 파일 업로드</span>
                </CardTitle>
                <CardDescription>
                  텍스트 파일(.txt)을 업로드하여 퀴즈를 생성하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">파일을 드래그하거나 클릭하여 업로드</p>
                    <p className="text-sm text-gray-500">지원 형식: .txt (최대 10MB)</p>
                    <Button variant="outline" className="mt-4">
                      파일 선택
                    </Button>
                  </div>
                  <Button className="w-full">
                    파일에서 퀴즈 생성하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI 생성 결과 미리보기 및 저장 */}
          {aiQuestions && (aiQuestions.cardFlip?.length > 0 || aiQuestions.wordOrder?.length > 0 || aiQuestions.fillBlank?.length > 0) && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-blue-700">AI가 생성한 퀴즈 미리보기</span>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="퀴즈 이름 입력"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      className="w-48"
                    />
                    <Button onClick={handleSaveCurrentQuiz} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      퀴즈 저장
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {['cardFlip', 'wordOrder', 'fillBlank'].map(type => (
                  <AIPreviewQuizSection key={type} type={type} questions={aiQuestions[type]} />
                ))}
              </CardContent>
            </Card>
          )}

          {/* 퀴즈 게임 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>퀴즈 게임 설정</CardTitle>
              <CardDescription>
                생성된 퀴즈의 게임 형태를 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">1</span>
                  </div>
                  <h4 className="font-medium mb-2">카드 뒤집기</h4>
                  <p className="text-sm text-gray-600">구절과 키워드 매칭</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold text-xl">2</span>
                  </div>
                  <h4 className="font-medium mb-2">순서 기억</h4>
                  <p className="text-sm text-gray-600">섞인 단어 순서 맞추기</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 font-bold text-xl">3</span>
                  </div>
                  <h4 className="font-medium mb-2">구절 맞추기</h4>
                  <p className="text-sm text-gray-600">핵심 단어 빈칸 채우기</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ResourcesPage


// AI 퀴즈 미리보기/정답 확인 UI
function AIPreviewQuizSection({ type, questions }) {
  const [userAnswers, setUserAnswers] = React.useState(Array(questions?.length || 0).fill(''))
  const [showResults, setShowResults] = React.useState(Array(questions?.length || 0).fill(false))

  if (!questions || questions.length === 0) return null

  const typeLabel = type === 'cardFlip' ? '카드 뒤집기' : type === 'wordOrder' ? '순서 기억' : '구절 맞추기'
  const typeColor = type === 'cardFlip' ? 'blue' : type === 'wordOrder' ? 'green' : 'orange'

  return (
    <div className="mb-8">
      <h4 className={`text-lg font-semibold mb-4 text-${typeColor}-600 flex items-center`}>
        <span className={`w-6 h-6 rounded-full bg-${typeColor}-100 text-${typeColor}-600 flex items-center justify-center text-sm mr-2`}>
          {questions.length}
        </span>
        {typeLabel} 문제
      </h4>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={`${type}-${i}`} className={`p-4 border rounded-lg bg-${typeColor}-50 border-${typeColor}-200`}>
            <div className="mb-2 font-medium">Q{i + 1}. {q.question}</div>
            {q.options && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {q.options.map((opt, optIndex) => (
                  <button
                    key={opt}
                    onClick={() => {
                      if (!showResults[i]) {
                        const arr = [...userAnswers]; arr[i] = opt; setUserAnswers(arr);
                      }
                    }}
                    className={`p-2 text-sm rounded border text-left transition-colors ${
                      showResults[i]
                        ? opt === q.answer
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : userAnswers[i] === opt
                            ? 'bg-red-100 border-red-500 text-red-700'
                            : 'bg-white border-gray-200'
                        : userAnswers[i] === opt
                          ? 'bg-blue-100 border-blue-500'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                    disabled={showResults[i]}
                  >
                    {String.fromCharCode(65 + optIndex)}. {opt}
                  </button>
                ))}
              </div>
            )}
            {showResults[i] && (
              <div className={`mt-2 text-sm font-bold ${userAnswers[i] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                {userAnswers[i] === q.answer ? '정답입니다!' : `오답입니다. 정답: ${q.answer}`}
              </div>
            )}
            <button
              className={`mt-2 px-4 py-2 rounded text-white text-sm font-medium transition-colors ${showResults[i] ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={() => {
                const arr = [...showResults]; arr[i] = true; setShowResults(arr);
              }}
              disabled={showResults[i] || !userAnswers[i]}
            >
              {showResults[i] ? '확인 완료' : '정답 확인'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

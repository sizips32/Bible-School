import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Book, Upload, Play, ExternalLink, Youtube, FileText, Video } from 'lucide-react'
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
  aiQuestions
}) => {
  const { t } = useTranslation()

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
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>영상 자료</span>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center space-x-2">
            <Book className="w-4 h-4" />
            <span>퀴즈 게임</span>
          </TabsTrigger>
        </TabsList>

        {/* 슬라이드 자료 탭 */}
        <TabsContent value="slides" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PPT 파일 업로드 */}
            <FileUpload
              title="PPT 파일 업로드"
              description="PowerPoint 파일을 업로드하여 웹에서 바로 확인하세요"
              acceptedTypes=".ppt,.pptx"
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

                {youtubeUrl && (
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium mb-2">미리보기</h4>
                    <div className="aspect-video bg-black rounded border flex items-center justify-center">
                      <Youtube className="w-12 h-12 text-red-500" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </TabsContent>

        {/* 퀴즈 게임 자료 탭 */}
        <TabsContent value="quiz" className="space-y-6">
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

          {/* AI 생성 결과 미리보기 및 정답 확인 */}
          {aiQuestions && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-blue-700">AI가 생성한 퀴즈 미리보기</h3>
              {['cardFlip', 'wordOrder', 'fillBlank'].map(type => (
                <AIPreviewQuizSection key={type} type={type} questions={aiQuestions[type]} />
              ))}
            </div>
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
                    <span className="text-blue-600 font-bold">🔄</span>
                  </div>
                  <h4 className="font-medium mb-2">카드 뒤집기</h4>
                  <p className="text-sm text-gray-600">구절과 키워드 매칭</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">⏰</span>
                  </div>
                  <h4 className="font-medium mb-2">순서 기억</h4>
                  <p className="text-sm text-gray-600">섞인 단어 순서 맞추기</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 font-bold">📝</span>
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
  const [userAnswers, setUserAnswers] = React.useState(Array(questions.length).fill(''))
  const [showResults, setShowResults] = React.useState(Array(questions.length).fill(false))
  if (!questions || questions.length === 0) return null
  const typeLabel = type === 'cardFlip' ? '카드 뒤집기' : type === 'wordOrder' ? '순서 기억' : '구절 맞추기'
  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold mb-2 text-blue-600">{typeLabel} 문제</h4>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="p-4 border rounded-lg bg-blue-50">
            <div className="mb-2 font-medium">Q{i + 1}. {q.question}</div>
            <input
              className="border rounded px-3 py-1 w-full max-w-md mb-2"
              type="text"
              placeholder="정답을 입력하세요"
              value={userAnswers[i]}
              onChange={e => {
                const arr = [...userAnswers]; arr[i] = e.target.value; setUserAnswers(arr);
              }}
              disabled={showResults[i]}
            />
            {showResults[i] && (
              <div className={`mt-1 text-sm font-bold ${userAnswers[i].trim() === q.answer.trim() ? 'text-green-600' : 'text-red-600'}`}>{userAnswers[i].trim() === q.answer.trim() ? '정답입니다!' : `오답입니다. 정답: ${q.answer}`}</div>
            )}
            <button
              className={`mt-2 px-3 py-1 rounded text-white text-sm ${showResults[i] ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={() => {
                const arr = [...showResults]; arr[i] = true; setShowResults(arr);
              }}
              disabled={showResults[i]}
            >
              {showResults[i] ? '확인 완료' : '정답 확인'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


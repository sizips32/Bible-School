import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Shuffle, Clock, FileText, Trophy } from 'lucide-react'

const QuizGames = ({ uploadedSlides, uploadedVideos, youtubeVideos, quizQuestions = [], aiQuestions = { cardFlip: [], wordOrder: [], fillBlank: [] } }) => {
  const [selectedGame, setSelectedGame] = useState(null)
  const [scores, setScores] = useState({
    cardFlip: 0,
    wordOrder: 0,
    fillBlank: 0
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [errorMsg, setErrorMsg] = useState('') // 정답 미선택 안내 메시지

  const gameTypes = [
    {
      id: 'cardFlip',
      title: '카드 뒤집기',
      subtitle: '구절과 출처 매칭',
      icon: Shuffle,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      description: '성경 구절과 출처를 매칭해보세요'
    },
    {
      id: 'wordOrder',
      title: '순서 기억',
      subtitle: '단어 순서 맞추기',
      icon: Clock,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      description: '섞인 단어들을 올바른 순서로 배열해보세요'
    },
    {
      id: 'fillBlank',
      title: '구절 맞추기',
      subtitle: '빈칸 채우기 퀴즈',
      icon: FileText,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      description: '빈칸에 들어갈 핵심 단어를 선택해보세요'
    }
  ]

  const resetGame = () => {
    setSelectedGame(null)
    setCurrentIndex(0)
    setUserAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setErrorMsg('') // 게임 재시작 시 오류 메시지 초기화
  }

  // 정답 확인 함수: 항상 현재 문제의 answer와 비교
  const handleCheckAnswer = () => {
    // 답을 선택하지 않은 경우 안내 메시지 표시
    if (!userAnswer) {
      setErrorMsg('답을 선택하세요!')
      return
    }
    setErrorMsg('')
    const currentQuestion = questions[currentIndex]
    // 문자열 비교 시 공백/대소문자 오류 방지
    const correct = currentQuestion?.answer?.trim() === userAnswer.trim()
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setScores(prev => ({ ...prev, [selectedGame]: prev[selectedGame] + 1 }))
    }
  }

  // 다음 문제로 이동
  const handleNext = () => {
    setCurrentIndex(idx => idx + 1)
    setUserAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setErrorMsg('') // 다음 문제로 넘어갈 때 오류 메시지 초기화
  }

  if (selectedGame) {
    // 각 게임별로 AI 문제 배열 사용
    const gameKey = selectedGame === 'cardFlip' ? 'cardFlip' : selectedGame === 'wordOrder' ? 'wordOrder' : 'fillBlank'
    const questions = aiQuestions[gameKey] && aiQuestions[gameKey].length > 0 ? aiQuestions[gameKey].slice(0, 7) : quizQuestions.slice(0, 7)

    // 퀴즈 문제 없을 때 안내
    if (!questions || questions.length === 0) {
      return (
        <div className="w-full max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {gameTypes.find(g => g.id === selectedGame)?.title}
            </h2>
            <Button onClick={resetGame} variant="outline">게임 목록으로</Button>
          </div>
          <Card className="text-center p-8">
            <CardContent>
              <div className="text-6xl mb-4">❗️</div>
              <h3 className="text-xl font-bold mb-2">등록된 퀴즈가 없습니다</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">자료실에서 퀴즈를 입력/생성해 주세요.</p>
              <Button onClick={resetGame}>게임 목록으로 돌아가기</Button>
            </CardContent>
          </Card>
        </div>
      )
    }
    // 모든 문제를 다 풀었을 때
    if (currentIndex >= questions.length) {
      return (
        <div className="w-full max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {gameTypes.find(g => g.id === selectedGame)?.title}
            </h2>
            <Button onClick={resetGame} variant="outline">게임 목록으로</Button>
          </div>
          <Card className="text-center p-8">
            <CardContent>
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">모든 문제를 풀었습니다!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">점수: {scores[selectedGame]} / {questions.length}</p>
              <Button onClick={resetGame}>게임 목록으로 돌아가기</Button>
            </CardContent>
          </Card>
        </div>
      )
    }
    // 문제 출제/정답 확인 UI
    const q = questions[currentIndex]
    // 객관식(4지선다) 선택지 클릭 핸들러
    const handleSelectOption = (opt) => {
      if (showResult) return // 이미 선택한 경우 중복 방지
      setUserAnswer(opt)
      const correct = q.answer?.trim() === opt.trim()
      setIsCorrect(correct)
      setShowResult(true)
      if (correct) {
        setScores(prev => ({ ...prev, [selectedGame]: prev[selectedGame] + 1 }))
      }
      // 자동 진행(setTimeout) 제거: 사용자가 직접 '다음 문제' 버튼을 클릭해야 함
    }
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {gameTypes.find(g => g.id === selectedGame)?.title}
          </h2>
          <Button onClick={resetGame} variant="outline">게임 목록으로</Button>
        </div>
        <Card className="text-center p-8">
          <CardContent>
            <div className="mb-4 text-lg font-semibold">문제 {currentIndex + 1} / {questions.length}</div>
            <div className="text-2xl font-bold mb-6">{q.question}</div>
            {Array.isArray(q.options) && q.options.length === 4 ? (
              <div className="flex flex-col items-center gap-2 mb-4">
                {q.options.map((opt, idx) => {
                  // 정답/오답 표시 색상 결정
                  let optionClass = 'border-gray-300'
                  if (showResult) {
                    if (opt === q.answer) {
                      optionClass = 'border-green-500 bg-green-50 font-bold' // 정답
                    } else if (opt === userAnswer) {
                      optionClass = 'border-red-500 bg-red-50' // 오답 선택
                    }
                  } else if (userAnswer === opt) {
                    optionClass = 'border-blue-500 bg-blue-50'
                  }
                  return (
                    <label
                      key={idx}
                      className={`w-full max-w-md px-4 py-2 rounded border flex items-center gap-2 ${optionClass}`}
                      onClick={() => !showResult && handleSelectOption(opt)}
                      style={{ cursor: showResult ? 'default' : 'pointer' }}
                    >
                      <input
                        type="radio"
                        name="quiz-option"
                        value={opt}
                        checked={userAnswer === opt}
                        readOnly
                        disabled={showResult}
                      />
                      <span className="flex-1 text-left">{opt}</span>
                    </label>
                  )
                })}
              </div>
            ) : (
              <>
                <input
                  className="border rounded px-4 py-2 text-lg mb-4 w-full max-w-md"
                  type="text"
                  placeholder="정답을 입력하세요"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  disabled={showResult}
                />
                {/* 주관식은 기존대로 정답 확인 버튼 노출 */}
                <div className="flex justify-center gap-4 mt-4">
                  {!showResult ? (
                    <Button onClick={handleCheckAnswer} className="bg-blue-600 hover:bg-blue-700">정답 확인</Button>
                  ) : (
                    <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">다음 문제</Button>
                  )}
                </div>
              </>
            )}
            {/* 객관식도 showResult 시 '다음 문제' 버튼 노출 */}
            {Array.isArray(q.options) && q.options.length === 4 && showResult && (
              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">다음 문제</Button>
              </div>
            )}
            {/* 정답/오답 결과 메시지 */}
            {/* 답 미선택 안내 메시지 */}
            {errorMsg && (
              <div className="text-red-500 font-bold mb-2">{errorMsg}</div>
            )}
            {showResult && (
              <div className={`mt-2 mb-4 text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? '정답입니다!' : `오답입니다. 정답: ${q.answer}`}</div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          🎮 성경 퀴즈 게임
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          자료실의 내용을 바탕으로 만들어진 재미있는 퀴즈 게임을 즐겨보세요
        </p>
      </div>

      {/* 점수 표시 */}
      <div className="flex justify-center mb-8">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Trophy className="w-6 h-6" />
              <div className="text-sm">
                <div>총 점수: {Object.values(scores).reduce((a, b) => a + b, 0)}점</div>
                <div className="text-xs opacity-80">
                  카드: {scores.cardFlip} | 순서: {scores.wordOrder} | 구절: {scores.fillBlank}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 게임 선택 카드들 */}
      <div className="grid md:grid-cols-3 gap-6">
        {gameTypes.map((game) => {
          const IconComponent = game.icon
          return (
            <Card
              key={game.id}
              className={`${game.color} text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              onClick={() => setSelectedGame(game.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold">{game.title}</CardTitle>
                <p className="text-sm opacity-90">{game.subtitle}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm opacity-80 mb-4">{game.description}</p>
                <div className="bg-white/20 rounded-lg p-2">
                  <span className="text-sm font-semibold">
                    최고 점수: {scores[game.id]}점
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 자료실 안내 */}
      {uploadedSlides.length === 0 && uploadedVideos.length === 0 && youtubeVideos.length === 0 && (
        <div className="mt-8 text-center">
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <p className="text-yellow-800 dark:text-yellow-200">
                💡 자료실에서 슬라이드나 영상을 업로드하면 해당 내용을 바탕으로 한 맞춤형 퀴즈가 생성됩니다!
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default QuizGames


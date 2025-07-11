import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Shuffle, Clock, FileText, Trophy, RotateCcw } from 'lucide-react'

const QuizGames = ({ uploadedSlides, uploadedVideos, youtubeVideos }) => {
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameData, setGameData] = useState({
    cardFlip: [],
    wordOrder: [],
    fillBlank: []
  })
  const [scores, setScores] = useState({
    cardFlip: 0,
    wordOrder: 0,
    fillBlank: 0
  })

  // 자료실 데이터에서 퀴즈 데이터 생성
  useEffect(() => {
    generateQuizData()
  }, [uploadedSlides, uploadedVideos, youtubeVideos])

  const generateQuizData = () => {
    // 기본 성경 구절 데이터 (자료실에 데이터가 없을 때 사용)
    const defaultBibleVerses = [
      {
        verse: "하나님이 세상을 이처럼 사랑하사",
        reference: "요한복음 3:16",
        keywords: ["사랑", "세상", "하나님"],
        words: ["하나님이", "세상을", "이처럼", "사랑하사"]
      },
      {
        verse: "여호와는 나의 목자시니 내게 부족함이 없으리로다",
        reference: "시편 23:1",
        keywords: ["목자", "여호와", "부족함"],
        words: ["여호와는", "나의", "목자시니", "내게", "부족함이", "없으리로다"]
      },
      {
        verse: "수고하고 무거운 짐 진 자들아 다 내게로 오라",
        reference: "마태복음 11:28",
        keywords: ["수고", "무거운 짐", "오라"],
        words: ["수고하고", "무거운 짐", "진 자들아", "다", "내게로", "오라"]
      },
      {
        verse: "내가 너희에게 평안을 끼치노니",
        reference: "요한복음 14:27",
        keywords: ["평안", "끼치노니"],
        words: ["내가", "너희에게", "평안을", "끼치노니"]
      },
      {
        verse: "모든 것을 할 수 있느니라",
        reference: "빌립보서 4:13",
        keywords: ["모든 것", "할 수 있느니라"],
        words: ["모든 것을", "할 수", "있느니라"]
      }
    ]

    // 자료실 데이터 분석 (현재는 기본 데이터 사용, 추후 실제 분석 로직 추가)
    const hasResourceData = uploadedSlides.length > 0 || uploadedVideos.length > 0 || youtubeVideos.length > 0
    const sourceData = hasResourceData ? extractDataFromResources() : defaultBibleVerses

    // 카드 뒤집기 게임 데이터
    const cardFlipData = sourceData.map((item, index) => ({
      id: index,
      verse: item.verse,
      reference: item.reference,
      matched: false
    }))

    // 순서 기억 게임 데이터
    const wordOrderData = sourceData.map((item, index) => ({
      id: index,
      originalWords: item.words,
      shuffledWords: [...item.words].sort(() => Math.random() - 0.5),
      reference: item.reference,
      completed: false
    }))

    // 구절 맞추기 게임 데이터
    const fillBlankData = sourceData.map((item, index) => {
      const words = item.verse.split(' ')
      const blankIndex = Math.floor(Math.random() * words.length)
      const correctAnswer = words[blankIndex]
      const blankVerse = words.map((word, i) => i === blankIndex ? '___' : word).join(' ')
      
      return {
        id: index,
        blankVerse,
        correctAnswer,
        reference: item.reference,
        options: generateOptions(correctAnswer, item.keywords),
        answered: false
      }
    }))

    setGameData({
      cardFlip: cardFlipData,
      wordOrder: wordOrderData,
      fillBlank: fillBlankData
    })
  }

  const extractDataFromResources = () => {
    // 실제 자료실 데이터에서 텍스트 추출 로직
    // 현재는 기본 데이터 반환, 추후 구현
    return []
  }

  const generateOptions = (correctAnswer, keywords) => {
    const options = [correctAnswer]
    const alternatives = ['사랑', '평안', '은혜', '믿음', '소망', '기쁨', '감사', '축복']
    
    while (options.length < 4) {
      const randomOption = alternatives[Math.floor(Math.random() * alternatives.length)]
      if (!options.includes(randomOption)) {
        options.push(randomOption)
      }
    }
    
    return options.sort(() => Math.random() - 0.5)
  }

  const gameTypes = [
    {
      id: 'cardFlip',
      title: '카드 뒤집기',
      subtitle: '구절과 키워드 매칭',
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
      description: '단어들을 올바른 순서로 배열해보세요'
    },
    {
      id: 'fillBlank',
      title: '구절 맞추기',
      subtitle: '빈칸 채우기 퀴즈',
      icon: FileText,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      description: '빈칸에 들어갈 올바른 단어를 선택해보세요'
    }
  ]

  const resetGame = () => {
    setSelectedGame(null)
    generateQuizData()
  }

  if (selectedGame) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {gameTypes.find(g => g.id === selectedGame)?.title}
          </h2>
          <Button onClick={resetGame} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            게임 목록으로
          </Button>
        </div>
        
        {selectedGame === 'cardFlip' && <CardFlipGame data={gameData.cardFlip} onScore={(score) => setScores(prev => ({...prev, cardFlip: score}))} />}
        {selectedGame === 'wordOrder' && <WordOrderGame data={gameData.wordOrder} onScore={(score) => setScores(prev => ({...prev, wordOrder: score}))} />}
        {selectedGame === 'fillBlank' && <FillBlankGame data={gameData.fillBlank} onScore={(score) => setScores(prev => ({...prev, fillBlank: score}))} />}
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

// 카드 뒤집기 게임 컴포넌트
const CardFlipGame = ({ data, onScore }) => {
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [score, setScore] = useState(0)
  const [gameCards, setGameCards] = useState([])

  useEffect(() => {
    // 카드 데이터 준비 (구절과 출처를 분리하여 카드 생성)
    const cards = []
    data.slice(0, 3).forEach((item, index) => {
      cards.push({ id: `verse-${index}`, type: 'verse', content: item.verse, pairId: index })
      cards.push({ id: `ref-${index}`, type: 'reference', content: item.reference, pairId: index })
    })
    setGameCards(cards.sort(() => Math.random() - 0.5))
  }, [data])

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return
    }

    const newFlipped = [...flippedCards, cardId]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const card1 = gameCards.find(c => c.id === newFlipped[0])
      const card2 = gameCards.find(c => c.id === newFlipped[1])

      if (card1.pairId === card2.pairId) {
        // 매칭 성공
        setMatchedPairs(prev => [...prev, ...newFlipped])
        setScore(prev => prev + 10)
        setFlippedCards([])
      } else {
        // 매칭 실패
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  useEffect(() => {
    onScore(score)
  }, [score, onScore])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {gameCards.map((card) => {
        const isFlipped = flippedCards.includes(card.id) || matchedPairs.includes(card.id)
        const isMatched = matchedPairs.includes(card.id)
        
        return (
          <Card 
            key={card.id}
            className={`h-32 cursor-pointer transition-all duration-300 ${
              isMatched ? 'bg-green-100 border-green-300' : 'hover:shadow-lg'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="h-full flex items-center justify-center p-4">
              {isFlipped ? (
                <p className={`text-center text-sm ${card.type === 'verse' ? 'font-medium' : 'font-bold text-blue-600'}`}>
                  {card.content}
                </p>
              ) : (
                <div className="text-4xl">🎴</div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// 순서 기억 게임 컴포넌트
const WordOrderGame = ({ data, onScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userOrder, setUserOrder] = useState([])
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const question = data[currentQuestion]

  const handleWordClick = (word) => {
    if (userOrder.includes(word)) return
    setUserOrder(prev => [...prev, word])
  }

  const removeWord = (index) => {
    setUserOrder(prev => prev.filter((_, i) => i !== index))
  }

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(question.originalWords)
    if (isCorrect) {
      setScore(prev => prev + 15)
    }
    setShowResult(true)
    
    setTimeout(() => {
      if (currentQuestion < data.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setUserOrder([])
        setShowResult(false)
      }
    }, 2000)
  }

  useEffect(() => {
    onScore(score)
  }, [score, onScore])

  if (!question) return <div>게임을 준비 중입니다...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <p className="text-lg font-medium mb-2">
          문제 {currentQuestion + 1} / {data.length}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          출처: {question.reference}
        </p>
      </div>

      {/* 사용자가 선택한 순서 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">선택한 순서</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {userOrder.map((word, index) => (
              <Button
                key={index}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeWord(index)}
              >
                {index + 1}. {word}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 단어 선택 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">단어를 순서대로 선택하세요</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {question.shuffledWords.map((word, index) => (
              <Button
                key={index}
                variant={userOrder.includes(word) ? "secondary" : "outline"}
                disabled={userOrder.includes(word)}
                onClick={() => handleWordClick(word)}
                className="opacity-100 disabled:opacity-50"
              >
                {word}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 확인 버튼 */}
      {userOrder.length === question.originalWords.length && !showResult && (
        <div className="text-center">
          <Button onClick={checkAnswer} className="bg-blue-600 hover:bg-blue-700">
            정답 확인
          </Button>
        </div>
      )}

      {/* 결과 표시 */}
      {showResult && (
        <Card className={`${JSON.stringify(userOrder) === JSON.stringify(question.originalWords) ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-bold mb-2">
              {JSON.stringify(userOrder) === JSON.stringify(question.originalWords) ? '정답입니다! 🎉' : '틀렸습니다 😅'}
            </p>
            <p className="text-sm">
              정답: {question.originalWords.join(' ')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// 구절 맞추기 게임 컴포넌트
const FillBlankGame = ({ data, onScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const question = data[currentQuestion]

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
    const isCorrect = answer === question.correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 10)
    }
    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < data.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer('')
        setShowResult(false)
      }
    }, 2000)
  }

  useEffect(() => {
    onScore(score)
  }, [score, onScore])

  if (!question) return <div>게임을 준비 중입니다...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <p className="text-lg font-medium mb-2">
          문제 {currentQuestion + 1} / {data.length}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          출처: {question.reference}
        </p>
      </div>

      {/* 문제 */}
      <Card className="mb-6">
        <CardContent className="p-6 text-center">
          <p className="text-xl font-medium leading-relaxed">
            {question.blankVerse}
          </p>
        </CardContent>
      </Card>

      {/* 선택지 */}
      {!showResult && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-16 text-lg"
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}

      {/* 결과 표시 */}
      {showResult && (
        <Card className={`${selectedAnswer === question.correctAnswer ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-bold mb-2">
              {selectedAnswer === question.correctAnswer ? '정답입니다! 🎉' : '틀렸습니다 😅'}
            </p>
            <p className="text-sm">
              정답: {question.correctAnswer}
            </p>
            <p className="text-sm mt-2">
              완성된 구절: {question.blankVerse.replace('___', question.correctAnswer)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default QuizGames


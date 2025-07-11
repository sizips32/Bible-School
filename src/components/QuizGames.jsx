import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Shuffle, Clock, FileText, Trophy } from 'lucide-react'

const QuizGames = ({ uploadedSlides, uploadedVideos, youtubeVideos }) => {
  const [selectedGame, setSelectedGame] = useState(null)
  const [scores, setScores] = useState({
    cardFlip: 0,
    wordOrder: 0,
    fillBlank: 0
  })

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
  }

  if (selectedGame) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {gameTypes.find(g => g.id === selectedGame)?.title}
          </h2>
          <Button onClick={resetGame} variant="outline">
            게임 목록으로
          </Button>
        </div>
        
        <Card className="text-center p-8">
          <CardContent>
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-2">게임 준비 중...</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              곧 재미있는 퀴즈 게임을 즐기실 수 있습니다!
            </p>
            <Button onClick={resetGame}>
              게임 목록으로 돌아가기
            </Button>
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


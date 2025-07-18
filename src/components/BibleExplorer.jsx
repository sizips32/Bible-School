import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Book, BookOpen, Scroll, Heart, Star } from 'lucide-react'
import { bibleData, getTotalVerses, getTotalChapters, getCategoryStats } from '../data/bibleData.js'

const BibleExplorer = ({ isDarkMode }) => {
  const [selectedTestament, setSelectedTestament] = useState('oldTestament')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [expandedBooks, setExpandedBooks] = useState({})

  const currentTestament = bibleData[selectedTestament]
  const otStats = {
    totalBooks: currentTestament.totalBooks,
    totalChapters: getTotalChapters(currentTestament),
    totalVerses: getTotalVerses(currentTestament)
  }

  const toggleBookExpansion = (bookName) => {
    setExpandedBooks(prev => ({
      ...prev,
      [bookName]: !prev[bookName]
    }))
  }

  const getCategoryIcon = (categoryKey) => {
    const icons = {
      pentateuch: '📜',
      historical: '⚔️',
      wisdom: '💡',
      majorProphets: '🔮',
      minorProphets: '📢',
      gospels: '✝️',
      acts: '🔥',
      paulineEpistles: '✉️',
      generalEpistles: '📩',
      revelation: '👁️'
    }
    return icons[categoryKey] || '📖'
  }

  const getCategoryColor = (categoryKey) => {
    const colors = {
      pentateuch: 'from-blue-500 to-blue-600',
      historical: 'from-green-500 to-green-600',
      wisdom: 'from-purple-500 to-purple-600',
      majorProphets: 'from-red-500 to-red-600',
      minorProphets: 'from-orange-500 to-orange-600',
      gospels: 'from-yellow-500 to-yellow-600',
      acts: 'from-pink-500 to-pink-600',
      paulineEpistles: 'from-indigo-500 to-indigo-600',
      generalEpistles: 'from-teal-500 to-teal-600',
      revelation: 'from-gray-500 to-gray-600'
    }
    return colors[categoryKey] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          성경 탐험하기
        </h1>
        <p className={`text-lg mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          66권의 성경을 분류별로 만나보세요
        </p>
        
        {/* 구약/신약 선택 */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={selectedTestament === 'oldTestament' ? 'default' : 'outline'}
            onClick={() => {
              setSelectedTestament('oldTestament')
              setSelectedCategory(null)
            }}
            className="flex items-center gap-2"
          >
            <Scroll className="w-4 h-4" />
            구약성경 (39권)
          </Button>
          <Button
            variant={selectedTestament === 'newTestament' ? 'default' : 'outline'}
            onClick={() => {
              setSelectedTestament('newTestament')
              setSelectedCategory(null)
            }}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            신약성경 (27권)
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              전체 권수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {otStats.totalBooks}권
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              전체 장수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {otStats.totalChapters}장
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              전체 절수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {otStats.totalVerses.toLocaleString()}절
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 분류별 카드 */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(currentTestament.categories).map(([categoryKey, category]) => {
            const stats = getCategoryStats(category)
            const colorClass = getCategoryColor(categoryKey)
            
            return (
              <Card 
                key={categoryKey}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(categoryKey)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-xl`}>
                      {getCategoryIcon(categoryKey)}
                    </div>
                    <div>
                      <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {category.name}
                      </CardTitle>
                      <CardDescription className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {stats.totalBooks}권
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {category.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{stats.totalBooks}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>권</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">{stats.totalChapters}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>장</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">{stats.totalVerses.toLocaleString()}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>절</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        // 선택된 분류의 책들 표시
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2"
            >
              ← 뒤로가기
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCategoryColor(selectedCategory)} flex items-center justify-center text-white text-xl`}>
                {getCategoryIcon(selectedCategory)}
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  {currentTestament.categories[selectedCategory].name}
                </h2>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {currentTestament.categories[selectedCategory].description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTestament.categories[selectedCategory].books.map((book, index) => (
              <Card 
                key={book.name}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                }`}
                onClick={() => toggleBookExpansion(book.name)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getCategoryColor(selectedCategory)} flex items-center justify-center text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {book.name}
                      </CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {book.chapters}장
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {book.verses}절
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {expandedBooks[book.name] && (
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <div className="text-xl font-bold text-blue-600">{book.chapters}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>장</div>
                      </div>
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                        <Scroll className="w-6 h-6 mx-auto mb-2 text-green-500" />
                        <div className="text-xl font-bold text-green-600">{book.verses}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>절</div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BibleExplorer
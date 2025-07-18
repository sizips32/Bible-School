import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Book, BookOpen, Heart, Star, ChevronRight, ChevronLeft, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input.jsx'
import { sdaDoctrines, getAllDoctrines, getDoctrinesByCategory, getDoctrineById, getDoctrineCounts } from '../data/sdaDoctrines.js'

const SDADoctrines = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDoctrine, setSelectedDoctrine] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const allDoctrines = getAllDoctrines();
  const doctrineSum = Object.values(sdaDoctrines.categories).map(cat => cat.doctrines.length).reduce((a, b) => a + b, 0);

  const filteredDoctrines = allDoctrines.filter(doctrine => {
    const matchesSearch = doctrine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctrine.summary.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const categoryOrder = [
    "godAndScripture",
    "creationAndHumanity",
    "salvationAndChrist",
    "christianLiving",
    "lastThings"
  ];

  

  const renderCategoryView = () => (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          SDA 28 기본 교리
        </h1>
        <p className={`text-lg mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          성경에 기초한 제칠일안식일예수재림교회의 28가지 기본 교리
        </p>

        {/* 검색 및 필터 */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="교리 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{allDoctrines.length}</div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>전체 교리</div>
          </CardContent>
        </Card>
        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{Object.keys(sdaDoctrines.categories).length}</div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>주요 분야</div>
          </CardContent>
        </Card>
        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {doctrineSum}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>분야별 교리 합계</div>
          </CardContent>
        </Card>
        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{filteredDoctrines.length}</div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>검색 결과</div>
          </CardContent>
        </Card>
      </div>
      
      {/* 검색 결과가 있을 때 */}
      {searchTerm && (
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            검색 결과 ({filteredDoctrines.length}개)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctrines.map(doctrine => (
              <Card
                key={doctrine.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                  }`}
                onClick={() => setSelectedDoctrine(doctrine)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${doctrine.categoryColor} flex items-center justify-center text-white font-bold text-sm`}>
                        {doctrine.id}
                      </div>
                      <div>
                        <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          {doctrine.title}
                        </CardTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {doctrine.categoryName}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {doctrine.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 분야별 카드 */}
      {!searchTerm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryOrder.map(categoryKey => {
            const category = sdaDoctrines.categories[categoryKey];
            if (!category) return null;
            return (
              <Card
                key={categoryKey}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => setSelectedCategory(categoryKey)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xl`}>
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {category.name}
                      </CardTitle>
                      <CardDescription className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {category.doctrines.length}개 교리
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {category.doctrines.slice(0, 3).map((doctrine, idx) => (
                        <div key={idx} className={`w-8 h-8 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xs font-bold`}>
                          {doctrine.id}
                        </div>
                      ))}
                      {category.doctrines.length > 3 && (
                        <div className={`w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold`}>
                          +{category.doctrines.length - 3}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
    </div>
  )

  const renderDoctrineList = () => {
    const category = sdaDoctrines.categories[selectedCategory]
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            뒤로가기
          </Button>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xl`}>
              {category.icon}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {category.name}
              </h2>
              <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {category.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.doctrines.map(doctrine => (
            <Card
              key={doctrine.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                }`}
              onClick={() => setSelectedDoctrine(doctrine)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {doctrine.id}
                    </div>
                    <div>
                      <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {doctrine.title}
                      </CardTitle>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {doctrine.summary}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderDoctrineDetail = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setSelectedDoctrine(null)}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          뒤로가기
        </Button>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedDoctrine.categoryColor || 'from-blue-500 to-blue-600'} flex items-center justify-center text-white text-xl font-bold`}>
            {selectedDoctrine.id}
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {selectedDoctrine.title}
            </h1>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {selectedDoctrine.categoryName}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                교리 설명
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`mb-4 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-blue-50'}`}>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  요약
                </h3>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedDoctrine.summary}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  상세 설명
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {selectedDoctrine.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                관련 성경구절
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDoctrine.keyVerses.map((verse, index) => (
                  <div key={index} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <div className="flex items-start gap-3">
                      <Book className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <div className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                          {typeof verse === 'string' ? verse : verse.reference}
                        </div>
                        {typeof verse === 'object' && verse.text && (
                          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            “{verse.text}”
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                학습 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    교리 번호
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {selectedDoctrine.id}번
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    관련 구절
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {selectedDoctrine.keyVerses.length}개
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  if (selectedDoctrine) {
    return renderDoctrineDetail()
  }

  if (selectedCategory) {
    return renderDoctrineList()
  }

  return renderCategoryView()
}

export default SDADoctrines

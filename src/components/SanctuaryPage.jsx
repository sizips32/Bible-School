import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Info, Home, ChevronRight, ChevronLeft, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

const SanctuaryPage = ({ isDarkMode }) => {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sanctuaryData = {
    overview: {
      title: '성소 개요',
      content: {
        description: '구약시대 성소는 하나님께서 이스라엘 백성들과 함께 거하시기 위해 지으라고 명하신 거룩한 장소입니다.',
        purpose: [
          '하나님과 인간 사이의 만남의 장소',
          '구원의 계획을 보여주는 모형',
          '예수 그리스도의 사역을 예표',
          '하늘 성소의 그림자'
        ],
        verse: '내가 그들 중에 거할 성소를 그들이 나를 위하여 짓되 (출애굽기 25:8)'
      }
    },
    structure: {
      title: '성소의 구조',
      sections: {
        courtyard: {
          name: '뜰',
          items: ['번제단', '물두멍'],
          description: '성소 바깥뜰로 모든 이스라엘 백성이 들어올 수 있는 곳',
          size: '길이 100규빗(45m) × 너비 50규빗(22.5m)'
        },
        holyPlace: {
          name: '성소',
          items: ['금촛대', '떡상', '분향단'],
          description: '제사장들이 매일 봉사하는 첫째 장막',
          size: '길이 20규빗(9m) × 너비 10규빗(4.5m) × 높이 10규빗(4.5m)'
        },
        mostHolyPlace: {
          name: '지성소',
          items: ['언약궤', '속죄소', '그룹들'],
          description: '대제사장이 일년에 한 번만 들어가는 가장 거룩한 곳',
          size: '길이 10규빗(4.5m) × 너비 10규빗(4.5m) × 높이 10규빗(4.5m)'
        }
      }
    },
    furniture: {
      title: '성소 기구들',
      items: [
        {
          name: '번제단',
          location: '뜰',
          material: '조각목에 놋을 입힘',
          purpose: '희생 제물을 드리는 곳',
          meaning: '그리스도의 십자가 희생',
          size: '길이 5규빗(2.25m) × 너비 5규빗(2.25m) × 높이 3규빗(1.35m)'
        },
        {
          name: '물두멍',
          location: '뜰',
          material: '놋',
          purpose: '제사장들이 손발을 씻는 곳',
          meaning: '성화와 정결',
          description: '회막문에서 봉사하는 여인들의 거울로 만듦'
        },
        {
          name: '떡상',
          location: '성소 북쪽',
          material: '조각목에 정금을 입힘',
          purpose: '진설병 12개를 진열',
          meaning: '생명의 떡이신 그리스도',
          size: '길이 2규빗(90cm) × 너비 1규빗(45cm) × 높이 1.5규빗(67.5cm)'
        },
        {
          name: '금촛대',
          location: '성소 남쪽',
          material: '정금 한 달란트',
          purpose: '성소를 밝히는 빛',
          meaning: '세상의 빛이신 그리스도',
          description: '7개의 등잔, 꽃과 살구 모양 장식'
        },
        {
          name: '분향단',
          location: '성소 서쪽 (휘장 앞)',
          material: '조각목에 정금을 입힘',
          purpose: '향을 피우는 곳',
          meaning: '성도들의 기도',
          size: '길이 1규빗(45cm) × 너비 1규빗(45cm) × 높이 2규빗(90cm)'
        },
        {
          name: '언약궤',
          location: '지성소',
          material: '조각목에 정금을 입힘',
          purpose: '십계명 돌판 보관',
          meaning: '하나님의 임재와 언약',
          contents: ['십계명 돌판', '만나 항아리', '아론의 싹난 지팡이']
        }
      ]
    },
    services: {
      title: '성소 봉사',
      daily: {
        name: '매일 봉사',
        activities: [
          '아침 저녁 번제 (어린 양)',
          '분향단에 향 피우기',
          '등불 관리',
          '진설병 교체 (안식일마다)'
        ],
        meaning: '그리스도의 계속적인 중보 사역'
      },
      yearly: {
        name: '연례 봉사 (대속죄일)',
        date: '7월 10일',
        activities: [
          '대제사장의 특별 의복 착용',
          '자신과 백성을 위한 속죄제',
          '지성소 입장 (일년에 한 번)',
          '아사셀 염소를 광야로 보냄'
        ],
        meaning: '최종적인 죄의 제거와 심판'
      }
    },
    feasts: {
      title: '절기와 성소',
      spring: [
        {
          name: '유월절',
          date: '1월 14일',
          meaning: '그리스도의 죽으심',
          sanctuary: '어린 양의 희생'
        },
        {
          name: '무교절',
          date: '1월 15-21일',
          meaning: '죄 없는 생활',
          sanctuary: '누룩 없는 떡'
        },
        {
          name: '초실절',
          date: '1월 16일',
          meaning: '그리스도의 부활',
          sanctuary: '첫 열매 봉헌'
        },
        {
          name: '오순절',
          date: '3월 6일',
          meaning: '성령 강림',
          sanctuary: '새 소제'
        }
      ],
      fall: [
        {
          name: '나팔절',
          date: '7월 1일',
          meaning: '재림의 경고',
          sanctuary: '나팔 소리'
        },
        {
          name: '대속죄일',
          date: '7월 10일',
          meaning: '조사 심판',
          sanctuary: '지성소 봉사'
        },
        {
          name: '초막절',
          date: '7월 15-22일',
          meaning: '최종 구원의 기쁨',
          sanctuary: '하나님과 함께 거함'
        }
      ]
    },
    heavenly: {
      title: '하늘 성소',
      description: '지상 성소는 하늘 성소의 모형이며 그림자입니다.',
      verses: [
        {
          reference: '히브리서 8:1-2',
          text: '우리가 이런 대제사장이 있으니 곧 하늘에서 위엄의 보좌 우편에 앉으신 이라 성소와 참 장막에서 섬기는 이시라'
        },
        {
          reference: '히브리서 9:24',
          text: '그리스도께서는 참 것의 그림자인 손으로 만든 성소에 들어가지 아니하시고 바로 그 하늘에 들어가사'
        }
      ],
      ministry: [
        '1844년부터 지성소 봉사 시작',
        '조사 심판 진행 중',
        '그리스도의 중보 사역',
        '죄의 최종 도말'
      ]
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {sanctuaryData.overview.title}
              </h3>
              <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {sanctuaryData.overview.content.description}
              </p>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                <p className="text-sm italic mb-2">{sanctuaryData.overview.content.verse}</p>
              </div>
            </div>
            <div>
              <h4 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                성소의 목적
              </h4>
              <ul className="space-y-2">
                {sanctuaryData.overview.content.purpose.map((purpose, idx) => (
                  <li key={idx} className={`flex items-start ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{purpose}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'structure':
        return (
          <div className="space-y-6">
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {sanctuaryData.structure.title}
            </h3>

            {/* 3D 모델 뷰어 */}
            <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                  <span>🏛️</span>
                  <span>성소 3D 모델</span>
                </CardTitle>
                <CardDescription className={isDarkMode ? 'text-slate-400' : ''}>
                  성소의 구조를 3D로 살펴보세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`p-8 text-center ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'} rounded-lg`}>
                  <div className="mb-4">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'} mb-4`}>
                      <span className="text-4xl">🏛️</span>
                    </div>
                    <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      성소 3D 모델 체험
                    </h4>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      아래 버튼을 클릭하여 성소의 3D 모델을 체험해보세요.
                      <br />
                      마우스로 드래그하여 360도 회전하며 성소의 구조를 자세히 살펴볼 수 있습니다.
                    </p>
                  </div>
                  <Button
                    onClick={() => window.open('https://ai.studio/apps/drive/17qIed5fOY_yvdAA1qNWr6IffT2RvoSWc', '_blank')}
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    3D 성소 모델 보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {Object.values(sanctuaryData.structure.sections).map((section, idx) => (
                <Card key={idx} className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                  <CardHeader>
                    <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : ''}`}>
                      {section.name}
                    </CardTitle>
                    <CardDescription className={isDarkMode ? 'text-slate-400' : ''}>
                      {section.size}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className={`mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {section.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {section.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'furniture':
        return (
          <div className="space-y-6">
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {sanctuaryData.furniture.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sanctuaryData.furniture.items.map((item, idx) => (
                <Card key={idx} className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                  <CardHeader>
                    <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : ''}`}>
                      {item.name}
                    </CardTitle>
                    <CardDescription className={isDarkMode ? 'text-slate-400' : ''}>
                      {item.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        재료:
                      </span>
                      <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.material}
                      </span>
                    </div>
                    <div>
                      <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        용도:
                      </span>
                      <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.purpose}
                      </span>
                    </div>
                    <div>
                      <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        의미:
                      </span>
                      <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.meaning}
                      </span>
                    </div>
                    {item.size && (
                      <div>
                        <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          크기:
                        </span>
                        <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {item.size}
                        </span>
                      </div>
                    )}
                    {item.contents && (
                      <div>
                        <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          내용물:
                        </span>
                        <ul className={`ml-6 mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {item.contents.map((content, cIdx) => (
                            <li key={cIdx}>• {content}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {sanctuaryData.services.title}
            </h3>

            <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : ''}>
                  {sanctuaryData.services.daily.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {sanctuaryData.services.daily.activities.map((activity, idx) => (
                    <li key={idx}>• {activity}</li>
                  ))}
                </ul>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                  <span className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    영적 의미:
                  </span>
                  <span className={`ml-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                    {sanctuaryData.services.daily.meaning}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : ''}>
                  {sanctuaryData.services.yearly.name}
                </CardTitle>
                <CardDescription className={isDarkMode ? 'text-slate-400' : ''}>
                  {sanctuaryData.services.yearly.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {sanctuaryData.services.yearly.activities.map((activity, idx) => (
                    <li key={idx}>• {activity}</li>
                  ))}
                </ul>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                  <span className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                    영적 의미:
                  </span>
                  <span className={`ml-2 ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                    {sanctuaryData.services.yearly.meaning}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'feasts':
        return (
          <div className="space-y-6">
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {sanctuaryData.feasts.title}
            </h3>

            <div>
              <h4 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                봄 절기
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {sanctuaryData.feasts.spring.map((feast, idx) => (
                  <Card key={idx} className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                    <CardHeader className="pb-3">
                      <CardTitle className={`text-base ${isDarkMode ? 'text-white' : ''}`}>
                        {feast.name}
                      </CardTitle>
                      <CardDescription className={isDarkMode ? 'text-slate-400' : ''}>
                        {feast.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            의미:
                          </span>
                          <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {feast.meaning}
                          </span>
                        </div>
                        <div>
                          <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            성소:
                          </span>
                          <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {feast.sanctuary}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                가을 절기
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {sanctuaryData.feasts.fall.map((feast, idx) => (
                  <Card key={idx} className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                    <CardHeader className="pb-3">
                      <CardTitle className={`text-base ${isDarkMode ? 'text-white' : ''}`}>
                        {feast.name}
                      </CardTitle>
                      <CardDescription className={isDarkMode ? 'text-slate-400' : ''}>
                        {feast.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            의미:
                          </span>
                          <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {feast.meaning}
                          </span>
                        </div>
                        <div>
                          <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            성소:
                          </span>
                          <span className={`ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {feast.sanctuary}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'heavenly':
        return (
          <div className="space-y-6">
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {sanctuaryData.heavenly.title}
            </h3>
            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {sanctuaryData.heavenly.description}
            </p>

            <div>
              <h4 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                성경 말씀
              </h4>
              <div className="space-y-3">
                {sanctuaryData.heavenly.verses.map((verse, idx) => (
                  <Card key={idx} className={isDarkMode ? 'bg-slate-800 border-slate-700' : ''}>
                    <CardContent className="pt-4">
                      <p className={`italic mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        "{verse.text}"
                      </p>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        - {verse.reference}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                현재의 봉사
              </h4>
              <ul className="space-y-2">
                {sanctuaryData.heavenly.ministry.map((ministry, idx) => (
                  <li key={idx} className={`flex items-start ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="text-purple-500 mr-2">•</span>
                    <span>{ministry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const sections = [
    { id: 'overview', label: '개요', icon: '🏛️' },
    { id: 'structure', label: '구조', icon: '🏗️' },
    { id: 'furniture', label: '기구', icon: '🪑' },
    { id: 'services', label: '봉사', icon: '⛪' },
    { id: 'feasts', label: '절기', icon: '📅' },
    { id: 'heavenly', label: '하늘 성소', icon: '☁️' }
  ];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className={`${isFullscreen ? 'h-full overflow-auto' : ''} max-w-7xl mx-auto`}>
        <div className={`${isFullscreen ? 'p-8' : ''}`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                🏛️ 성소와 그 봉사
              </h1>
              <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                구원의 계획을 보여주는 거룩한 모형
              </p>
            </div>
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="sm"
              className={isDarkMode ? 'border-slate-600 text-slate-300' : ''}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                variant={selectedSection === section.id ? 'default' : 'outline'}
                className={`${
                  selectedSection === section.id
                    ? ''
                    : isDarkMode
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-800'
                    : ''
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </Button>
            ))}
          </div>

          {/* Content Area */}
          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : ''} ${isFullscreen ? 'min-h-[calc(100vh-250px)]' : ''}`}>
            <CardContent className="p-6">
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SanctuaryPage;
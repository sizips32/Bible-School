import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { spiritOfProphecy } from '../data/spiritOfProphecyData.js';
import { BookOpen } from 'lucide-react';
import ellenWhiteImg from '../assets/ellen_white.jpg';

const SpiritOfProphecy = ({ isDarkMode }) => {
  return (
    <div className={`w-full max-w-5xl mx-auto p-4 md:p-8`}>
      <Card className={`mb-10 shadow-xl rounded-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
        <CardHeader className="flex flex-col items-center text-center pb-0">
          <div className="flex justify-center items-center mb-4">
            <BookOpen className={`w-12 h-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <CardTitle className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{spiritOfProphecy.title}</CardTitle>
          <p className={`text-md md:text-lg mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{spiritOfProphecy.description}</p>
          <div className="flex flex-col items-center w-full">
            <img
              src={ellenWhiteImg}
              alt="엘렌 G. 화잇"
              className="rounded-full shadow-lg w-32 h-32 object-cover border-4 border-blue-200 mb-4"
            />
            <div className="font-bold text-xl mb-1">엘렌 G. 화잇 <span className="font-normal text-base text-slate-500">(Ellen G. White, 1827~1915)</span></div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className={`text-base md:text-lg leading-relaxed text-center ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
            <p className="mb-4">
              <strong>엘렌 G. 화잇(1827~1915)</strong>은 제칠일안식일예수재림교회의 공동 창립자이자, 19세기와 20세기 초 미국의 대표적인 여성 종교 지도자입니다. 그녀는 어린 시절 사고로 인한 장애와 건강의 어려움 속에서도 신앙과 교육에 힘썼으며, 17세에 하나님께로부터 첫 환상을 받은 이후 평생 2,000회가 넘는 환상과 꿈을 통해 영적 계시를 받았습니다.
            </p>
            <p className="mb-4">
              화잇 여사는 성경을 중심으로 한 신앙, 건강한 생활, 교육, 가정, 사회봉사 등 다양한 주제에 대해 40권 이상의 책과 5,000편이 넘는 기사, 수많은 편지와 설교문을 남겼습니다. 그녀의 저술은 오늘날에도 전 세계적으로 널리 읽히며, 많은 사람들에게 영적 통찰과 실제적인 삶의 지침을 제공하고 있습니다.
            </p>
            <p>
              그녀의 삶과 사역은 단순한 교리적 가르침을 넘어, 사랑과 봉사, 진리와 희망의 메시지로 수많은 이들에게 영향을 끼쳤습니다.
            </p>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-6">
        {spiritOfProphecy.series.map((series, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={series.title}
            className={`rounded-xl shadow-md border-0 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}
          >
            <AccordionTrigger className={`px-6 py-4 text-lg md:text-xl font-semibold cursor-pointer ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
              {series.title}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <p className={`mb-6 text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{series.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {series.books.map(book => (
                  <Card
                    key={book.id}
                    className={`transform transition-transform duration-300 hover:scale-105 rounded-lg shadow ${isDarkMode ? 'bg-slate-700' : 'bg-white'}`}
                  >
                    <CardHeader>
                      <CardTitle className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{book.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-4`}>{book.summary}</p>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700">
                        {book.id}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SpiritOfProphecy;

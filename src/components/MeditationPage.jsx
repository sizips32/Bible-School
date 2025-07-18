import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plaguesData } from '../data/plaguesData.js';

const MeditationPage = ({ isDarkMode }) => {
  return (
    <div className={`p-4 md:p-8 ${isDarkMode ? 'dark' : ''}`}>
      <Card className={`mb-8 text-center ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {plaguesData.title}
          </CardTitle>
          <p className={`text-md md:text-lg mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {plaguesData.description}
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 출애굽기 10재앙 */}
        <div>
          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className={`text-2xl font-bold text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {plaguesData.exodusPlagues.title}
              </CardTitle>
              <p className={`text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {plaguesData.exodusPlagues.reference}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {plaguesData.exodusPlagues.plagues.map((plague) => (
                <div key={plague.id} className={`p-4 rounded-lg flex items-start gap-4 ${isDarkMode ? 'bg-slate-700' : 'bg-blue-50'}`}>
                  <div className="text-3xl">{plague.icon}</div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{plague.id}. {plague.name}</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{plague.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">{plague.verse}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 요한계시록 7재앙 */}
        <div>
          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className={`text-2xl font-bold text-center ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {plaguesData.revelationPlagues.title}
              </CardTitle>
              <p className={`text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {plaguesData.revelationPlagues.reference}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {plaguesData.revelationPlagues.plagues.map((plague) => (
                <div key={plague.id} className={`p-4 rounded-lg flex items-start gap-4 ${isDarkMode ? 'bg-slate-700' : 'bg-red-50'}`}>
                  <div className="text-3xl">{plague.icon}</div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{plague.id}. {plague.name}</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{plague.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">{plague.verse}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 해설 및 묵상 */}
      <Card className={`mt-8 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            해설 및 묵상
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sdaCommentary" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sdaCommentary">SDA 성경주석</TabsTrigger>
              <TabsTrigger value="spiritOfProphecy">예언의 신</TabsTrigger>
            </TabsList>
            <TabsContent value="sdaCommentary" className={`p-4 rounded-lg mt-4 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <h4 className={`font-semibold mb-2 text-lg ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>{plaguesData.commentary.sdaCommentary.title}</h4>
              <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {plaguesData.commentary.sdaCommentary.content}
              </p>
            </TabsContent>
            <TabsContent value="spiritOfProphecy" className={`p-4 rounded-lg mt-4 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <h4 className={`font-semibold mb-2 text-lg ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`}>{plaguesData.commentary.spiritOfProphecy.title}</h4>
              <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {plaguesData.commentary.spiritOfProphecy.content}
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeditationPage;

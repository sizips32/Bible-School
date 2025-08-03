import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plaguesData } from '@/data/plaguesData';

const PlagueCard = ({ plague, colorClass }) => (
  <div key={plague.id} className={`p-4 rounded-lg flex items-start gap-4 ${colorClass}`}>
    <div className="text-3xl">{plague.icon}</div>
    <div>
      <h4 className="font-semibold text-card-foreground">{plague.id}. {plague.name}</h4>
      <p className="text-sm text-muted-foreground">{plague.description}</p>
      <Badge variant="outline" className="mt-2 text-xs">{plague.verse}</Badge>
    </div>
  </div>
);

const ExodusPlaguesContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
        {plaguesData.exodusPlagues.title}
      </CardTitle>
      <p className="text-center text-sm text-muted-foreground">
        {plaguesData.exodusPlagues.reference}
      </p>
    </CardHeader>
    <CardContent className="space-y-4">
      {plaguesData.exodusPlagues.plagues.map((plague) => (
        <PlagueCard key={plague.id} plague={plague} colorClass="bg-blue-50 dark:bg-slate-800" />
      ))}
    </CardContent>
  </Card>
);

const RevelationPlaguesContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-center text-red-600 dark:text-red-400">
        {plaguesData.revelationPlagues.title}
      </CardTitle>
      <p className="text-center text-sm text-muted-foreground">
        {plaguesData.revelationPlagues.reference}
      </p>
    </CardHeader>
    <CardContent className="space-y-4">
      {plaguesData.revelationPlagues.plagues.map((plague) => (
        <PlagueCard key={plague.id} plague={plague} colorClass="bg-red-50 dark:bg-slate-800" />
      ))}
    </CardContent>
  </Card>
);

const CommentaryContent = () => (
    <Card className="mt-8">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-center">
        해설 및 묵상
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="sdaCommentary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sdaCommentary">SDA 성경주석</TabsTrigger>
          <TabsTrigger value="spiritOfProphecy">예언의 신</TabsTrigger>
        </TabsList>
        <TabsContent value="sdaCommentary" className="p-4 rounded-lg mt-4 bg-muted">
          <h4 className="font-semibold mb-2 text-lg text-amber-700 dark:text-amber-400">{plaguesData.commentary.sdaCommentary.title}</h4>
          <p className="text-base leading-relaxed text-foreground/80">
            {plaguesData.commentary.sdaCommentary.content}
          </p>
        </TabsContent>
        <TabsContent value="spiritOfProphecy" className="p-4 rounded-lg mt-4 bg-muted">
          <h4 className="font-semibold mb-2 text-lg text-teal-700 dark:text-teal-400">{plaguesData.commentary.spiritOfProphecy.title}</h4>
          <p className="text-base leading-relaxed text-foreground/80">
            {plaguesData.commentary.spiritOfProphecy.content}
          </p>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

const MeditationPage = () => {
  return (
    <div className="container mx-auto p-4">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">{plaguesData.title}</h1>
            <p className="text-md md:text-lg mt-2 text-muted-foreground">{plaguesData.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ExodusPlaguesContent />
            <RevelationPlaguesContent />
        </div>

        <CommentaryContent />
    </div>
  );
};

export default MeditationPage;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  RefreshCw, 
  Check, 
  ChevronLeft,
  BookOpen,
  Wind,
  Music,
  Users
} from 'lucide-react';
import type { NameDetail } from '@/types';

interface NameDetailPageProps {
  name?: NameDetail;
  isFavorite: boolean;
  onFavorite: () => void;
  onChange: () => void;
  onSelect: () => void;
  onBack: () => void;
}

export function NameDetailPage({ 
  name, 
  isFavorite, 
  onFavorite, 
  onChange, 
  onSelect,
  onBack
}: NameDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!name) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-4xl">
          ✨
        </div>
        <h3 className="text-lg font-medium text-gray-600">暂无推荐名字</h3>
        <p className="text-sm text-gray-400 mt-2">请先完成对话流程</p>
        <Button onClick={onBack} className="mt-4">
          返回对话
        </Button>
      </div>
    );
  }

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      '金': 'bg-yellow-500',
      '木': 'bg-green-500',
      '水': 'bg-blue-500',
      '火': 'bg-red-500',
      '土': 'bg-amber-600',
    };
    return colors[wuxing] || 'bg-gray-500';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600">
          <ChevronLeft className="w-5 h-5 mr-1" />
          返回
        </Button>
        <span className="font-medium text-gray-800">名字详情</span>
        <Button variant="ghost" size="sm" onClick={onFavorite}>
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </Button>
      </div>

      {/* 名字大字展示 */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
        <div className="flex justify-center items-end gap-4">
          {name.characters.map((char, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-500 mb-1">{char.pinyin}</div>
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-white shadow-xl border-2 border-amber-200 flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-800">{char.char}</span>
                </div>
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${getWuxingColor(char.wuxing)} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                  {char.wuxing}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <span className="text-xl text-gray-600 font-medium">{name.pinyin}</span>
          <Badge className="ml-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1">
            综合评价：{name.score >= 90 ? '大吉' : name.score >= 80 ? '吉' : '平'}
          </Badge>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 bg-gray-50 p-1 sticky top-0">
            <TabsTrigger value="overview" className="text-xs">概览</TabsTrigger>
            <TabsTrigger value="characters" className="text-xs">汉字</TabsTrigger>
            <TabsTrigger value="yinyun" className="text-xs">音韵</TabsTrigger>
            <TabsTrigger value="wuxing" className="text-xs">五行</TabsTrigger>
          </TabsList>

          {/* 概览 */}
          <TabsContent value="overview" className="p-4 space-y-4">
            {/* 寓意 */}
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-amber-900">寓意</span>
              </div>
              <p className="text-gray-700">{name.meaning}</p>
              <p className="text-sm text-amber-600 mt-1">{name.source}</p>
            </div>

            {/* 专属寓意 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
              <span className="font-semibold text-purple-900">专属寓意</span>
              <p className="text-gray-700 mt-2 text-sm leading-relaxed">{name.personalizedMeaning}</p>
            </div>

            {/* 重名度 */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">重名度</span>
                <Badge className="bg-green-100 text-green-700">{name.uniqueness}</Badge>
              </div>
              <p className="text-sm text-gray-600">{name.uniquenessCount}</p>
            </div>
          </TabsContent>

          {/* 汉字解析 */}
          <TabsContent value="characters" className="p-4 space-y-4">
            {name.characters.map((char, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-bold text-gray-800">{char.char}</span>
                  <div className={`w-8 h-8 rounded-full ${getWuxingColor(char.wuxing)} flex items-center justify-center text-white text-sm font-bold`}>
                    {char.wuxing}
                  </div>
                  <span className="text-gray-500">{char.pinyin}</span>
                </div>
                <p className="text-gray-700 font-medium">{char.meaning}</p>
                <p className="text-sm text-gray-500 mt-2">{char.explanation}</p>
                <p className="text-xs text-amber-600 mt-3 italic">{char.source}</p>
              </div>
            ))}
          </TabsContent>

          {/* 音韵分析 */}
          <TabsContent value="yinyun" className="p-4">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Music className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900">音韵评分</span>
                <Badge className="bg-purple-100 text-purple-700 text-lg">{name.yinyun.score}分</Badge>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <span className="text-sm text-gray-500">声调组合</span>
                  <p className="text-gray-800 font-medium">{name.yinyun.tone}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <span className="text-sm text-gray-500">声母组合</span>
                  <p className="text-gray-800 font-medium">{name.yinyun.initials}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 五行分析 */}
          <TabsContent value="wuxing" className="p-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Wind className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">五行分析</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-800 font-medium mb-2">{name.wuxing}</p>
                <p className="text-sm text-blue-600">{name.baziMatch}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部操作栏 */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onChange}
            className="flex-1"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            换一个
          </Button>
          <Button
            onClick={onSelect}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
          >
            <Check className="w-4 h-4 mr-2" />
            就选这个
          </Button>
        </div>
      </div>
    </div>
  );
}
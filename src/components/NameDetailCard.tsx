import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  RefreshCw, 
  Check, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Wind,
  Music,
  Users
} from 'lucide-react';
import type { NameDetail } from '@/types';

interface NameDetailCardProps {
  nameDetail: NameDetail;
  onFavorite?: () => void;
  onChange?: () => void;
  onSelect?: () => void;
}

export function NameDetailCard({ 
  nameDetail, 
  onFavorite, 
  onChange, 
  onSelect 
}: NameDetailCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.();
  };

  const getWuxingColor = (wuxing: string) => {
    const colors: Record<string, string> = {
      '金': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      '木': 'bg-green-100 text-green-700 border-green-300',
      '水': 'bg-blue-100 text-blue-700 border-blue-300',
      '火': 'bg-red-100 text-red-700 border-red-300',
      '土': 'bg-amber-100 text-amber-700 border-amber-300',
    };
    return colors[wuxing] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-2 border-amber-200/50 shadow-xl overflow-hidden">
      {/* 头部 - 名字展示 */}
      <CardHeader className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-b border-amber-100 px-3 sm:px-6 py-4">
        <div className="text-center">
          {/* 名字大字 */}
          <div className="flex justify-center items-end gap-2 sm:gap-4 mb-3">
            {nameDetail.characters.map((char, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{char.pinyin}</div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white shadow-lg border-2 border-amber-200 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-800">{char.char}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`mt-2 text-xs ${getWuxingColor(char.wuxing)}`}
                >
                  {char.wuxing}
                </Badge>
              </div>
            ))}
          </div>
          
          {/* 拼音和评价 */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-base sm:text-lg text-gray-600 font-medium">{nameDetail.pinyin}</span>
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs">
              综合评价：{nameDetail.score >= 90 ? '大吉' : nameDetail.score >= 80 ? '吉' : '平'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* 核心信息 - 始终显示 */}
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* 寓意 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900">寓意</h4>
              <p className="text-sm text-gray-600 mt-1">{nameDetail.meaning}</p>
              <p className="text-xs text-amber-600 mt-1">{nameDetail.source}</p>
            </div>
          </div>

          {/* 五行分析 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Wind className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">五行分析</h4>
              <p className="text-sm text-gray-600 mt-1">{nameDetail.wuxing}</p>
              <p className="text-xs text-blue-600 mt-1">{nameDetail.baziMatch}</p>
            </div>
          </div>

          {/* 展开/收起按钮 */}
          <Button
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
            className="w-full text-gray-500 hover:text-gray-700"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                收起详细信息
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                查看完整解析
              </>
            )}
          </Button>
        </div>

        {/* 详细信息 - 展开显示 */}
        {expanded && (
          <div className="border-t border-amber-100 bg-amber-50/30">
            <Tabs defaultValue="characters" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-amber-100/50">
                <TabsTrigger value="characters" className="text-xs">汉字解析</TabsTrigger>
                <TabsTrigger value="yinyun" className="text-xs">音韵分析</TabsTrigger>
                <TabsTrigger value="uniqueness" className="text-xs">重名度</TabsTrigger>
              </TabsList>

              {/* 汉字解析 */}
              <TabsContent value="characters" className="p-4 space-y-4">
                {nameDetail.characters.map((char, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-800">{char.char}</span>
                      <Badge className={getWuxingColor(char.wuxing)}>{char.wuxing}</Badge>
                      <span className="text-sm text-gray-500">{char.pinyin}</span>
                    </div>
                    <p className="text-sm text-gray-700">{char.meaning}</p>
                    <p className="text-xs text-gray-500 mt-1">{char.explanation}</p>
                    <p className="text-xs text-amber-600 mt-2 italic">{char.source}</p>
                  </div>
                ))}
              </TabsContent>

              {/* 音韵分析 */}
              <TabsContent value="yinyun" className="p-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Music className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-gray-800">音韵评分</span>
                    <Badge className="bg-purple-100 text-purple-700">{nameDetail.yinyun.score}分</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">声调组合：</span>
                      <span className="text-gray-800">{nameDetail.yinyun.tone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">声母组合：</span>
                      <span className="text-gray-800">{nameDetail.yinyun.initials}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 重名度 */}
              <TabsContent value="uniqueness" className="p-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-gray-800">重名度分析</span>
                    <Badge className="bg-green-100 text-green-700">{nameDetail.uniqueness}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{nameDetail.uniquenessCount}</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* 专属寓意 */}
            <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100">
              <h4 className="font-semibold text-amber-900 mb-2">专属寓意</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{nameDetail.personalizedMeaning}</p>
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="p-3 sm:p-4 border-t border-amber-100 flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={handleFavorite}
            className={`flex-1 text-xs sm:text-sm px-2 ${isFavorited ? 'bg-red-50 border-red-300 text-red-600' : ''}`}
          >
            <Heart className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${isFavorited ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFavorited ? '已收藏' : '收藏'}</span>
            <span className="sm:hidden">收藏</span>
          </Button>
          <Button
            variant="outline"
            onClick={onChange}
            className="flex-1 text-xs sm:text-sm px-2"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">换一个</span>
            <span className="sm:hidden">换</span>
          </Button>
          <Button
            onClick={onSelect}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm px-2"
          >
            <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            就选这个
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, SkipForward, Sparkles } from 'lucide-react';

interface AdditionalInfoCardProps {
  onSubmit: (info: { tabooWords: string[]; generationWord: string; favoriteImagery: string[] }) => void;
  onSkip: () => void;
}

const imageryOptions = ['山', '水', '云', '海', '文', '武', '诗', '书', '竹', '梅', '兰', '松'];

export function AdditionalInfoCard({ onSubmit, onSkip }: AdditionalInfoCardProps) {
  const [tabooWords, setTabooWords] = useState<string[]>([]);
  const [currentTaboo, setCurrentTaboo] = useState('');
  const [generationWord, setGenerationWord] = useState('');
  const [favoriteImagery, setFavoriteImagery] = useState<string[]>([]);

  const handleAddTaboo = () => {
    if (currentTaboo.trim() && !tabooWords.includes(currentTaboo.trim())) {
      setTabooWords([...tabooWords, currentTaboo.trim()]);
      setCurrentTaboo('');
    }
  };

  const handleRemoveTaboo = (word: string) => {
    setTabooWords(tabooWords.filter(w => w !== word));
  };

  const toggleImagery = (imagery: string) => {
    if (favoriteImagery.includes(imagery)) {
      setFavoriteImagery(favoriteImagery.filter(i => i !== imagery));
    } else {
      setFavoriteImagery([...favoriteImagery, imagery]);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      tabooWords,
      generationWord,
      favoriteImagery
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-purple-200/50 shadow-lg bg-gradient-to-br from-white to-purple-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
          <Sparkles className="w-5 h-5 text-purple-600" />
          补充信息（选填）
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 避讳字 */}
        <div className="space-y-2">
          <Label className="text-purple-900 font-medium flex items-center gap-2">
            避讳字
            <span className="text-xs text-gray-400 font-normal">（如长辈名字中的字）</span>
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="输入避讳字，按回车添加"
              value={currentTaboo}
              onChange={(e) => setCurrentTaboo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTaboo()}
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400/20"
              maxLength={1}
            />
            <Button
              variant="outline"
              onClick={handleAddTaboo}
              disabled={!currentTaboo.trim()}
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              添加
            </Button>
          </div>
          {tabooWords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tabooWords.map((word, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-red-50 text-red-700 border border-red-200 flex items-center gap-1"
                >
                  {word}
                  <button
                    onClick={() => handleRemoveTaboo(word)}
                    className="ml-1 hover:text-red-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* 字辈 */}
        <div className="space-y-2">
          <Label className="text-purple-900 font-medium flex items-center gap-2">
            字辈要求
            <span className="text-xs text-gray-400 font-normal">（如有家谱字辈）</span>
          </Label>
          <Input
            placeholder="如：需要中间是「文」字"
            value={generationWord}
            onChange={(e) => setGenerationWord(e.target.value)}
            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400/20"
          />
        </div>

        {/* 喜欢的意象 */}
        <div className="space-y-2">
          <Label className="text-purple-900 font-medium">喜欢的意象</Label>
          <div className="flex flex-wrap gap-2">
            {imageryOptions.map((imagery) => (
              <button
                key={imagery}
                onClick={() => toggleImagery(imagery)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${favoriteImagery.includes(imagery)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {imagery}
              </button>
            ))}
          </div>
        </div>

        {/* 按钮 */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onSkip}
            className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            跳过
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            确认
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
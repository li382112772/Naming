import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, Mountain, Sparkles } from 'lucide-react';
import type { NameDirection } from '@/types';

interface DirectionCardProps {
  directions: NameDirection[];
  onSelect: (directionId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  '📖': BookOpen,
  '⛰️': Mountain,
  '✨': Sparkles
};

export function DirectionCard({ directions, onSelect }: DirectionCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? directions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === directions.length - 1 ? 0 : prev + 1));
  };

  const currentDirection = directions[currentIndex];
  const Icon = iconMap[currentDirection.icon] || BookOpen;

  const getGradient = (id: string) => {
    switch (id) {
      case 'poetic':
        return 'from-emerald-500 via-teal-500 to-cyan-500';
      case 'mountain':
        return 'from-amber-500 via-orange-500 to-red-500';
      case 'modern':
        return 'from-blue-500 via-indigo-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getBgColor = (id: string) => {
    switch (id) {
      case 'poetic':
        return 'bg-emerald-50 border-emerald-200';
      case 'mountain':
        return 'bg-amber-50 border-amber-200';
      case 'modern':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* 导航按钮 */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* 卡片 */}
        <Card className={`border-2 ${getBgColor(currentDirection.id)} shadow-xl overflow-hidden`}>
          <CardContent className="p-6">
            {/* 标题区域 */}
            <div className="text-center mb-4">
              <div className={`
                w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${getGradient(currentDirection.id)}
                flex items-center justify-center text-white shadow-lg mb-3
              `}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{currentDirection.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{currentDirection.description}</p>
            </div>

            {/* 示例名字 */}
            <div className="flex justify-center gap-3 mb-4">
              {currentDirection.sampleNames.map((name, index) => (
                <div
                  key={index}
                  className={`
                    px-4 py-2 rounded-lg bg-white shadow-md
                    border border-gray-100 font-semibold text-gray-700
                  `}
                >
                  {name}
                </div>
              ))}
            </div>

            {/* 风格描述 */}
            <div className="bg-white/60 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 text-center">{currentDirection.style}</p>
            </div>

            {/* 选择按钮 */}
            <Button
              onClick={() => onSelect(currentDirection.id)}
              className={`
                w-full bg-gradient-to-r ${getGradient(currentDirection.id)}
                text-white font-semibold py-3 rounded-xl shadow-lg
                hover:shadow-xl transition-shadow
              `}
            >
              查看详情
            </Button>
          </CardContent>
        </Card>

        {/* 指示器 */}
        <div className="flex justify-center gap-2 mt-4">
          {directions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? 'w-6 bg-gradient-to-r from-amber-500 to-orange-500' 
                  : 'bg-gray-300 hover:bg-gray-400'
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
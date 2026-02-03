import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Sparkles, CircleDot, Lightbulb, Check } from 'lucide-react';

interface ExpectationCardProps {
  onSelect: (style: string) => void;
}

const options = [
  {
    id: 'poetic',
    title: '诗意文化',
    description: '希望有诗意和文化底蕴',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700'
  },
  {
    id: 'modern',
    title: '现代简约',
    description: '希望简单好记，现代一些',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    id: 'traditional',
    title: '传统五行',
    description: '希望符合传统五行八字',
    icon: CircleDot,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700'
  },
  {
    id: 'unsure',
    title: '需要建议',
    description: '还没想好，需要您的建议',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700'
  }
];

export function ExpectationCard({ onSelect }: ExpectationCardProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => onSelect(id), 300);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = selected === option.id;
        
        return (
          <Card
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`
              cursor-pointer transition-all duration-300 border-2
              ${option.borderColor} ${option.bgColor}
              ${isSelected ? 'ring-2 ring-offset-2 ring-' + option.color.split('-')[1] + '-400 scale-[1.02]' : 'hover:scale-[1.01]'}
            `}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                bg-gradient-to-br ${option.color} text-white shadow-lg
              `}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <h3 className={`font-semibold ${option.textColor}`}>
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {option.description}
                </p>
              </div>
              
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                transition-all duration-300
                ${isSelected 
                  ? `bg-gradient-to-r ${option.color} border-transparent` 
                  : 'border-gray-300'
                }
              `}>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
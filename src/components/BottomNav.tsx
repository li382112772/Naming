import { MessageCircle, BookOpen, Sparkles, Heart } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'chat' | 'bazi' | 'names' | 'favorites';
  onTabChange: (tab: 'chat' | 'bazi' | 'names' | 'favorites') => void;
  canSwitchTab: boolean;
  favoriteCount: number;
}

const tabs = [
  { id: 'chat' as const, label: '对话', icon: MessageCircle },
  { id: 'bazi' as const, label: '八字', icon: BookOpen },
  { id: 'names' as const, label: '名字', icon: Sparkles },
  { id: 'favorites' as const, label: '收藏', icon: Heart },
];

export function BottomNav({ activeTab, onTabChange, canSwitchTab, favoriteCount }: BottomNavProps) {
  return (
    <nav className="bg-white border-t border-gray-100 shadow-lg sticky bottom-0 z-50">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDisabled = !canSwitchTab && tab.id !== 'chat';
            
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && onTabChange(tab.id)}
                disabled={isDisabled}
                className={`
                  relative flex flex-col items-center justify-center py-2 px-4 min-w-[64px]
                  transition-all duration-200
                  ${isActive 
                    ? 'text-amber-600' 
                    : isDisabled 
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <div className={`
                  relative p-2 rounded-xl transition-all duration-200
                  ${isActive ? 'bg-amber-100' : ''}
                `}>
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                  {tab.id === 'favorites' && favoriteCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 w-8 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
// ChatMessage component
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BabyInfoCard } from './BabyInfoCard';
import { ExpectationCard } from './ExpectationCard';
import { AdditionalInfoCard } from './AdditionalInfoCard';
import { BaziAnalysisCard } from './BaziAnalysisCard';
import { DirectionCard } from './DirectionCard';
import { NameDetailCard } from './NameDetailCard';
import type { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
  message: ChatMessageType;
  onBabyInfoSubmit: (info: any) => void;
  onExpectationSelect: (style: string) => void;
  onAdditionalInfoSubmit: (info: any) => void;
  onAdditionalInfoSkip: () => void;
  onDirectionSelect: (directionId: string) => void;
  onNameSelect: (name: string) => void;
  onConfirmName: (name: string) => void;

}

export function ChatMessage({ 
  message, 
  onBabyInfoSubmit, 
  onExpectationSelect,
  onAdditionalInfoSubmit,
  onAdditionalInfoSkip,
  onDirectionSelect,
  onNameSelect,
  onConfirmName
}: ChatMessageProps) {
  const isAI = message.type === 'ai';

  return (
    <div className={`flex gap-2 sm:gap-3 ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* 头像 */}
      <Avatar className={`w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 ${isAI ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
        <AvatarFallback className="text-white text-xs sm:text-sm font-bold">
          {isAI ? 'AI' : '我'}
        </AvatarFallback>
      </Avatar>

      {/* 消息内容 */}
      <div className={`flex-1 max-w-[88%] sm:max-w-[85%] ${isAI ? '' : 'text-right'}`}>
        {/* 文本内容 */}
        {message.content && (
          <div 
            className={`
              inline-block px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-left whitespace-pre-line text-sm sm:text-base
              ${isAI 
                ? 'bg-white border border-gray-100 shadow-sm text-gray-800' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              }
            `}
          >
            {message.content}
          </div>
        )}

        {/* 嵌入组件 */}
        {message.component && isAI && (
          <div className="mt-3">
            {message.component === 'babyInfo' && (
              <BabyInfoCard 
                onSubmit={onBabyInfoSubmit} 
                onSkip={() => onBabyInfoSubmit({ surname: '未知', gender: 'unknown', birthDate: new Date().toISOString().split('T')[0] })}
              />
            )}
            
            {message.component === 'expectation' && (
              <ExpectationCard onSelect={onExpectationSelect} />
            )}
            
            {message.component === 'additionalInfo' && (
              <AdditionalInfoCard 
                onSubmit={onAdditionalInfoSubmit}
                onSkip={onAdditionalInfoSkip}
              />
            )}
            
            {message.component === 'bazi' && message.data && (
              <BaziAnalysisCard 
                bazi={message.data.bazi} 
                wuxing={message.data.wuxing} 
              />
            )}
            
            {message.component === 'direction' && message.data && (
              <DirectionCard 
                directions={message.data.directions} 
                onSelect={onDirectionSelect}
              />
            )}
            
            {message.component === 'nameDetail' && message.data && (
              <NameDetailCard 
                nameDetail={message.data.name}
                onFavorite={() => console.log('收藏')}
                onChange={() => onNameSelect(message.data.name.name)}
                onSelect={() => onConfirmName(message.data.name.name)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
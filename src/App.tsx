import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, MessageCircle, RotateCcw, User, BookOpen, Heart } from 'lucide-react';
import { useNamingFlow } from '@/hooks/useNamingFlow';
import { ChatMessage } from '@/components/ChatMessage';
import { TypingIndicator } from '@/components/TypingIndicator';
import { BottomNav } from '@/components/BottomNav';
import { NameDetailPage } from '@/components/NameDetailPage';
import { BaziDetailPage } from '@/components/BaziDetailPage';
import { FavoritesPage } from '@/components/FavoritesPage';
import './App.css';

function App() {
  const {
    messages,
    isTyping,
    babyInfo,
    startFlow,
    submitBabyInfo,
    selectExpectation,
    submitAdditionalInfo,
    selectDirection,
    selectName,
    confirmNameSelection,
    getCurrentName,
    getBaziData
  } = useNamingFlow();

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'bazi' | 'names' | 'favorites'>('chat');
  // 页面状态由 activeTab 控制，不需要单独的 show/hide 状态
  const [favorites, setFavorites] = useState<string[]>([]);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollViewportRef.current && activeTab === 'chat') {
      const viewport = scrollViewportRef.current;
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping, activeTab]);

  const handleStart = () => {
    setHasStarted(true);
    startFlow();
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleFavorite = (name: string) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter(n => n !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  const handleConfirmName = (name: string) => {
    confirmNameSelection(name);
    setActiveTab('chat');
  };

  // 如果不在对话流程中，底部导航可以切换
  const canSwitchTab = messages.length > 5;

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
        {/* 顶部导航 */}
        <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">起名大师</h1>
                <p className="text-xs text-gray-500">AI 赋能，名承古今——给孩子一生的好寓意</p>
              </div>
            </div>
          </div>
        </header>

        {/* 欢迎内容 */}
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-xl mb-6">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                欢迎来到起名大师
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                区别于传统起名的“效率低下”和纯AI工具的“冰冷生成”，
                起名大师精准，个性，智能得为宝宝定制专属好名。
              </p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">轻松填写</div>
                  <div className="text-sm text-gray-500">宝宝基本信息</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">了解期望</div>
                  <div className="text-sm text-gray-500">选择喜欢的风格</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">精准推荐</div>
                  <div className="text-sm text-gray-500">每个名字都有故事</div>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              开始起名之旅
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
      {/* 顶部导航 */}
      <header className="bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-sm">起名大师</h1>
              {babyInfo?.surname && (
                <p className="text-xs text-gray-500">{babyInfo.surname}姓宝宝</p>
              )}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 overflow-hidden relative">
        <div className="max-w-lg mx-auto h-full">
          {/* 对话流 */}
          {activeTab === 'chat' && (
            <ScrollArea 
              ref={scrollRef}
              viewportRef={scrollViewportRef}
              className="h-[calc(100vh-140px)] px-4"
            >
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onBabyInfoSubmit={submitBabyInfo}
                    onExpectationSelect={selectExpectation}
                    onAdditionalInfoSubmit={submitAdditionalInfo}
                    onAdditionalInfoSkip={() => submitAdditionalInfo({ skip: true })}
                    onDirectionSelect={(id) => {
                      selectDirection(id);
                      setActiveTab('names');
                    }}
                    onNameSelect={(name) => {
                      selectName(name);
                      setActiveTab('names');
                    }}
                    onConfirmName={handleConfirmName}
                  />
                ))}
                
                {isTyping && <TypingIndicator />}
              </div>
            </ScrollArea>
          )}

          {/* 八字分析页 */}
          {activeTab === 'bazi' && (
            <BaziDetailPage 
              data={getBaziData()}
              onBack={() => setActiveTab('chat')}
            />
          )}

          {/* 名字推荐页 */}
          {activeTab === 'names' && (
            <NameDetailPage
              name={getCurrentName() || undefined}
              isFavorite={favorites.includes(getCurrentName()?.name || '')}
              onFavorite={() => {
                const currentName = getCurrentName();
                if (currentName) handleFavorite(currentName.name);
              }}
              onChange={() => {
                const currentName = getCurrentName();
                if (currentName) selectName(currentName.name);
              }}
              onSelect={() => {
                const currentName = getCurrentName();
                if (currentName) handleConfirmName(currentName.name);
              }}
              onBack={() => setActiveTab('chat')}
            />
          )}

          {/* 收藏夹页 */}
          {activeTab === 'favorites' && (
            <FavoritesPage
              favorites={favorites}
              onBack={() => setActiveTab('chat')}
            />
          )}
        </div>
      </main>

      {/* 底部导航 */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        canSwitchTab={canSwitchTab}
        favoriteCount={favorites.length}
      />
    </div>
  );
}

export default App;
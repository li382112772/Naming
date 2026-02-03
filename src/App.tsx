import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, MessageCircle, RotateCcw, User, BookOpen, Heart, ChevronDown, Plus } from 'lucide-react';
import { useNamingFlow } from '@/hooks/useNamingFlow';
import { ChatMessage } from '@/components/ChatMessage';
import { TypingIndicator } from '@/components/TypingIndicator';
import { BottomNav } from '@/components/BottomNav';
import { NameDetailPage } from '@/components/NameDetailPage';
import { BaziDetailPage } from '@/components/BaziDetailPage';
import { FavoritesPage } from '@/components/FavoritesPage';
import type { BabySession, FavoriteItem } from '@/types';
import './App.css';

function App() {
  const {
    messages,
    isTyping,
    babyInfo,
    currentSession,
    sessions,
    favorites,
    startFlow,
    submitBabyInfo,
    selectExpectation,
    submitAdditionalInfo,
    selectDirection,
    selectName,
    changeName,
    confirmNameSelection,
    switchSession,
    addFavorite,
    removeFavorite,
    isFavorited,
    getCurrentName,
    getBaziData
  } = useNamingFlow();

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'bazi' | 'names' | 'favorites'>('chat');
  
  // 查看收藏详情的状态
  const [viewingFavorite, setViewingFavorite] = useState<FavoriteItem | null>(null);
  // 是否显示宝宝选择器
  const [showSessionSelector, setShowSessionSelector] = useState(false);

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
    // 如果没有当前会话，等待用户填写宝宝信息后创建
    if (!currentSession) {
      // 延迟启动流程，等待会话创建
      setTimeout(() => startFlow(), 100);
    } else {
      startFlow();
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  // 开始为新的宝宝起名
  const handleNewBaby = () => {
    setHasStarted(true);
    // 等待用户填写宝宝信息，提交后会自动创建新会话
    setTimeout(() => startFlow(), 100);
  };

  // 切换宝宝会话
  const handleSwitchSession = (sessionId: string) => {
    switchSession(sessionId);
    setShowSessionSelector(false);
    setActiveTab('chat');
  };

  const handleFavorite = (name: string) => {
    const nameDetail = getCurrentName();
    if (nameDetail) {
      addFavorite(name, nameDetail);
    }
  };

  const handleConfirmName = (name: string) => {
    confirmNameSelection(name);
    setActiveTab('chat');
  };

  // 处理换一个
  const handleChangeName = () => {
    changeName();
  };

  // 处理收藏点击打开详情
  const handleFavoriteClick = (favorite: FavoriteItem) => {
    setViewingFavorite(favorite);
  };

  // 关闭收藏详情
  const handleCloseFavoriteDetail = () => {
    setViewingFavorite(null);
  };

  // 如果不在对话流程中，底部导航可以切换
  const canSwitchTab = messages.length > 5;

  // 欢迎页
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
        {/* 顶部导航 - 左对齐 */}
        <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm">
          <div className="max-w-lg mx-auto px-4 py-3">
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
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-sm mx-auto px-4 py-8">
            {/* Logo 区域 */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-xl mb-6">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                欢迎来到起名大师
              </h2>
              
              <p className="text-gray-600 leading-relaxed text-center px-2">
                以千年文化为根，借AI智慧为翼，起名大师精准、个性、智能地为宝宝定制专属好名。
              </p>
            </div>
            
            {/* 功能卡片 */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-amber-100/50">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">轻松填写</div>
                  <div className="text-sm text-gray-500">宝宝基本信息</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-amber-100/50">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">了解期望</div>
                  <div className="text-sm text-gray-500">选择喜欢的风格</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-amber-100/50">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">精准推荐</div>
                  <div className="text-sm text-gray-500">每个名字都有故事</div>
                </div>
              </div>
            </div>
            
            {/* 历史会话列表 */}
            {sessions.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">我的宝宝 ({sessions.length}个)</h3>
                  <span className="text-xs text-gray-400">点击切换查看</span>
                </div>
                <div className="space-y-2">
                  {sessions.map(session => (
                    <button
                      key={session.id}
                      onClick={() => handleSwitchSession(session.id)}
                      className="w-full flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-amber-100/50 hover:border-amber-300 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {session.babyInfo.surname}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-800">
                          {session.babyInfo.surname}姓{session.babyInfo.gender === 'boy' ? '男' : session.babyInfo.gender === 'girl' ? '女' : ''}宝
                          {session.selectedName && (
                            <span className="ml-2 text-xs text-green-600">✓ 已选定</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {session.selectedName ? session.selectedName : '起名进行中...'}
                        </div>
                      </div>
                      <div className="flex items-center text-amber-600">
                        <span className="text-xs mr-1">进入</span>
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* 开始按钮 */}
            <div className="space-y-3">
              <Button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-5 h-5 mr-2" />
                {sessions.length > 0 ? '为新的宝宝起名' : '开始起名之旅'}
              </Button>
              
              {sessions.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('favorites')}
                  className="w-full py-5 rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  查看收藏 ({favorites.length})
                </Button>
              )}
            </div>
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
          <button 
            className="flex items-center gap-3"
            onClick={() => sessions.length > 1 && setShowSessionSelector(!showSessionSelector)}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-gray-800 text-sm">起名大师</h1>
              {babyInfo?.surname ? (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  {babyInfo.surname}姓宝宝
                  {sessions.length > 1 && (
                    <ChevronDown className={`w-3 h-3 transition-transform ${showSessionSelector ? 'rotate-180' : ''}`} />
                  )}
                </p>
              ) : (
                <p className="text-xs text-gray-500">AI智能起名</p>
              )}
            </div>
          </button>
          
          <div className="flex items-center gap-2">
            {/* 切换宝宝按钮 - 更明显 */}
            {sessions.length > 1 && !showSessionSelector && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSessionSelector(true)}
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 bg-amber-50/50"
              >
                <span className="text-xs mr-1">切换宝宝</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-gray-500 hover:text-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* 宝宝选择器下拉菜单 */}
        {showSessionSelector && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-amber-100 shadow-lg z-50">
            <div className="max-w-lg mx-auto p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">切换宝宝</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sessions.map(session => (
                  <button
                    key={session.id}
                    onClick={() => handleSwitchSession(session.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      session.id === currentSession?.id 
                        ? 'bg-amber-50 border border-amber-200' 
                        : 'bg-gray-50 hover:bg-amber-50/50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {session.babyInfo.surname}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-800 text-sm">
                        {session.babyInfo.surname}姓{session.babyInfo.gender === 'boy' ? '男' : session.babyInfo.gender === 'girl' ? '女' : ''}宝
                      </div>
                      <div className="text-xs text-gray-500">
                        {session.selectedName ? `已选定：${session.selectedName}` : '起名中...'}
                      </div>
                    </div>
                    {session.id === currentSession?.id && (
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    )}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setShowSessionSelector(false);
                    handleNewBaby();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">为新的宝宝起名</span>
                </button>
              </div>
            </div>
          </div>
        )}
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
              isFavorite={isFavorited(getCurrentName()?.name || '')}
              onFavorite={() => {
                const currentName = getCurrentName();
                if (currentName) handleFavorite(currentName.name);
              }}
              onChange={handleChangeName}
              onSelect={() => {
                const currentName = getCurrentName();
                if (currentName) handleConfirmName(currentName.name);
              }}
              onBack={() => setActiveTab('chat')}
            />
          )}

          {/* 收藏夹页 */}
          {activeTab === 'favorites' && !viewingFavorite && (
            <FavoritesPage
              favorites={favorites}
              sessions={sessions}
              onBack={() => setActiveTab('chat')}
              onViewDetail={handleFavoriteClick}
              onRemoveFavorite={removeFavorite}
            />
          )}
          
          {/* 收藏名字详情页 */}
          {activeTab === 'favorites' && viewingFavorite && (
            <NameDetailPage
              name={viewingFavorite.nameDetail}
              isFavorite={true}
              onFavorite={() => removeFavorite(viewingFavorite.id)}
              onChange={() => {}}
              onSelect={() => setActiveTab('chat')}
              onBack={handleCloseFavoriteDetail}
              showBabyInfo={viewingFavorite.babySurname}
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

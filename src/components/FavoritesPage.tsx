import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Trash2, Eye } from 'lucide-react';
import type { FavoriteItem, BabySession } from '@/types';

interface FavoritesPageProps {
  favorites: FavoriteItem[];
  sessions: BabySession[];
  onBack: () => void;
  onViewDetail: (favorite: FavoriteItem) => void;
  onRemoveFavorite: (favoriteId: string) => void;
}

export function FavoritesPage({ favorites, sessions, onBack, onViewDetail, onRemoveFavorite }: FavoritesPageProps) {
  if (favorites.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4 text-4xl">
          🤍
        </div>
        <h3 className="text-lg font-medium text-gray-600">暂无收藏</h3>
        <p className="text-sm text-gray-400 mt-2">在名字详情页点击收藏按钮，可以保存喜欢的名字</p>
        <Button 
          onClick={onBack} 
          className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
        >
          返回对话
        </Button>
      </div>
    );
  }

  // 按宝宝分组显示收藏
  const groupedFavorites = favorites.reduce((acc, favorite) => {
    const session = sessions.find(s => s.id === favorite.babyId);
    const key = favorite.babyId;
    if (!acc[key]) {
      acc[key] = {
        babySurname: favorite.babySurname,
        session: session,
        items: []
      };
    }
    acc[key].items.push(favorite);
    return acc;
  }, {} as Record<string, { babySurname: string; session?: BabySession; items: FavoriteItem[] }>);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-amber-50/50 to-orange-50/50">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:bg-amber-50">
          <ChevronLeft className="w-5 h-5 mr-1" />
          返回
        </Button>
        <span className="font-semibold text-gray-800">我的收藏</span>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{favorites.length}个</span>
      </div>

      {/* 收藏列表 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {Object.entries(groupedFavorites).map(([babyId, group]) => (
            <div key={babyId} className="space-y-2">
              {/* 宝宝标题 */}
              <div className="flex items-center gap-2 px-1">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{group.babySurname}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {group.babySurname}姓宝宝
                  {group.session?.selectedName && (
                    <span className="text-gray-400 font-normal ml-1">
                      (已选定：{group.session.selectedName})
                    </span>
                  )}
                </span>
              </div>
              
              {/* 该宝宝的收藏名字 */}
              <div className="space-y-2">
                {group.items.map((favorite) => (
                  <div 
                    key={favorite.id} 
                    className="bg-white rounded-xl p-3 border border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex items-center gap-3 flex-1 cursor-pointer"
                        onClick={() => onViewDetail(favorite)}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-800">{favorite.name}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">{favorite.name}</span>
                            <Badge className="bg-amber-100 text-amber-700 text-xs border-0">
                              {favorite.nameDetail.score}分
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">{favorite.nameDetail.meaning}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-amber-600">{favorite.nameDetail.wuxing}</span>
                            <span className="text-xs text-gray-400">·</span>
                            <span className="text-xs text-gray-400">{favorite.nameDetail.source}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                          onClick={() => onViewDetail(favorite)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => onRemoveFavorite(favorite.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 提示 */}
        <div className="mt-6 p-4 bg-white/80 rounded-xl text-center border border-amber-100">
          <p className="text-sm text-gray-500">
            收藏的名字可以和家人朋友一起讨论，选出最合适的那个
          </p>
        </div>
      </div>
    </div>
  );
}

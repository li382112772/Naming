import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Trash2 } from 'lucide-react';

interface FavoritesPageProps {
  favorites: string[];
  onBack: () => void;
}

// 模拟名字数据
const mockNameData: Record<string, { meaning: string; wuxing: string; score: number }> = {
  '沐泽': { meaning: '如沐春风，泽被四方', wuxing: '水水', score: 91 },
  '怀瑾': { meaning: '怀瑾握瑜，品德高洁', wuxing: '水火', score: 94 },
  '言希': { meaning: '言简意赅，希世之才', wuxing: '木水', score: 89 },
};

export function FavoritesPage({ favorites, onBack }: FavoritesPageProps) {
  if (favorites.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-4xl">
          🤍
        </div>
        <h3 className="text-lg font-medium text-gray-600">暂无收藏</h3>
        <p className="text-sm text-gray-400 mt-2">在名字详情页点击收藏按钮，可以保存喜欢的名字</p>
        <Button onClick={onBack} className="mt-4">
          返回对话
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600">
          <ChevronLeft className="w-5 h-5 mr-1" />
          返回
        </Button>
        <span className="font-medium text-gray-800">我的收藏</span>
        <span className="text-sm text-gray-500">{favorites.length}个</span>
      </div>

      {/* 收藏列表 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {favorites.map((name, index) => {
            const data = mockNameData[name] || { meaning: '寓意美好', wuxing: '五行平衡', score: 90 };
            
            return (
              <div 
                key={index} 
                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">{name}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{name}</span>
                        <Badge className="bg-amber-100 text-amber-700 text-xs">
                          {data.score}分
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{data.meaning}</p>
                      <p className="text-xs text-amber-600">{data.wuxing}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 提示 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">
            收藏的名字可以和家人朋友一起讨论，选出最合适的那个
          </p>
        </div>
      </div>
    </div>
  );
}
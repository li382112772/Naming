import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import type { BaziInfo, WuxingAnalysis } from '@/types';

interface BaziDetailPageProps {
  data: { bazi: BaziInfo; wuxing: WuxingAnalysis } | null;
  onBack: () => void;
}

export function BaziDetailPage({ data, onBack }: BaziDetailPageProps) {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-4xl">
          ☯️
        </div>
        <h3 className="text-lg font-medium text-gray-600">暂无八字分析</h3>
        <p className="text-sm text-gray-400 mt-2">请先完成对话流程</p>
        <Button onClick={onBack} className="mt-4">
          返回对话
        </Button>
      </div>
    );
  }

  const { bazi, wuxing } = data;

  const wuxingData = [
    { name: '金', count: wuxing.gold, color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
    { name: '木', count: wuxing.wood, color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
    { name: '水', count: wuxing.water, color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
    { name: '火', count: wuxing.fire, color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
    { name: '土', count: wuxing.earth, color: 'bg-amber-600', textColor: 'text-amber-700', bgColor: 'bg-amber-50' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 顶部导航 */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600">
          <ChevronLeft className="w-5 h-5 mr-1" />
          返回
        </Button>
        <span className="font-medium text-gray-800 ml-2">八字分析</span>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* 八字表格 */}
        <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-xl p-4">
          <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
            <span className="text-xl">☯️</span>
            生辰八字
          </h3>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="text-xs text-gray-500"></div>
            <div className="text-sm font-medium text-amber-900">年柱</div>
            <div className="text-sm font-medium text-amber-900">月柱</div>
            <div className="text-sm font-medium text-amber-900">日柱</div>
            <div className="text-sm font-medium text-amber-900">时柱</div>
            
            <div className="text-sm font-medium text-red-700">乾造</div>
            <div className="bg-white rounded-lg p-2 font-bold">{bazi.yearPillar}</div>
            <div className="bg-white rounded-lg p-2 font-bold">{bazi.monthPillar}</div>
            <div className="bg-white rounded-lg p-2 font-bold">{bazi.dayPillar}</div>
            <div className="bg-white rounded-lg p-2 font-bold">{bazi.hourPillar}</div>
            
            <div className="text-sm font-medium text-red-700">五行</div>
            <div className="bg-white/70 rounded-lg p-2 text-sm">{bazi.yearWuxing}</div>
            <div className="bg-white/70 rounded-lg p-2 text-sm">{bazi.monthWuxing}</div>
            <div className="bg-white/70 rounded-lg p-2 text-sm">{bazi.dayWuxing}</div>
            <div className="bg-white/70 rounded-lg p-2 text-sm">{bazi.hourWuxing}</div>
          </div>
        </div>

        {/* 五行分布 */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">五行分布</h3>
          <div className="flex justify-around">
            {wuxingData.map((item) => (
              <div key={item.name} className="text-center">
                <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold shadow-md`}>
                  {item.name}
                </div>
                <div className={`mt-2 text-sm font-medium ${item.textColor}`}>
                  {item.count}个
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 喜用分析 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
          <h3 className="font-semibold text-green-800 mb-3">五行喜用分析</h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            五行并非缺什么就补什么，应以先天八字中五行同类和异类平衡为原则，
            补充最需要的五行作为喜用。
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">八字喜用：</span>
              <div className="flex gap-2">
                {wuxing.xiyong.map((w, i) => (
                  <Badge key={i} className="bg-green-100 text-green-700">
                    {w}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">八字忌用：</span>
              <div className="flex gap-2">
                {wuxing.jiyong.map((w, i) => (
                  <Badge key={i} className="bg-red-100 text-red-700">
                    {w}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 起名建议 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4">
          <h3 className="font-semibold text-amber-800 mb-3">起名建议</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            综合该八字五行的喜用分析和五行平衡，起名时用五行属
            {wuxing.xiyong.map((w, i) => (
              <span key={i} className="font-bold text-amber-700 mx-1">「{w}」</span>
            ))}
            的字，是最有利的！
          </p>
        </div>
      </div>
    </div>
  );
}
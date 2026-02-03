import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { BaziInfo, WuxingAnalysis } from '@/types';

interface BaziAnalysisCardProps {
  bazi: BaziInfo;
  wuxing: WuxingAnalysis;
}

// 五行颜色配置
const wuxingColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  '金': { bg: 'bg-amber-400', text: 'text-amber-700', border: 'border-amber-300', gradient: 'from-amber-100 to-yellow-50' },
  '木': { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-300', gradient: 'from-green-100 to-emerald-50' },
  '水': { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-300', gradient: 'from-blue-100 to-cyan-50' },
  '火': { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-300', gradient: 'from-red-100 to-orange-50' },
  '土': { bg: 'bg-amber-600', text: 'text-amber-800', border: 'border-amber-400', gradient: 'from-amber-100 to-orange-50' },
};

export function BaziAnalysisCard({ bazi, wuxing }: BaziAnalysisCardProps) {
  const wuxingData = [
    { name: '金', count: wuxing.gold, color: wuxingColors['金'] },
    { name: '木', count: wuxing.wood, color: wuxingColors['木'] },
    { name: '水', count: wuxing.water, color: wuxingColors['水'] },
    { name: '火', count: wuxing.fire, color: wuxingColors['火'] },
    { name: '土', count: wuxing.earth, color: wuxingColors['土'] },
  ];

  return (
    <Card className="w-full border border-amber-200/60 shadow-sm overflow-hidden rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-red-50/80 to-amber-50/80 border-b border-amber-100/50 py-3 px-4">
        <CardTitle className="text-base text-red-800 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white text-sm">
            ☯
          </div>
          <span>生辰八字分析</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[420px]">
          {/* 八字四柱表格 */}
          <div className="p-3">
            <div className="rounded-xl overflow-hidden border border-amber-200/60">
              {/* 表头 */}
              <div className="grid grid-cols-5 bg-gradient-to-r from-amber-50 to-orange-50/50">
                <div className="py-2 px-1.5 text-xs font-medium text-amber-800 border-r border-amber-100"></div>
                <div className="py-2 px-1.5 text-xs font-semibold text-amber-800 text-center border-r border-amber-100">年柱</div>
                <div className="py-2 px-1.5 text-xs font-semibold text-amber-800 text-center border-r border-amber-100">月柱</div>
                <div className="py-2 px-1.5 text-xs font-semibold text-amber-800 text-center border-r border-amber-100">日柱</div>
                <div className="py-2 px-1.5 text-xs font-semibold text-amber-800 text-center">时柱</div>
              </div>
              
              {/* 乾造行 */}
              <div className="grid grid-cols-5 border-t border-amber-100">
                <div className="py-2 px-1.5 text-xs font-semibold text-red-700 bg-red-50/20 border-r border-amber-100 flex items-center">乾造</div>
                <div className="py-2 px-1.5 text-center font-semibold text-gray-800 text-sm border-r border-amber-100 bg-white">{bazi.yearPillar}</div>
                <div className="py-2 px-1.5 text-center font-semibold text-gray-800 text-sm border-r border-amber-100 bg-white">{bazi.monthPillar}</div>
                <div className="py-2 px-1.5 text-center font-semibold text-gray-800 text-sm border-r border-amber-100 bg-white">{bazi.dayPillar}</div>
                <div className="py-2 px-1.5 text-center font-semibold text-gray-800 text-sm bg-white">{bazi.hourPillar}</div>
              </div>
              
              {/* 五行行 */}
              <div className="grid grid-cols-5 border-t border-amber-100">
                <div className="py-2 px-1.5 text-xs font-semibold text-red-700 bg-red-50/20 border-r border-amber-100 flex items-center">五行</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.yearWuxing}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.monthWuxing}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.dayWuxing}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 bg-gray-50/30">{bazi.hourWuxing}</div>
              </div>

              {/* 藏干行 */}
              <div className="grid grid-cols-5 border-t border-amber-100">
                <div className="py-2 px-1.5 text-xs font-semibold text-red-700 bg-red-50/20 border-r border-amber-100 flex items-center">藏干</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-white">{bazi.yearCanggan || '-'}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-white">{bazi.monthCanggan || '-'}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-white">{bazi.dayCanggan || '-'}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 bg-white">{bazi.hourCanggan || '-'}</div>
              </div>

              {/* 纳音行 */}
              <div className="grid grid-cols-5 border-t border-amber-100">
                <div className="py-2 px-1.5 text-xs font-semibold text-red-700 bg-red-50/20 border-r border-amber-100 flex items-center">纳音</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.yearNayin || '-'}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.monthNayin || '-'}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.dayNayin || '-'}</div>
                <div className="py-2 px-1.5 text-center text-xs text-gray-600 bg-gray-50/30">{bazi.hourNayin || '-'}</div>
              </div>
            </div>
          </div>

          {/* 五行分布 */}
          <div className="px-3 pb-3">
            <h4 className="text-xs font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
              <span className="w-1 h-3.5 bg-gradient-to-b from-amber-500 to-red-500 rounded-full"></span>
              五行分布
            </h4>
            <div className="flex justify-between px-1">
              {wuxingData.map((item) => (
                <div key={item.name} className="text-center flex flex-col items-center">
                  <div className={`
                    w-9 h-9 rounded-full ${item.color.bg} 
                    flex items-center justify-center text-white text-sm font-bold shadow-sm
                  `}>
                    {item.name}
                  </div>
                  <div className={`mt-1 text-xs font-semibold ${item.color.text}`}>
                    {item.count}个
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 五行喜用分析 */}
          <div className="mx-3 mb-3 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50/50 border border-amber-200/50 p-3">
            <h4 className="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
              <span className="w-1 h-3.5 bg-gradient-to-b from-amber-600 to-yellow-600 rounded-full"></span>
              五行喜用分析
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed mb-2.5">
              五行并非缺什么就补什么，应以先天八字中五行同类和异类平衡为原则，补充最需要的五行作为喜用。
            </p>
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-gray-600">八字喜用：</span>
              {wuxing.xiyong.map((w, i) => (
                <span 
                  key={i} 
                  className={`px-2.5 py-0.5 ${wuxingColors[w]?.bg || 'bg-gray-400'} text-white rounded-full text-xs font-semibold`}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

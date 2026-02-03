import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import type { BaziInfo, WuxingAnalysis } from '@/types';

interface BaziDetailPageProps {
  data: { bazi: BaziInfo; wuxing: WuxingAnalysis } | null;
  onBack: () => void;
}

// 五行颜色配置
const wuxingColors: Record<string, { bg: string; text: string; border: string; gradient: string; lightBg: string }> = {
  '金': { bg: 'bg-amber-400', text: 'text-amber-700', border: 'border-amber-300', gradient: 'from-amber-100 to-yellow-50', lightBg: 'bg-amber-50' },
  '木': { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-300', gradient: 'from-green-100 to-emerald-50', lightBg: 'bg-green-50' },
  '水': { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-300', gradient: 'from-blue-100 to-cyan-50', lightBg: 'bg-blue-50' },
  '火': { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-300', gradient: 'from-red-100 to-orange-50', lightBg: 'bg-red-50' },
  '土': { bg: 'bg-amber-600', text: 'text-amber-800', border: 'border-amber-400', gradient: 'from-amber-100 to-orange-50', lightBg: 'bg-amber-50' },
};

export function BaziDetailPage({ data, onBack }: BaziDetailPageProps) {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4 text-4xl">
          ☯
        </div>
        <h3 className="text-lg font-medium text-gray-600">暂无八字分析</h3>
        <p className="text-sm text-gray-400 mt-2">请先完成对话流程</p>
        <Button onClick={onBack} className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          返回对话
        </Button>
      </div>
    );
  }

  const { bazi, wuxing } = data;

  // 五行数据
  const wuxingData = [
    { name: '金', count: wuxing.gold, value: wuxing.goldValue, color: wuxingColors['金'] },
    { name: '木', count: wuxing.wood, value: wuxing.woodValue, color: wuxingColors['木'] },
    { name: '水', count: wuxing.water, value: wuxing.waterValue, color: wuxingColors['水'] },
    { name: '火', count: wuxing.fire, value: wuxing.fireValue, color: wuxingColors['火'] },
    { name: '土', count: wuxing.earth, value: wuxing.earthValue, color: wuxingColors['土'] },
  ];

  // 计算最大值用于进度条
  const maxValue = Math.max(...wuxingData.map(w => w.value || 0), 1);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-amber-50/50 to-orange-50/50">
      {/* 顶部导航 */}
      <div className="flex items-center p-4 bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:bg-amber-50">
          <ChevronLeft className="w-5 h-5 mr-1" />
          返回
        </Button>
        <span className="font-semibold text-gray-800 ml-2">八字分析</span>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* 生辰八字卡片 */}
        <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-4 border border-red-100 shadow-sm">
          <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white text-sm">
              ☯
            </div>
            生辰八字
          </h3>
          
          {/* 八字表格 */}
          <div className="rounded-xl overflow-hidden border border-amber-200/60 bg-white">
            {/* 表头 */}
            <div className="grid grid-cols-5 bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="py-2.5 px-2 text-xs font-medium text-amber-800 border-r border-amber-100"></div>
              <div className="py-2.5 px-2 text-xs font-semibold text-amber-800 text-center border-r border-amber-100">年柱</div>
              <div className="py-2.5 px-2 text-xs font-semibold text-amber-800 text-center border-r border-amber-100">月柱</div>
              <div className="py-2.5 px-2 text-xs font-semibold text-amber-800 text-center border-r border-amber-100">日柱</div>
              <div className="py-2.5 px-2 text-xs font-semibold text-amber-800 text-center">时柱</div>
            </div>
            
            {/* 乾造行 */}
            <div className="grid grid-cols-5 border-t border-amber-100">
              <div className="py-3 px-2 text-sm font-semibold text-red-700 bg-red-50/30 border-r border-amber-100 flex items-center">乾造</div>
              <div className="py-3 px-2 text-center font-bold text-gray-800 border-r border-amber-100">{bazi.yearPillar}</div>
              <div className="py-3 px-2 text-center font-bold text-gray-800 border-r border-amber-100">{bazi.monthPillar}</div>
              <div className="py-3 px-2 text-center font-bold text-gray-800 border-r border-amber-100">{bazi.dayPillar}</div>
              <div className="py-3 px-2 text-center font-bold text-gray-800">{bazi.hourPillar}</div>
            </div>
            
            {/* 五行行 */}
            <div className="grid grid-cols-5 border-t border-amber-100">
              <div className="py-3 px-2 text-sm font-semibold text-red-700 bg-red-50/30 border-r border-amber-100 flex items-center">五行</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.yearWuxing}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.monthWuxing}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.dayWuxing}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 bg-gray-50/30">{bazi.hourWuxing}</div>
            </div>

            {/* 藏干行 */}
            <div className="grid grid-cols-5 border-t border-amber-100">
              <div className="py-3 px-2 text-sm font-semibold text-red-700 bg-red-50/30 border-r border-amber-100 flex items-center">藏干</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100">{bazi.yearCanggan || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100">{bazi.monthCanggan || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100">{bazi.dayCanggan || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600">{bazi.hourCanggan || '-'}</div>
            </div>

            {/* 藏干五行行 */}
            <div className="grid grid-cols-5 border-t border-amber-100">
              <div className="py-3 px-2 text-sm font-semibold text-red-700 bg-red-50/30 border-r border-amber-100 flex items-center">藏干五行</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.yearCangganWuxing || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.monthCangganWuxing || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100 bg-gray-50/30">{bazi.dayCangganWuxing || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 bg-gray-50/30">{bazi.hourCangganWuxing || '-'}</div>
            </div>

            {/* 纳音行 */}
            <div className="grid grid-cols-5 border-t border-amber-100">
              <div className="py-3 px-2 text-sm font-semibold text-red-700 bg-red-50/30 border-r border-amber-100 flex items-center">纳音</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100">{bazi.yearNayin || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100">{bazi.monthNayin || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600 border-r border-amber-100">{bazi.dayNayin || '-'}</div>
              <div className="py-3 px-2 text-center text-sm text-gray-600">{bazi.hourNayin || '-'}</div>
            </div>
          </div>
        </div>

        {/* 五行分布卡片 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
            五行分布
          </h3>
          <div className="flex justify-around">
            {wuxingData.map((item) => (
              <div key={item.name} className="text-center flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full ${item.color.bg} flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white ring-offset-2`}>
                  {item.name}
                </div>
                <div className={`mt-2 text-base font-bold ${item.color.text}`}>
                  {item.count}个
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 五行含量卡片 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
            五行含量
          </h3>
          <div className="space-y-3">
            {wuxingData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${item.color.bg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {item.name}
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color.bg} rounded-full transition-all duration-500`}
                      style={{ width: `${((item.value || 0) / maxValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${item.color.text} w-12 text-right`}>
                  {item.value?.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 同类/异类分析 */}
        {wuxing.tonglei && wuxing.yilei && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              八字同类异类分析
            </h3>
            
            <div className="space-y-4">
              {/* 同类 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 whitespace-nowrap">八字同类：</span>
                <div className="flex gap-2">
                  {wuxing.tonglei.map((w, i) => (
                    <span 
                      key={i}
                      className={`w-8 h-8 rounded-full ${wuxingColors[w]?.bg || 'bg-gray-400'} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {w}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-amber-700">得分 {wuxing.tongleiScore}</span>
              </div>
              
              {/* 异类 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 whitespace-nowrap">八字异类：</span>
                <div className="flex gap-2">
                  {wuxing.yilei.map((w, i) => (
                    <span 
                      key={i}
                      className={`w-8 h-8 rounded-full ${wuxingColors[w]?.bg || 'bg-gray-400'} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {w}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-amber-700">得分 {wuxing.yileiScore}</span>
              </div>
            </div>

            {/* 日主和旺衰 */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">日主：</span>
                <span className="text-sm font-bold text-red-700">{wuxing.rizhu}({wuxing.rizhuWuxing})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">旺衰判定：</span>
                <span className="text-sm font-bold text-amber-700">{wuxing.wangshuai}</span>
              </div>
            </div>
          </div>
        )}

        {/* 喜用分析卡片 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 shadow-sm">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm">
              ✦
            </div>
            五行喜用分析
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            在传统国学文化理论中，年柱、月柱和时柱的天干五行元素，对日元的天干五行元素存在影响，其中对于日元有利的称为"喜用"，对日元有害或是抑制的称为"忌用"。经过精密计算，五行相互影响得分如下：
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">八字喜用：</span>
              <div className="flex gap-2">
                {wuxing.xiyong.map((w, i) => (
                  <Badge key={i} className={`${wuxingColors[w]?.bg || 'bg-gray-400'} text-white border-0 px-3 py-1`}>
                    {w}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">八字忌用：</span>
              <div className="flex gap-2">
                {wuxing.jiyong.map((w, i) => (
                  <Badge key={i} variant="destructive" className="px-3 py-1">
                    {w}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 起名建议卡片 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 shadow-sm">
          <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm">
              ✍
            </div>
            起名建议
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            综合该八字五行的喜用分析和五行平衡，起名时用五行属
            {wuxing.xiyong.map((w, i) => (
              <span key={i} className={`font-bold ${wuxingColors[w]?.text || 'text-gray-700'} mx-1`}>「{w}」</span>
            ))}
            的字，是最有利的！
          </p>
          <div className="mt-3 p-3 bg-white/60 rounded-lg text-xs text-gray-600 leading-relaxed">
            <strong className="text-amber-700">温馨提示：</strong>
            五行喜用是根据八字命理分析得出的最需要的五行元素。起名时选用喜用五行的字，可以平衡命局，助力人生运势。
          </div>
        </div>
      </div>
    </div>
  );
}

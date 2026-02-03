import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { BaziInfo, WuxingAnalysis } from '@/types';

interface BaziAnalysisCardProps {
  bazi: BaziInfo;
  wuxing: WuxingAnalysis;
}

export function BaziAnalysisCard({ bazi, wuxing }: BaziAnalysisCardProps) {
  const wuxingData = [
    { name: '金', count: wuxing.gold, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { name: '木', count: wuxing.wood, color: 'bg-green-500', textColor: 'text-green-700' },
    { name: '水', count: wuxing.water, color: 'bg-blue-500', textColor: 'text-blue-700' },
    { name: '火', count: wuxing.fire, color: 'bg-red-500', textColor: 'text-red-700' },
    { name: '土', count: wuxing.earth, color: 'bg-amber-600', textColor: 'text-amber-700' },
  ];

  return (
    <Card className="w-full max-w-lg mx-auto border-2 border-red-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-50 to-amber-50 border-b border-red-100">
        <CardTitle className="text-lg text-red-800 flex items-center gap-2">
          <span className="text-2xl">☯️</span>
          生辰八字分析
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-auto">
          {/* 八字表格 */}
          <Table>
            <TableHeader>
              <TableRow className="bg-amber-50/50">
                <TableHead className="text-amber-900 font-semibold"></TableHead>
                <TableHead className="text-amber-900 font-semibold text-center">年柱</TableHead>
                <TableHead className="text-amber-900 font-semibold text-center">月柱</TableHead>
                <TableHead className="text-amber-900 font-semibold text-center">日柱</TableHead>
                <TableHead className="text-amber-900 font-semibold text-center">时柱</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-red-700 bg-red-50/30">乾造</TableCell>
                <TableCell className="text-center font-semibold">{bazi.yearPillar}</TableCell>
                <TableCell className="text-center font-semibold">{bazi.monthPillar}</TableCell>
                <TableCell className="text-center font-semibold">{bazi.dayPillar}</TableCell>
                <TableCell className="text-center font-semibold">{bazi.hourPillar}</TableCell>
              </TableRow>
              <TableRow className="bg-gray-50/50">
                <TableCell className="font-medium text-red-700 bg-red-50/30">五行</TableCell>
                <TableCell className="text-center text-gray-600">{bazi.yearWuxing}</TableCell>
                <TableCell className="text-center text-gray-600">{bazi.monthWuxing}</TableCell>
                <TableCell className="text-center text-gray-600">{bazi.dayWuxing}</TableCell>
                <TableCell className="text-center text-gray-600">{bazi.hourWuxing}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* 五行统计 */}
          <div className="p-4 border-t border-red-100">
            <h4 className="text-sm font-semibold text-red-800 mb-3">五行分布</h4>
            <div className="grid grid-cols-5 gap-2">
              {wuxingData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className={`
                    w-10 h-10 mx-auto rounded-full ${item.color} 
                    flex items-center justify-center text-white font-bold shadow-md
                  `}>
                    {item.name}
                  </div>
                  <div className={`mt-1 text-sm font-medium ${item.textColor}`}>
                    {item.count}个
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 喜用分析 */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-t border-red-100">
            <h4 className="text-sm font-semibold text-amber-800 mb-2">五行喜用分析</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              五行并非缺什么就补什么，应以先天八字中五行同类和异类平衡为原则，
              补充最需要的五行作为喜用。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">八字喜用：</span>
              {wuxing.xiyong.map((w, i) => (
                <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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
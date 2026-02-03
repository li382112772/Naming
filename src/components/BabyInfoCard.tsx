import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin, Calendar, Clock, Baby } from 'lucide-react';
import type { BabyInfo } from '@/types';

interface BabyInfoCardProps {
  onSubmit: (info: BabyInfo) => void;
  onSkip?: () => void;
}

export function BabyInfoCard({ onSubmit, onSkip }: BabyInfoCardProps) {
  const [info, setInfo] = useState<Partial<BabyInfo>>({
    gender: 'unknown'
  });

  const handleSubmit = () => {
    if (info.surname && info.birthDate) {
      onSubmit(info as BabyInfo);
    }
  };

  const isValid = info.surname && info.birthDate;

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-amber-200/50 shadow-lg bg-gradient-to-br from-white to-amber-50/30">
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-amber-800">
          <Baby className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          宝宝信息快速填写
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        {/* 姓氏 */}
        <div className="space-y-2">
          <Label className="text-amber-900 font-medium">姓氏</Label>
          <Input
            placeholder="请输入姓氏"
            value={info.surname || ''}
            onChange={(e) => setInfo({ ...info, surname: e.target.value })}
            className="border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
            maxLength={2}
          />
        </div>

        {/* 性别 */}
        <div className="space-y-2">
          <Label className="text-amber-900 font-medium text-sm sm:text-base">性别</Label>
          <RadioGroup
            value={info.gender}
            onValueChange={(value) => setInfo({ ...info, gender: value as any })}
            className="flex gap-2 sm:gap-4 flex-wrap"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boy" id="boy" className="text-blue-500 border-blue-300" />
              <Label htmlFor="boy" className="cursor-pointer text-blue-700">男孩</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="girl" id="girl" className="text-pink-500 border-pink-300" />
              <Label htmlFor="girl" className="cursor-pointer text-pink-700">女孩</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unknown" id="unknown" className="text-amber-500 border-amber-300" />
              <Label htmlFor="unknown" className="cursor-pointer text-amber-700">未知</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 出生日期 */}
        <div className="space-y-2">
          <Label className="text-amber-900 font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            出生日期
          </Label>
          <Input
            type="date"
            value={info.birthDate || ''}
            onChange={(e) => setInfo({ ...info, birthDate: e.target.value })}
            className="border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
          />
        </div>

        {/* 出生时间 */}
        <div className="space-y-2">
          <Label className="text-amber-900 font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            出生时间（选填）
          </Label>
          <Input
            type="time"
            value={info.birthTime || ''}
            onChange={(e) => setInfo({ ...info, birthTime: e.target.value })}
            className="border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
          />
        </div>

        {/* 出生地点 */}
        <div className="space-y-2">
          <Label className="text-amber-900 font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            出生地点（选填）
          </Label>
          <Input
            placeholder="如：北京"
            value={info.birthLocation || ''}
            onChange={(e) => setInfo({ ...info, birthLocation: e.target.value })}
            className="border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
          />
        </div>

        {/* 按钮 */}
        <div className="flex gap-2 sm:gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onSkip}
            className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 text-sm sm:text-base"
          >
            稍后补充
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-sm sm:text-base"
          >
            确认
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
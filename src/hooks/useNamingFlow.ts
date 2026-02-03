import { useState, useCallback } from 'react';
import type { 
  BabyInfo, 
  UserExpectation, 
  ChatMessage, 
  NameDirection, 
  NameDetail,
  BaziInfo,
  WuxingAnalysis 
} from '@/types';

// 模拟数据 - 名字方向
const nameDirections: NameDirection[] = [
  {
    id: 'poetic',
    title: '诗词雅韵系列',
    icon: '📖',
    description: '取自《楚辞》《诗经》，文化底蕴深厚',
    sampleNames: ['沐泽', '怀瑾', '言希'],
    style: '取自经典诗词，意境优美，文雅含蓄'
  },
  {
    id: 'mountain',
    title: '山河大气系列',
    icon: '⛰️',
    description: '寓意胸怀天下、气度不凡',
    sampleNames: ['慕川', '景行', '泽宇'],
    style: '大气磅礴，格局开阔，气势恢宏'
  },
  {
    id: 'modern',
    title: '现代简约系列',
    icon: '✨',
    description: '简洁好记，符合现代审美',
    sampleNames: ['辰安', '宇轩', '晨悦'],
    style: '简洁明快，时尚大气，朗朗上口'
  }
];

// 模拟数据 - 名字详情
const nameDetails: Record<string, NameDetail> = {
  '沐泽': {
    name: '沐泽',
    pinyin: 'mù zé',
    characters: [
      {
        char: '沐',
        pinyin: 'mù',
        wuxing: '水',
        meaning: '润泽、恩泽，受恩惠之意',
        explanation: '沐，本义为洗发，引申为润泽、洗涤。如沐春风，形容受到良好的熏陶。',
        source: '《诗经·大雅》"既沾既足，如沐如濯"',
        kangxi: { strokes: 7, page: '页574', original: '【巳集上】【水字部】沐' }
      },
      {
        char: '泽',
        pinyin: 'zé',
        wuxing: '水',
        meaning: '水聚集之处，恩泽万物',
        explanation: '泽，本义为水汇聚的地方，引申为恩泽、润泽。',
        source: '《孟子》"膏泽下于民"',
        kangxi: { strokes: 8, page: '页618', original: '【巳集上】【水字部】澤' }
      }
    ],
    meaning: '如沐春风，泽被四方',
    source: '《诗经·大雅》',
    wuxing: '水水组合',
    baziMatch: '补水，完全符合八字喜用',
    score: 91,
    uniqueness: '较低',
    uniquenessCount: '全国约0.08%同龄人使用（约6400人）',
    yinyun: {
      tone: '去声+阳平（抑扬顿挫）',
      initials: '双唇音+舌尖后音',
      score: 95
    },
    personalizedMeaning: '"沐泽"二字，如春雨润物，温润如玉。寓意孩子如沐春风般自在，恩泽四方，成为一个有温度、有担当的人。'
  },
  '怀瑾': {
    name: '怀瑾',
    pinyin: 'huái jǐn',
    characters: [
      {
        char: '怀',
        pinyin: 'huái',
        wuxing: '水',
        meaning: '胸怀、怀抱，心怀之意',
        explanation: '怀，本义为胸前，引申为心怀、思念。',
        source: '《论语》"君子怀德"',
        kangxi: { strokes: 7, page: '页374', original: '【卯集上】【心字部】懷' }
      },
      {
        char: '瑾',
        pinyin: 'jǐn',
        wuxing: '火',
        meaning: '美玉，比喻美德',
        explanation: '瑾，美玉也，比喻美好的品德。',
        source: '《楚辞·九章》"怀瑾握瑜兮"',
        kangxi: { strokes: 15, page: '页740', original: '【午集上】【玉字部】瑾' }
      }
    ],
    meaning: '怀瑾握瑜，品德高洁',
    source: '《楚辞·九章》',
    wuxing: '水火组合',
    baziMatch: '水火既济，平衡八字',
    score: 94,
    uniqueness: '低',
    uniquenessCount: '全国约0.03%同龄人使用（约2400人）',
    yinyun: {
      tone: '阳平+上声（婉转悠扬）',
      initials: '舌根音+舌面音',
      score: 92
    },
    personalizedMeaning: '"怀瑾"取自屈原名句，寓意孩子如美玉般温润，心怀高洁之志，品德高尚，才华出众。'
  },
  '言希': {
    name: '言希',
    pinyin: 'yán xī',
    characters: [
      {
        char: '言',
        pinyin: 'yán',
        wuxing: '木',
        meaning: '言语、说话，表达之意',
        explanation: '言，说话也，引申为言论、表达。',
        source: '《论语》"君子欲讷于言而敏于行"',
        kangxi: { strokes: 7, page: '页1146', original: '【酉集上】【言字部】言' }
      },
      {
        char: '希',
        pinyin: 'xī',
        wuxing: '水',
        meaning: '希望、稀少，珍贵之意',
        explanation: '希，稀少也，引申为希望、期望。',
        source: '《老子》"大器晚成，大音希声"',
        kangxi: { strokes: 7, page: '页329', original: '【寅集下】【巾字部】希' }
      }
    ],
    meaning: '言简意赅，希世之才',
    source: '《老子》',
    wuxing: '木水组合',
    baziMatch: '木水相生，生生不息',
    score: 89,
    uniqueness: '较低',
    uniquenessCount: '全国约0.12%同龄人使用（约9600人）',
    yinyun: {
      tone: '阳平+阴平（平仄和谐）',
      initials: '舌面音+舌根音',
      score: 90
    },
    personalizedMeaning: '"言希"寓意孩子言语有度，不张扬却有力，如希世之珍，独特而珍贵。'
  }
};

// 模拟生辰八字
const mockBazi: BaziInfo = {
  yearPillar: '丙午',
  monthPillar: '癸巳',
  dayPillar: '己未',
  hourPillar: '甲子',
  yearWuxing: '火火',
  monthWuxing: '水火',
  dayWuxing: '土土',
  hourWuxing: '木水',
  // 藏干
  yearCanggan: '丙甲',
  monthCanggan: '庚丙',
  dayCanggan: '丁乙己',
  hourCanggan: '癸',
  // 藏干五行
  yearCangganWuxing: '火木',
  monthCangganWuxing: '金火',
  dayCangganWuxing: '火木土',
  hourCangganWuxing: '水',
  // 纳音
  yearNayin: '炉中火',
  monthNayin: '长流水',
  dayNayin: '天上火',
  hourNayin: '海中金',
  // 本命
  benming: '火命'
};

// 模拟五行分析
const mockWuxing: WuxingAnalysis = {
  gold: 0,
  wood: 2,
  water: 2,
  fire: 2,
  earth: 2,
  // 五行含量（详细数值）
  goldValue: 0.54,
  woodValue: 1.9,
  waterValue: 2.12,
  fireValue: 2.66,
  earthValue: 1.71,
  xiyong: ['金', '木'],
  jiyong: ['土', '火'],
  // 日主
  rizhu: '己',
  rizhuWuxing: '土',
  // 同类/异类
  tonglei: ['土', '火'],
  yilei: ['金', '木', '水'],
  tongleiScore: 4.37,
  yileiScore: 4.56,
  // 旺衰判定
  wangshuai: '日主偏弱'
};

export function useNamingFlow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const [babyInfo, setBabyInfo] = useState<BabyInfo | null>(null);
  const [expectation] = useState<UserExpectation | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // 添加AI消息
  const addAIMessage = useCallback((content: string, component?: string, data?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content,
      component: component as any,
      data
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // 添加用户消息
  const addUserMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // 模拟打字效果
  const simulateTyping = useCallback(async (duration: number = 800) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  }, []);

  // 开始流程
  const startFlow = useCallback(async () => {
    await simulateTyping(600);
    addAIMessage(
      '恭喜！先让我了解一下宝宝的基本情况吧😊',
      'babyInfo',
      null
    );
    setCurrentStep('babyInfo');
  }, [addAIMessage, simulateTyping]);

  // 提交宝宝信息
  const submitBabyInfo = useCallback(async (info: BabyInfo) => {
    setBabyInfo(info);
    addUserMessage(`已填写：${info.surname}姓，${info.gender === 'boy' ? '男' : info.gender === 'girl' ? '女' : '未知'}宝宝`);
    
    await simulateTyping(800);
    const locationText = info.birthLocation ? `在${info.birthLocation}出生的` : '';
    const genderText = info.gender === 'boy' ? '男孩' : info.gender === 'girl' ? '女孩' : '宝宝';
    
    addAIMessage(
      `我看到${locationText}${genderText}👦，这个时节出生的孩子往往性格沉稳。\n\n您对名字有什么特别的期望吗？`,
      'expectation',
      null
    );
    setCurrentStep('expectation');
  }, [addAIMessage, addUserMessage, simulateTyping]);

  // 选择期望
  const selectExpectation = useCallback(async (style: string) => {
    const styleMap: Record<string, string> = {
      'poetic': '希望有诗意和文化底蕴 📚',
      'modern': '希望简单好记，现代一些 ✨',
      'traditional': '希望符合传统五行八字 ☯️',
      'unsure': '还没想好，需要您的建议 💡'
    };
    
    addUserMessage(styleMap[style] || style);
    
    await simulateTyping(600);
    addAIMessage(
      '明白了！如果方便的话，我还想知道：\n• 家里有需要避讳的字吗？（比如长辈名字）\n• 有特定的字辈要求吗？\n• 有特别喜欢的字或意象吗？（比如：山、海、文、武等）\n\n当然，这些都不是必须的，您可以直接说"跳过"😊',
      'additionalInfo',
      null
    );
    setCurrentStep('additional');
  }, [addAIMessage, addUserMessage, simulateTyping]);

  // 提交额外信息
  const submitAdditionalInfo = useCallback(async (info: any) => {
    addUserMessage(info.skip ? '跳过' : '已补充信息');
    
    await simulateTyping(1000);
    addAIMessage(
      '好的，让我先为宝宝分析一下生辰八字和五行喜用...',
      'bazi',
      { bazi: mockBazi, wuxing: mockWuxing }
    );
    setCurrentStep('bazi');
    
    // 延迟后显示名字方向
    setTimeout(async () => {
      await simulateTyping(1200);
      addAIMessage(
        '根据您的期望和八字分析，我为宝宝准备了几个方向，咱们一起来看看：',
        'direction',
        { directions: nameDirections }
      );
      setCurrentStep('direction');
    }, 3000);
  }, [addAIMessage, addUserMessage, simulateTyping]);

  // 选择方向
  const selectDirection = useCallback(async (directionId: string) => {
    const direction = nameDirections.find(d => d.id === directionId);
    if (direction) {
      addUserMessage(`我想看看${direction.title}`);
      setSelectedDirection(directionId);
      
      await simulateTyping(800);
      addAIMessage(
        `好的！让我们深入看看${direction.title}：`,
        'nameDetail',
        { name: nameDetails['沐泽'] }
      );
      setCurrentStep('names');
    }
  }, [addAIMessage, addUserMessage, simulateTyping]);

  // 选择名字
  const selectName = useCallback(async (name: string) => {
    const nameDetail = nameDetails[name];
    if (nameDetail) {
      addUserMessage(`我喜欢"${name}"这个风格`);
      
      await simulateTyping(600);
      addAIMessage(
        `您觉得"${name}"怎么样？\n\n如果喜欢这个风格但想调整，我可以：\n• 保留"${name.charAt(0)}"，换第二个字\n• 保留"${name.charAt(1)}"，换第一个字\n• 找类似意境的其他组合`,
        'nameDetail',
        { name: nameDetail }
      );
    }
  }, [addAIMessage, addUserMessage, simulateTyping]);

  // 请求更多名字
  const requestMoreNames = useCallback(async () => {
    addUserMessage('我想再看看其他名字');
    
    await simulateTyping(800);
    addAIMessage(
      '好的，我再为您推荐几个类似风格的名字：',
      'nameDetail',
      { name: nameDetails['怀瑾'] }
    );
  }, [addAIMessage, addUserMessage, simulateTyping]);

  // 确认选择名字
  const confirmNameSelection = useCallback(async (name: string) => {
    addUserMessage(`就选「${name}」了！`);
    
    await simulateTyping(800);
    addAIMessage(
      `🎉 恭喜您为宝宝选定了「${name}」这个名字！\n\n这个名字寓意美好，五行相合，音韵和谐。相信这个名字会伴随宝宝健康成长，前程似锦！\n\n您还可以：\n• 查看完整起名报告（含八字详解、名字解析等）\n• 分享这个名字给家人朋友\n• 保存为宝宝的人生第一份礼物\n\n祝宝宝健康快乐成长！😊`,
      'completion',
      { name }
    );
    setCurrentStep('completion');
  }, [addAIMessage, addUserMessage, simulateTyping]);

  return {
    messages,
    currentStep,
    babyInfo,
    expectation,
    selectedDirection,
    isTyping,
    startFlow,
    submitBabyInfo,
    selectExpectation,
    submitAdditionalInfo,
    selectDirection,
    selectName,
    requestMoreNames,
    confirmNameSelection,
    nameDirections,
    nameDetails,
    getCurrentName: () => selectedDirection ? nameDetails['沐泽'] : null,
    getBaziData: () => ({ bazi: mockBazi, wuxing: mockWuxing })
  };
}
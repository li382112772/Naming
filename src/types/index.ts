// 宝宝信息
export interface BabyInfo {
  surname: string;
  gender: 'boy' | 'girl' | 'unknown';
  birthDate: string;
  birthTime: string;
  birthLocation: string;
}

// 用户期望
export interface UserExpectation {
  style: 'poetic' | 'modern' | 'traditional' | 'unsure';
  tabooWords: string[];
  generationWord: string;
  favoriteImagery: string[];
}

// 生辰八字
export interface BaziInfo {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  yearWuxing: string;
  monthWuxing: string;
  dayWuxing: string;
  hourWuxing: string;
  // 藏干
  yearCanggan: string;
  monthCanggan: string;
  dayCanggan: string;
  hourCanggan: string;
  // 藏干五行
  yearCangganWuxing: string;
  monthCangganWuxing: string;
  dayCangganWuxing: string;
  hourCangganWuxing: string;
  // 纳音
  yearNayin: string;
  monthNayin: string;
  dayNayin: string;
  hourNayin: string;
  // 本命
  benming: string;
}

// 五行分析
export interface WuxingAnalysis {
  gold: number;
  wood: number;
  water: number;
  fire: number;
  earth: number;
  // 五行含量（详细数值）
  goldValue: number;
  woodValue: number;
  waterValue: number;
  fireValue: number;
  earthValue: number;
  xiyong: string[];
  jiyong: string[];
  // 日主
  rizhu: string;
  rizhuWuxing: string;
  // 同类/异类
  tonglei: string[];
  yilei: string[];
  tongleiScore: number;
  yileiScore: number;
  // 旺衰判定
  wangshuai: string;
}}

// 名字方向
export interface NameDirection {
  id: string;
  title: string;
  icon: string;
  description: string;
  sampleNames: string[];
  style: string;
}

// 名字详情
export interface NameDetail {
  name: string;
  pinyin: string;
  characters: CharacterInfo[];
  meaning: string;
  source: string;
  wuxing: string;
  baziMatch: string;
  score: number;
  uniqueness: string;
  uniquenessCount: string;
  yinyun: YinyunInfo;
  personalizedMeaning: string;
}

// 汉字信息
export interface CharacterInfo {
  char: string;
  pinyin: string;
  wuxing: string;
  meaning: string;
  explanation: string;
  source: string;
  kangxi: KangxiInfo;
}

// 康熙字典信息
export interface KangxiInfo {
  strokes: number;
  page: string;
  original: string;
}

// 音韵信息
export interface YinyunInfo {
  tone: string;
  initials: string;
  score: number;
}

// 对话消息
export interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  content: string;
  component?: 'babyInfo' | 'expectation' | 'additionalInfo' | 'direction' | 'nameDetail' | 'bazi' | 'wuxing' | 'completion';
  data?: any;
}

// 应用状态
export interface AppState {
  step: 'welcome' | 'babyInfo' | 'expectation' | 'additional' | 'bazi' | 'direction' | 'names' | 'detail';
  babyInfo: BabyInfo | null;
  expectation: UserExpectation | null;
  selectedDirection: string | null;
  selectedName: NameDetail | null;
  messages: ChatMessage[];
}
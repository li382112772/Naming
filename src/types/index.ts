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
}

// 五行分析
export interface WuxingAnalysis {
  gold: number;
  wood: number;
  water: number;
  fire: number;
  earth: number;
  xiyong: string[];
  jiyong: string[];
}

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
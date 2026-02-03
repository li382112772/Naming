import { useState, useCallback, useMemo, useEffect } from 'react';
import type { 
  BabyInfo, 
  UserExpectation, 
  ChatMessage, 
  NameDirection, 
  NameDetail,
  BaziInfo,
  WuxingAnalysis,
  BabySession,
  FavoriteItem
} from '@/types';

// 模拟数据 - 名字方向
const nameDirections: NameDirection[] = [
  {
    id: 'poetic',
    title: '诗词雅韵系列',
    icon: '📖',
    description: '取自《楚辞》《诗经》，文化底蕴深厚',
    sampleNames: ['沐泽', '怀瑾', '言希', '景行', '子衿', '清扬'],
    style: '取自经典诗词，意境优美，文雅含蓄'
  },
  {
    id: 'mountain',
    title: '山河大气系列',
    icon: '⛰️',
    description: '寓意胸怀天下、气度不凡',
    sampleNames: ['慕川', '景行', '泽宇', '岳霖', '峻熙', '博文'],
    style: '大气磅礴，格局开阔，气势恢宏'
  },
  {
    id: 'modern',
    title: '现代简约系列',
    icon: '✨',
    description: '简洁好记，符合现代审美',
    sampleNames: ['辰安', '宇轩', '晨悦', '梓涵', '若溪', '思源'],
    style: '简洁明快，时尚大气，朗朗上口'
  }
];

// 模拟数据 - 名字详情
const nameDetails: Record<string, NameDetail> = {
  // 诗词雅韵系列
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
  },
  '景行': {
    name: '景行',
    pinyin: 'jǐng xíng',
    characters: [
      {
        char: '景',
        pinyin: 'jǐng',
        wuxing: '木',
        meaning: '日光、风景，仰慕之意',
        explanation: '景，日光也，引申为风景、景象，又表仰慕。',
        source: '《诗经·小雅》"高山仰止，景行行止"',
        kangxi: { strokes: 12, page: '页512', original: '【辰集上】【日字部】景' }
      },
      {
        char: '行',
        pinyin: 'xíng',
        wuxing: '水',
        meaning: '行走、品行，道路之意',
        explanation: '行，道也，引申为行走、品行。',
        source: '《诗经》"景行行止"',
        kangxi: { strokes: 6, page: '页1108', original: '【申集下】【行字部】行' }
      }
    ],
    meaning: '高山仰止，景行行止',
    source: '《诗经·小雅》',
    wuxing: '木水组合',
    baziMatch: '木水相生，利于成长',
    score: 93,
    uniqueness: '较低',
    uniquenessCount: '全国约0.15%同龄人使用（约12000人）',
    yinyun: {
      tone: '上声+阳平（抑扬有致）',
      initials: '舌面音+舌根音',
      score: 91
    },
    personalizedMeaning: '"景行"取自《诗经》，寓意孩子德行高尚，如高山般令人仰慕，行走正道，前程远大。'
  },
  '子衿': {
    name: '子衿',
    pinyin: 'zǐ jīn',
    characters: [
      {
        char: '子',
        pinyin: 'zǐ',
        wuxing: '水',
        meaning: '君子、学子，尊贵之意',
        explanation: '子，古代对男子的尊称，引申为君子、学子。',
        source: '《诗经·郑风》"青青子衿，悠悠我心"',
        kangxi: { strokes: 3, page: '页277', original: '【寅集上】【子字部】子' }
      },
      {
        char: '衿',
        pinyin: 'jīn',
        wuxing: '木',
        meaning: '衣领，代指学子',
        explanation: '衿，衣领也，古代学子穿的青衣领。',
        source: '《诗经·郑风》"青青子衿"',
        kangxi: { strokes: 9, page: '页1112', original: '【申集下】【衣字部】衿' }
      }
    ],
    meaning: '青青子衿，悠悠我心',
    source: '《诗经·郑风》',
    wuxing: '水木组合',
    baziMatch: '水木相生，文运亨通',
    score: 92,
    uniqueness: '低',
    uniquenessCount: '全国约0.05%同龄人使用（约4000人）',
    yinyun: {
      tone: '上声+阴平（婉转流畅）',
      initials: '舌尖音+舌面音',
      score: 93
    },
    personalizedMeaning: '"子衿"取自《诗经》，寓意孩子如古代学子般才华横溢，气质儒雅，令人倾慕。'
  },
  '清扬': {
    name: '清扬',
    pinyin: 'qīng yáng',
    characters: [
      {
        char: '清',
        pinyin: 'qīng',
        wuxing: '水',
        meaning: '清澈、纯净，高洁之意',
        explanation: '清，水清澈也，引申为纯净、高洁。',
        source: '《诗经·郑风》"有美一人，清扬婉兮"',
        kangxi: { strokes: 11, page: '页336', original: '【巳集上】【水字部】清' }
      },
      {
        char: '扬',
        pinyin: 'yáng',
        wuxing: '火',
        meaning: '飞扬、发扬，向上之意',
        explanation: '扬，飞举也，引申为发扬、向上。',
        source: '《诗经》"清扬婉兮"',
        kangxi: { strokes: 6, page: '页419', original: '【卯集中】【手部部】揚' }
      }
    ],
    meaning: '眉清目秀，神采飞扬',
    source: '《诗经·郑风》',
    wuxing: '水火组合',
    baziMatch: '水火既济，阴阳调和',
    score: 90,
    uniqueness: '较低',
    uniquenessCount: '全国约0.10%同龄人使用（约8000人）',
    yinyun: {
      tone: '阴平+阳平（平和流畅）',
      initials: '舌面音+舌根音',
      score: 89
    },
    personalizedMeaning: '"清扬"取自《诗经》，形容眉目清秀，神采飞扬。寓意孩子气质清雅，精神饱满，前程光明。'
  },
  // 山河大气系列
  '慕川': {
    name: '慕川',
    pinyin: 'mù chuān',
    characters: [
      {
        char: '慕',
        pinyin: 'mù',
        wuxing: '水',
        meaning: '仰慕、向往，思念之意',
        explanation: '慕，向往也，引申为仰慕、思念。',
        source: '《论语》"君子慕于道"',
        kangxi: { strokes: 14, page: '页396', original: '【卯集中】【心字部】慕' }
      },
      {
        char: '川',
        pinyin: 'chuān',
        wuxing: '金',
        meaning: '河流，广阔之意',
        explanation: '川，贯穿通流水也，引申为广阔、通达。',
        source: '《诗经》"百川东到海"',
        kangxi: { strokes: 3, page: '页327', original: '【寅集下】【巛字部】川' }
      }
    ],
    meaning: '仰慕山川，胸怀广阔',
    source: '《诗经》',
    wuxing: '水金组合',
    baziMatch: '金水相生，源远流长',
    score: 88,
    uniqueness: '较低',
    uniquenessCount: '全国约0.09%同龄人使用（约7200人）',
    yinyun: {
      tone: '去声+阴平（抑扬顿挫）',
      initials: '双唇音+舌尖后音',
      score: 87
    },
    personalizedMeaning: '"慕川"寓意孩子胸怀如山川般广阔，有远大志向，同时懂得欣赏美好，不断进取。'
  },
  '泽宇': {
    name: '泽宇',
    pinyin: 'zé yǔ',
    characters: [
      {
        char: '泽',
        pinyin: 'zé',
        wuxing: '水',
        meaning: '恩泽、润泽',
        explanation: '泽，水汇聚之处，引申为恩泽。',
        source: '《孟子》',
        kangxi: { strokes: 8, page: '页618', original: '【巳集上】【水字部】澤' }
      },
      {
        char: '宇',
        pinyin: 'yǔ',
        wuxing: '土',
        meaning: '屋檐、宇宙，气宇之意',
        explanation: '宇，屋檐也，引申为宇宙、气度。',
        source: '《庄子》"四方上下曰宇"',
        kangxi: { strokes: 6, page: '页217', original: '【寅集上】【宀字部】宇' }
      }
    ],
    meaning: '泽被四方，气宇轩昂',
    source: '《庄子》',
    wuxing: '水土组合',
    baziMatch: '土克水，需配合八字',
    score: 87,
    uniqueness: '较高',
    uniquenessCount: '全国约0.25%同龄人使用（约20000人）',
    yinyun: {
      tone: '阳平+上声（平仄和谐）',
      initials: '舌尖后音+舌根音',
      score: 88
    },
    personalizedMeaning: '"泽宇"寓意孩子如雨露般滋润万物，气度不凡，有包容天下的胸怀。'
  },
  '岳霖': {
    name: '岳霖',
    pinyin: 'yuè lín',
    characters: [
      {
        char: '岳',
        pinyin: 'yuè',
        wuxing: '木',
        meaning: '山岳、高山，稳重之意',
        explanation: '岳，高山也，引申为稳重、崇高。',
        source: '《诗经》"崧高维岳"',
        kangxi: { strokes: 8, page: '页307', original: '【寅集中】【山字部】岳' }
      },
      {
        char: '霖',
        pinyin: 'lín',
        wuxing: '水',
        meaning: '久雨、甘霖，恩泽之意',
        explanation: '霖，三日以往雨也，引申为甘霖、恩泽。',
        source: '《左传》"凡雨自三日以往为霖"',
        kangxi: { strokes: 16, page: '页647', original: '【巳集上】【雨字部】霖' }
      }
    ],
    meaning: '山岳巍峨，甘霖普降',
    source: '《诗经》《左传》',
    wuxing: '木水组合',
    baziMatch: '水木相生，生机勃勃',
    score: 91,
    uniqueness: '低',
    uniquenessCount: '全国约0.06%同龄人使用（约4800人）',
    yinyun: {
      tone: '去声+阳平（抑扬有致）',
      initials: '舌根音+舌尖音',
      score: 90
    },
    personalizedMeaning: '"岳霖"寓意孩子如山岳般稳重可靠，又如甘霖般滋润他人，是值得信赖的人。'
  },
  '峻熙': {
    name: '峻熙',
    pinyin: 'jùn xī',
    characters: [
      {
        char: '峻',
        pinyin: 'jùn',
        wuxing: '金',
        meaning: '高大、严峻，刚健之意',
        explanation: '峻，高而陡也，引申为刚健、严厉。',
        source: '《尚书》',
        kangxi: { strokes: 10, page: '页312', original: '【寅集中】【山字部】峻' }
      },
      {
        char: '熙',
        pinyin: 'xī',
        wuxing: '水',
        meaning: '光明、兴盛，和乐之意',
        explanation: '熙，光也，引申为兴盛、和乐。',
        source: '《尚书》"庶绩咸熙"',
        kangxi: { strokes: 14, page: '页505', original: '【巳集中】【火字部】熙' }
      }
    ],
    meaning: '高大峻拔，光明熙和',
    source: '《尚书》',
    wuxing: '金水组合',
    baziMatch: '金水相生，刚柔并济',
    score: 89,
    uniqueness: '较低',
    uniquenessCount: '全国约0.18%同龄人使用（约14400人）',
    yinyun: {
      tone: '去声+阴平（抑扬流畅）',
      initials: '舌面音+舌根音',
      score: 88
    },
    personalizedMeaning: '"峻熙"寓意孩子如山般高大挺拔，又如阳光般温暖明亮，刚柔并济，前程光明。'
  },
  '博文': {
    name: '博文',
    pinyin: 'bó wén',
    characters: [
      {
        char: '博',
        pinyin: 'bó',
        wuxing: '水',
        meaning: '广博、渊博，丰富之意',
        explanation: '博，大通也，引申为广博、渊博。',
        source: '《论语》"博学而笃志"',
        kangxi: { strokes: 12, page: '页142', original: '【子集下】【十字部】博' }
      },
      {
        char: '文',
        pinyin: 'wén',
        wuxing: '水',
        meaning: '文字、文化，文雅之意',
        explanation: '文，错画也，引申为文化、文雅。',
        source: '《论语》"文质彬彬"',
        kangxi: { strokes: 4, page: '页245', original: '【卯集上】【文字部】文' }
      }
    ],
    meaning: '博学多才，文采斐然',
    source: '《论语》',
    wuxing: '水水组合',
    baziMatch: '水旺，适合喜水八字',
    score: 88,
    uniqueness: '较高',
    uniquenessCount: '全国约0.22%同龄人使用（约17600人）',
    yinyun: {
      tone: '阳平+阳平（平和稳重）',
      initials: '双唇音+舌尖后音',
      score: 86
    },
    personalizedMeaning: '"博文"寓意孩子学识渊博，文采出众，是饱读诗书、才华横溢之人。'
  },
  // 现代简约系列
  '辰安': {
    name: '辰安',
    pinyin: 'chén ān',
    characters: [
      {
        char: '辰',
        pinyin: 'chén',
        wuxing: '土',
        meaning: '时辰、星辰，时光之意',
        explanation: '辰，时也，又指星辰。',
        source: '《说文解字》',
        kangxi: { strokes: 7, page: '页574', original: '【辰集上】【辰字部】辰' }
      },
      {
        char: '安',
        pinyin: 'ān',
        wuxing: '土',
        meaning: '平安、安定，安宁之意',
        explanation: '安，静也，引申为平安、安定。',
        source: '《论语》"修己以安人"',
        kangxi: { strokes: 6, page: '页139', original: '【寅集上】【宀字部】安' }
      }
    ],
    meaning: '星辰大海，平安顺遂',
    source: '《论语》',
    wuxing: '土土组合',
    baziMatch: '土旺，稳重踏实',
    score: 86,
    uniqueness: '较低',
    uniquenessCount: '全国约0.14%同龄人使用（约11200人）',
    yinyun: {
      tone: '阳平+阴平（平和顺畅）',
      initials: '舌尖后音+喉音',
      score: 87
    },
    personalizedMeaning: '"辰安"寓意孩子如星辰般闪耀，一生平安顺遂，简单而美好的祝愿。'
  },
  '宇轩': {
    name: '宇轩',
    pinyin: 'yǔ xuān',
    characters: [
      {
        char: '宇',
        pinyin: 'yǔ',
        wuxing: '土',
        meaning: '宇宙、气度',
        explanation: '宇，屋檐也，引申为宇宙、气度。',
        source: '《庄子》',
        kangxi: { strokes: 6, page: '页217', original: '【寅集上】【宀字部】宇' }
      },
      {
        char: '轩',
        pinyin: 'xuān',
        wuxing: '土',
        meaning: '高大、气派，轩昂之意',
        explanation: '轩，曲輈藩车也，引申为高大、气派。',
        source: '《诗经》"戎车既安，如轾如轩"',
        kangxi: { strokes: 10, page: '页1250', original: '【酉集上】【車字部】軒' }
      }
    ],
    meaning: '气宇轩昂，风度翩翩',
    source: '《诗经》',
    wuxing: '土土组合',
    baziMatch: '土旺，厚重稳健',
    score: 87,
    uniqueness: '较高',
    uniquenessCount: '全国约0.28%同龄人使用（约22400人）',
    yinyun: {
      tone: '上声+阴平（抑扬有致）',
      initials: '舌根音+舌面音',
      score: 88
    },
    personalizedMeaning: '"宇轩"寓意孩子气度不凡，神采飞扬，有领袖气质，受人尊敬。'
  },
  '晨悦': {
    name: '晨悦',
    pinyin: 'chén yuè',
    characters: [
      {
        char: '晨',
        pinyin: 'chén',
        wuxing: '金',
        meaning: '早晨、晨光，希望之意',
        explanation: '晨，早也，引申为希望、开始。',
        source: '《诗经》"夜乡晨，庭燎有辉"',
        kangxi: { strokes: 11, page: '页496', original: '【辰集中】【日字部】晨' }
      },
      {
        char: '悦',
        pinyin: 'yuè',
        wuxing: '金',
        meaning: '喜悦、愉悦，快乐之意',
        explanation: '悦，高兴也，引申为喜悦、愉悦。',
        source: '《论语》"学而时习之，不亦说乎"',
        kangxi: { strokes: 10, page: '页390', original: '【卯集上】【心字部】悅' }
      }
    ],
    meaning: '晨光熹微，心悦神怡',
    source: '《诗经》《论语》',
    wuxing: '金金组合',
    baziMatch: '金旺，锐利果断',
    score: 85,
    uniqueness: '较低',
    uniquenessCount: '全国约0.16%同龄人使用（约12800人）',
    yinyun: {
      tone: '阳平+去声（平仄和谐）',
      initials: '舌尖后音+舌根音',
      score: 86
    },
    personalizedMeaning: '"晨悦"寓意孩子如清晨的阳光般充满希望，一生喜悦安康，简单而温暖。'
  },
  '梓涵': {
    name: '梓涵',
    pinyin: 'zǐ hán',
    characters: [
      {
        char: '梓',
        pinyin: 'zǐ',
        wuxing: '木',
        meaning: '梓树，故乡之意',
        explanation: '梓，木名，又指故乡。',
        source: '《诗经·小雅》"维桑与梓，必恭敬止"',
        kangxi: { strokes: 11, page: '页528', original: '【辰集中】【木字部】梓' }
      },
      {
        char: '涵',
        pinyin: 'hán',
        wuxing: '水',
        meaning: '包容、涵养，内涵之意',
        explanation: '涵，水泽多也，引申为包容、涵养。',
        source: '《说文解字》',
        kangxi: { strokes: 11, page: '页628', original: '【巳集上】【水字部】涵' }
      }
    ],
    meaning: '杞梓之才，涵养深厚',
    source: '《诗经》',
    wuxing: '木水组合',
    baziMatch: '水木相生，生生不息',
    score: 84,
    uniqueness: '高',
    uniquenessCount: '全国约0.45%同龄人使用（约36000人）',
    yinyun: {
      tone: '上声+阳平（抑扬流畅）',
      initials: '舌尖音+舌根音',
      score: 85
    },
    personalizedMeaning: '"梓涵"寓意孩子如梓树般茁壮成长，有深厚的涵养和包容心，是现代家长喜爱的经典名字。'
  },
  '若溪': {
    name: '若溪',
    pinyin: 'ruò xī',
    characters: [
      {
        char: '若',
        pinyin: 'ruò',
        wuxing: '木',
        meaning: '如同、好像，文雅之意',
        explanation: '若，顺也，引申为如同、好像。',
        source: '《诗经》"桑之未落，其叶沃若"',
        kangxi: { strokes: 8, page: '页1022', original: '【申集上】【艸字部】若' }
      },
      {
        char: '溪',
        pinyin: 'xī',
        wuxing: '水',
        meaning: '小溪、溪流，清澈之意',
        explanation: '溪，山渎无所通者，引申为清澈、流动。',
        source: '《说文解字》',
        kangxi: { strokes: 13, page: '页640', original: '【巳集上】【水字部】溪' }
      }
    ],
    meaning: '若水之溪，清澈灵动',
    source: '《诗经》',
    wuxing: '木水组合',
    baziMatch: '水木相生，清秀灵动',
    score: 86,
    uniqueness: '较低',
    uniquenessCount: '全国约0.12%同龄人使用（约9600人）',
    yinyun: {
      tone: '去声+阴平（抑扬流畅）',
      initials: '舌尖后音+舌面音',
      score: 87
    },
    personalizedMeaning: '"若溪"寓意孩子如溪水般清澈灵动，温柔而有力量，既有柔美又不失坚韧。'
  },
  '思源': {
    name: '思源',
    pinyin: 'sī yuán',
    characters: [
      {
        char: '思',
        pinyin: 'sī',
        wuxing: '金',
        meaning: '思考、思念，智慧之意',
        explanation: '思，容也，从心，引申为思考、思念。',
        source: '《论语》"学而不思则罔"',
        kangxi: { strokes: 9, page: '页381', original: '【卯集上】【心字部】思' }
      },
      {
        char: '源',
        pinyin: 'yuán',
        wuxing: '水',
        meaning: '源头、根本，起源之意',
        explanation: '源，水泉本也，引申为源头、根本。',
        source: '《礼记》"衣食足而知荣辱，源也"',
        kangxi: { strokes: 13, page: '页639', original: '【巳集上】【水字部】源' }
      }
    ],
    meaning: '饮水思源，不忘根本',
    source: '《礼记》《论语》',
    wuxing: '金水组合',
    baziMatch: '金水相生，源远流长',
    score: 88,
    uniqueness: '低',
    uniquenessCount: '全国约0.08%同龄人使用（约6400人）',
    yinyun: {
      tone: '阴平+阳平（平和流畅）',
      initials: '舌尖音+舌根音',
      score: 89
    },
    personalizedMeaning: '"思源"寓意孩子懂得感恩，不忘根本，有深远的智慧和源源不断的创造力。'
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
  yearCanggan: '丙甲',
  monthCanggan: '庚丙',
  dayCanggan: '丁乙己',
  hourCanggan: '癸',
  yearCangganWuxing: '火木',
  monthCangganWuxing: '金火',
  dayCangganWuxing: '火木土',
  hourCangganWuxing: '水',
  yearNayin: '炉中火',
  monthNayin: '长流水',
  dayNayin: '天上火',
  hourNayin: '海中金',
  benming: '火命'
};

// 模拟五行分析
const mockWuxing: WuxingAnalysis = {
  gold: 0,
  wood: 2,
  water: 2,
  fire: 2,
  earth: 2,
  goldValue: 0.54,
  woodValue: 1.9,
  waterValue: 2.12,
  fireValue: 2.66,
  earthValue: 1.71,
  xiyong: ['金', '木'],
  jiyong: ['土', '火'],
  rizhu: '己',
  rizhuWuxing: '土',
  tonglei: ['土', '火'],
  yilei: ['金', '木', '水'],
  tongleiScore: 4.37,
  yileiScore: 4.56,
  wangshuai: '日主偏弱'
};

// 生成唯一ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export function useNamingFlow() {
  // 宝宝会话列表 - 从 localStorage 加载
  const [sessions, setSessions] = useState<BabySession[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('naming_sessions');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  // 当前活跃的宝宝会话ID - 从 localStorage 加载
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('naming_current_session');
    }
    return null;
  });
  // 收藏列表 - 从 localStorage 加载
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('naming_favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  // 打字状态
  const [isTyping, setIsTyping] = useState(false);

  // 持久化 sessions 到 localStorage
  useEffect(() => {
    localStorage.setItem('naming_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // 持久化 currentSessionId 到 localStorage
  useEffect(() => {
    if (currentSessionId) {
      localStorage.setItem('naming_current_session', currentSessionId);
    }
  }, [currentSessionId]);

  // 持久化 favorites 到 localStorage
  useEffect(() => {
    localStorage.setItem('naming_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 当前会话
  const currentSession = useMemo(() => {
    return sessions.find(s => s.id === currentSessionId) || null;
  }, [sessions, currentSessionId]);

  // 当前会话的消息
  const messages = currentSession?.messages || [];
  // 当前会话的宝宝信息
  const babyInfo = currentSession?.babyInfo || null;
  // 当前步骤
  const currentStep = currentSession?.currentStep || 'welcome';

  // 模拟打字效果
  const simulateTyping = useCallback(async (duration: number = 800) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  }, []);

  // 添加AI消息到当前会话
  const addAIMessage = useCallback((content: string, component?: string, data?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content,
      component: component as any,
      data
    };
    
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, newMessage],
          updatedAt: Date.now()
        };
      }
      return session;
    }));
  }, [currentSessionId]);

  // 添加用户消息到当前会话
  const addUserMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content
    };
    
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, newMessage],
          updatedAt: Date.now()
        };
      }
      return session;
    }));
  }, [currentSessionId]);

  // 创建新会话
  const createNewSession = useCallback((babyInfo: BabyInfo) => {
    const newSession: BabySession = {
      id: generateId(),
      babyInfo,
      messages: [],
      currentStep: 'welcome',
      currentNameIndex: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    return newSession.id;
  }, []);

  // 切换到指定会话
  const switchSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
  }, []);

  // 开始新流程
  const startFlow = useCallback(async () => {
    // 如果没有当前会话，创建一个临时会话
    let sessionId = currentSessionId;
    if (!sessionId) {
      const tempBabyInfo: BabyInfo = {
        surname: '临时',
        gender: 'unknown',
        birthDate: new Date().toISOString().split('T')[0],
        birthTime: '',
        birthLocation: ''
      };
      const newSession: BabySession = {
        id: generateId(),
        babyInfo: tempBabyInfo,
        messages: [],
        currentStep: 'welcome',
        currentNameIndex: {},
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      setSessions(prev => [...prev, newSession]);
      setCurrentSessionId(newSession.id);
      sessionId = newSession.id;
      // 等待状态更新
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    await simulateTyping(600);
    
    // 直接添加消息到新会话
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content: '恭喜！先让我了解一下宝宝的基本情况吧😊',
      component: 'babyInfo',
      data: null
    };
    
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return { 
          ...session, 
          messages: [...session.messages, newMessage],
          currentStep: 'babyInfo', 
          updatedAt: Date.now() 
        };
      }
      return session;
    }));
  }, [currentSessionId]);

  // 提交宝宝信息
  const submitBabyInfo = useCallback(async (info: BabyInfo) => {
    // 如果有当前会话（临时会话），复用它并更新宝宝信息
    let sessionId = currentSessionId;
    
    if (sessionId) {
      // 更新现有会话的宝宝信息
      setSessions(prev => prev.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            babyInfo: info,
            updatedAt: Date.now()
          };
        }
        return session;
      }));
    } else {
      // 创建新会话
      sessionId = createNewSession(info);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // 添加用户消息
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `已填写：${info.surname}姓，${info.gender === 'boy' ? '男' : info.gender === 'girl' ? '女' : '未知'}宝宝`
    };
    
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          messages: [...session.messages, newMessage],
          updatedAt: Date.now()
        };
      }
      return session;
    }));
    
    await simulateTyping(800);
    const locationText = info.birthLocation ? `在${info.birthLocation}出生的` : '';
    const genderText = info.gender === 'boy' ? '男孩' : info.gender === 'girl' ? '女孩' : '宝宝';
    
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content: `我看到${locationText}${genderText}👦，这个时节出生的孩子往往性格沉稳。\n\n您对名字有什么特别的期望吗？`,
      component: 'expectation',
      data: null
    };
    
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          messages: [...session.messages, aiMessage],
          currentStep: 'expectation',
          updatedAt: Date.now()
        };
      }
      return session;
    }));
  }, [createNewSession, simulateTyping, currentSessionId]);

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
    
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return { ...session, currentStep: 'additional', updatedAt: Date.now() };
      }
      return session;
    }));
  }, [addAIMessage, addUserMessage, simulateTyping, currentSessionId]);

  // 提交额外信息
  const submitAdditionalInfo = useCallback(async (info: any) => {
    addUserMessage(info.skip ? '跳过' : '已补充信息');
    
    await simulateTyping(1000);
    addAIMessage(
      '好的，让我先为宝宝分析一下生辰八字和五行喜用...',
      'bazi',
      { bazi: mockBazi, wuxing: mockWuxing }
    );
    
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return { 
          ...session, 
          currentStep: 'bazi',
          baziData: { bazi: mockBazi, wuxing: mockWuxing },
          updatedAt: Date.now() 
        };
      }
      return session;
    }));
    
    // 延迟后显示名字方向
    setTimeout(async () => {
      await simulateTyping(1200);
      addAIMessage(
        '根据您的期望和八字分析，我为宝宝准备了几个方向，咱们一起来看看：',
        'direction',
        { directions: nameDirections }
      );
      
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return { ...session, currentStep: 'direction', updatedAt: Date.now() };
        }
        return session;
      }));
    }, 3000);
  }, [addAIMessage, addUserMessage, simulateTyping, currentSessionId]);

  // 选择方向 - 显示该方向的第一个名字
  const selectDirection = useCallback(async (directionId: string) => {
    const direction = nameDirections.find(d => d.id === directionId);
    if (!direction || !currentSessionId) return;
    
    addUserMessage(`我想看看${direction.title}`);
    
    // 获取当前方向的索引，如果没有则从0开始
    const session = sessions.find(s => s.id === currentSessionId);
    const currentIndex = session?.currentNameIndex?.[directionId] || 0;
    const nameKey = direction.sampleNames[currentIndex % direction.sampleNames.length];
    
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return { 
          ...session, 
          selectedDirection: directionId,
          currentStep: 'names',
          updatedAt: Date.now() 
        };
      }
      return session;
    }));
    
    await simulateTyping(800);
    addAIMessage(
      `好的！让我们深入看看${direction.title}：`,
      'nameDetail',
      { name: nameDetails[nameKey] }
    );
  }, [addAIMessage, addUserMessage, simulateTyping, currentSessionId, sessions]);

  // 获取当前方向的下一个名字
  const getNextNameInDirection = useCallback((directionId: string): string | null => {
    const direction = nameDirections.find(d => d.id === directionId);
    if (!direction || !currentSessionId) return null;
    
    const session = sessions.find(s => s.id === currentSessionId);
    const currentIndex = session?.currentNameIndex?.[directionId] || 0;
    const nextIndex = (currentIndex + 1) % direction.sampleNames.length;
    
    // 更新索引
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          currentNameIndex: {
            ...session.currentNameIndex,
            [directionId]: nextIndex
          }
        };
      }
      return session;
    }));
    
    return direction.sampleNames[nextIndex];
  }, [currentSessionId, sessions]);

  // 换一个名字
  const selectName = useCallback(async (name: string) => {
    const nameDetail = nameDetails[name];
    if (!nameDetail) return;
    
    addUserMessage(`我喜欢"${name}"这个风格`);
    
    await simulateTyping(600);
    addAIMessage(
      `您觉得"${name}"怎么样？\n\n如果喜欢这个风格但想调整，我可以：\n• 保留"${name.charAt(0)}"，换第二个字\n• 保留"${name.charAt(1)}"，换第一个字\n• 找类似意境的其他组合`,
      'nameDetail',
      { name: nameDetail }
    );
  }, [addAIMessage, addUserMessage, simulateTyping]);

  // 换名字（真正切换）
  const changeName = useCallback(async () => {
    if (!currentSession) return;
    
    const directionId = currentSession.selectedDirection;
    if (!directionId) return;
    
    const nextNameKey = getNextNameInDirection(directionId);
    if (!nextNameKey) return;
    
    addUserMessage('换一个');
    
    await simulateTyping(800);
    addAIMessage(
      '好的，我再为您推荐一个类似风格的名字：',
      'nameDetail',
      { name: nameDetails[nextNameKey] }
    );
  }, [addAIMessage, addUserMessage, simulateTyping, currentSession, getNextNameInDirection]);

  // 确认选择名字
  const confirmNameSelection = useCallback(async (name: string) => {
    addUserMessage(`就选「${name}」了！`);
    
    await simulateTyping(800);
    addAIMessage(
      `🎉 恭喜您为宝宝选定了「${name}」这个名字！\n\n这个名字寓意美好，五行相合，音韵和谐。相信这个名字会伴随宝宝健康成长，前程似锦！\n\n您还可以：\n• 查看完整起名报告（含八字详解、名字解析等）\n• 分享这个名字给家人朋友\n• 保存为宝宝的人生第一份礼物\n\n祝宝宝健康快乐成长！😊`,
      'completion',
      { name }
    );
    
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return { 
          ...session, 
          selectedName: name,
          currentStep: 'completion',
          updatedAt: Date.now() 
        };
      }
      return session;
    }));
  }, [addAIMessage, addUserMessage, simulateTyping, currentSessionId]);

  // 添加收藏
  const addFavorite = useCallback((name: string, nameDetail: NameDetail) => {
    if (!currentSession) return;
    
    const existingIndex = favorites.findIndex(
      f => f.babyId === currentSession.id && f.name === name
    );
    
    if (existingIndex >= 0) {
      // 已收藏，取消收藏
      setFavorites(prev => prev.filter((_, i) => i !== existingIndex));
    } else {
      // 添加收藏
      const newFavorite: FavoriteItem = {
        id: generateId(),
        babyId: currentSession.id,
        babySurname: currentSession.babyInfo.surname,
        name,
        nameDetail,
        createdAt: Date.now()
      };
      setFavorites(prev => [...prev, newFavorite]);
    }
  }, [currentSession, favorites]);

  // 移除收藏
  const removeFavorite = useCallback((favoriteId: string) => {
    setFavorites(prev => prev.filter(f => f.id !== favoriteId));
  }, []);

  // 检查是否已收藏
  const isFavorited = useCallback((name: string) => {
    if (!currentSession) return false;
    return favorites.some(f => f.babyId === currentSession.id && f.name === name);
  }, [currentSession, favorites]);

  // 获取当前名字
  const getCurrentName = useCallback(() => {
    if (!currentSession?.selectedDirection) return null;
    const direction = nameDirections.find(d => d.id === currentSession.selectedDirection);
    if (!direction) return null;
    const index = currentSession.currentNameIndex?.[currentSession.selectedDirection] || 0;
    const nameKey = direction.sampleNames[index % direction.sampleNames.length];
    return nameDetails[nameKey] || null;
  }, [currentSession]);

  // 获取八字数据
  const getBaziData = useCallback(() => {
    return currentSession?.baziData || { bazi: mockBazi, wuxing: mockWuxing };
  }, [currentSession]);

  return {
    // 状态
    messages,
    currentStep,
    babyInfo,
    currentSession,
    sessions,
    favorites,
    isTyping,
    
    // 方法
    startFlow,
    submitBabyInfo,
    selectExpectation,
    submitAdditionalInfo,
    selectDirection,
    selectName,
    changeName,
    confirmNameSelection,
    switchSession,
    addFavorite,
    removeFavorite,
    isFavorited,
    getCurrentName,
    getBaziData,
    nameDirections,
    nameDetails
  };
}

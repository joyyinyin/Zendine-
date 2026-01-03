
import { MenuItem, Category } from './types';

export const INITIAL_MENU: MenuItem[] = [
  // 雞肉 / 蛋
  { id: 'c1', name: '經典椒麻雞', price: 280, category: Category.CHICKEN_EGG, description: '雲南風味炸雞，淋上特製椒麻醬。', imageUrl: 'https://picsum.photos/seed/c1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'c2', name: '辣炒雞肉', price: 300, category: Category.CHICKEN_EGG, description: '鮮嫩雞丁與特選辣椒大火快炒。', imageUrl: 'https://picsum.photos/seed/c2/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 2, isRecommended: false },
  { id: 'c3', name: '翠玉雞丁', price: 300, category: Category.CHICKEN_EGG, description: '清爽口感的特選雞丁料理。', imageUrl: 'https://picsum.photos/seed/c3/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: false },
  { id: 'c4', name: '緬式茶葉雞', price: 300, category: Category.CHICKEN_EGG, description: '獨特茶葉香氣入菜，別具一格。', imageUrl: 'https://picsum.photos/seed/c4/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 'c5', name: '泰式椰汁雞', price: 300, category: Category.CHICKEN_EGG, description: '濃郁椰奶配上嫩雞肉，口感滑順。', imageUrl: 'https://picsum.photos/seed/c5/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'c6', name: '泰式綠咖哩雞', price: 320, category: Category.CHICKEN_EGG, description: '經典綠咖哩香辣帶勁。', imageUrl: 'https://picsum.photos/seed/c6/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'c7', name: '山頭辣子雞', price: 320, category: Category.CHICKEN_EGG, description: '香脆辣口，嗜辣者必點。', imageUrl: 'https://picsum.photos/seed/c7/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 2, isRecommended: true },
  { id: 'c8', name: '雲醬桂花蛋', price: 200, category: Category.CHICKEN_EGG, description: '獨門雲醬調配出的精緻蛋料理。', imageUrl: 'https://picsum.photos/seed/c8/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true },
  { id: 'c9', name: '雲筍烘蛋', price: 200, category: Category.CHICKEN_EGG, description: '酸脆雲筍與厚實烘蛋的完美結合。', imageUrl: 'https://picsum.photos/seed/c9/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'c10', name: '雲腿菌菇烘蛋', price: 300, category: Category.CHICKEN_EGG, description: '嚴選雲腿與多樣菌菇，香氣十足。', imageUrl: 'https://picsum.photos/seed/c10/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: false },

  // 豬肉
  { id: 'p1', name: '經典打拋豬', price: 260, category: Category.PORK, description: '泰緬餐廳經典必備，超下飯首選。', imageUrl: 'https://picsum.photos/seed/p1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'p2', name: '臘醃菜豬肉', price: 280, category: Category.PORK, description: '傳統臘醃菜的獨特酸鹹味。', imageUrl: 'https://picsum.photos/seed/p2/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 'p3', name: '雲筍苦瓜豬', price: 280, category: Category.PORK, description: '層次感豐富的快炒料理。', imageUrl: 'https://picsum.photos/seed/p3/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'p4', name: '蒜苗五花肉', price: 320, category: Category.PORK, description: '肥而不膩，蒜香撲鼻。', imageUrl: 'https://picsum.photos/seed/p4/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'p5', name: '緬式鹹豬肉', price: 320, category: Category.PORK, description: '特製醃料入味，越嚼越香。', imageUrl: 'https://picsum.photos/seed/p5/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true },
  { id: 'p6', name: '臘醃菜豬肉炒年糕', price: 320, category: Category.PORK, description: '口感軟Q，鹹香開胃。', imageUrl: 'https://picsum.photos/seed/p6/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true },
  { id: 'p7', name: '臘醃菜豬肉炒毛豆', price: 320, category: Category.PORK, description: '豐富蛋白質與醃菜的美味組合。', imageUrl: 'https://picsum.photos/seed/p7/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: false },

  // 牛肉
  { id: 'b1', name: '雲筍苦瓜牛', price: 380, category: Category.BEEF, description: '鮮嫩牛肉配上酸脆筍干。', imageUrl: 'https://picsum.photos/seed/b1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 'b2', name: '臘醃菜牛肉', price: 380, category: Category.BEEF, description: '經典臘醃菜風味炒牛肉。', imageUrl: 'https://picsum.photos/seed/b2/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 'b3', name: '泰式椰汁牛', price: 380, category: Category.BEEF, description: '濃純椰香與牛肉的交響曲。', imageUrl: 'https://picsum.photos/seed/b3/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },

  // 海鮮
  { id: 's1', name: '辣炒花枝', price: 380, category: Category.SEAFOOD, description: '鮮美花枝搭配勁辣調味。', imageUrl: 'https://picsum.photos/seed/s1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 2, isRecommended: false },
  { id: 's2', name: '緬式魚露蝦', price: 380, category: Category.SEAFOOD, description: '清甜蝦肉淋上道地魚露。', imageUrl: 'https://picsum.photos/seed/s2/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 's3', name: '清蒸檸檬蝦', price: 580, category: Category.SEAFOOD, description: '酸辣開胃，蝦肉鮮甜。', imageUrl: 'https://picsum.photos/seed/s3/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 's4', name: '清蒸檸檬魚', price: 580, category: Category.SEAFOOD, description: '整條鮮魚清蒸，湯底酸辣十足。', imageUrl: 'https://picsum.photos/seed/s4/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 's5', name: '泰味香酥魚', price: 580, category: Category.SEAFOOD, description: '外酥內嫩，特色泰式抹料。', imageUrl: 'https://picsum.photos/seed/s5/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 's6', name: '山頭辣子魚', price: 580, category: Category.SEAFOOD, description: '山頭風味酥炸辣魚塊。', imageUrl: 'https://picsum.photos/seed/s6/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 's7', name: '豆酥鱈魚', price: 0, category: Category.SEAFOOD, description: '酥脆豆酥覆蓋嫩滑鱈魚。', imageUrl: 'https://picsum.photos/seed/s7/400/300', isAvailable: true, isMarketPrice: true, spicinessLevel: 0, isRecommended: false },
  { id: 's8', name: '緬式魚露鱈魚', price: 0, category: Category.SEAFOOD, description: '鱈魚細緻與魚露的完美邂逅。', imageUrl: 'https://picsum.photos/seed/s8/400/300', isAvailable: true, isMarketPrice: true, spicinessLevel: 1, isRecommended: false },

  // 涼拌
  { id: 'l1', name: '緬式涼拌茶葉', price: 300, category: Category.COLD, description: '緬甸傳統特色前菜，口感多層次。', imageUrl: 'https://picsum.photos/seed/l1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 'l2', name: '雲南大薄片', price: 300, category: Category.COLD, description: '手工切至透光的豬頭肉，爽口Q彈。', imageUrl: 'https://picsum.photos/seed/l2/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 'l3', name: '水醃菜拌大薄片', price: 380, category: Category.COLD, description: '水醃菜增加更多層次的酸度。', imageUrl: 'https://picsum.photos/seed/l3/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'l4', name: '涼拌牛肉', price: 380, category: Category.COLD, description: '酸辣醬汁拌入精選牛肉片。', imageUrl: 'https://picsum.photos/seed/l4/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'l5', name: '涼拌海鮮', price: 380, category: Category.COLD, description: '豐富海味搭配酸辣醬汁。', imageUrl: 'https://picsum.photos/seed/l5/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },

  // 蔬菜
  { id: 'v1', name: '蝦醬空心菜', price: 180, category: Category.VEGETABLE, description: '道地蝦醬快炒空心菜。', imageUrl: 'https://picsum.photos/seed/v1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: true },
  { id: 'v2', name: '雲筍空心菜', price: 180, category: Category.VEGETABLE, description: '雲筍酸度提升蔬菜鮮甜。', imageUrl: 'https://picsum.photos/seed/v2/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 1, isRecommended: false },
  { id: 'v3', name: '豆酥空心菜', price: 180, category: Category.VEGETABLE, description: '不辣的酥脆豆酥風味。', imageUrl: 'https://picsum.photos/seed/v3/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: false },
  { id: 'v4', name: '雲醬高麗菜', price: 180, category: Category.VEGETABLE, description: '清脆高麗菜與特製雲醬。', imageUrl: 'https://picsum.photos/seed/v4/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true },
  { id: 'v11', name: '辣炒茄子', price: 200, category: Category.VEGETABLE, description: '九層塔與辣味交融，非常下飯。', imageUrl: 'https://picsum.photos/seed/v11/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 2, isRecommended: true },

  // 湯
  { id: 't1', name: '番茄苦瓜蛋湯', price: 200, category: Category.SOUP, description: '清爽健康的家常熱湯。', imageUrl: 'https://picsum.photos/seed/t1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: false },
  { id: 't6', name: '汽鍋雞 (預約)', price: 680, category: Category.SOUP, description: '雲南特色料理，雞肉鮮甜、湯汁清澈。', imageUrl: 'https://picsum.photos/seed/t6/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true },

  // 飯/甜點/飲料
  { id: 'd1', name: '白飯', price: 20, category: Category.STAPLE_DRINK, description: '熱騰騰香Q白米飯。', imageUrl: 'https://picsum.photos/seed/d1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: false },
  { id: 'd4', name: '緬式奶茶', price: 70, category: Category.STAPLE_DRINK, description: '特製茶底與濃郁煉乳。', imageUrl: 'https://picsum.photos/seed/d4/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true },

  // 套餐
  { id: 'set1', name: '套餐料理 ($3000)', price: 3000, category: Category.SET_MEAL, description: '4-6人份：清蒸檸檬魚、椒麻雞、魚露蝦、醃菜豬肉年糕等。', imageUrl: 'https://picsum.photos/seed/set1/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true },
  { id: 'set2', name: '套餐料理 ($5000)', price: 5000, category: Category.SET_MEAL, description: '6-8人份：豆酥鱈魚、雲南烘蛋、椒麻雞、咖哩草蝦等。', imageUrl: 'https://picsum.photos/seed/set2/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true },
  { id: 'set3', name: '套餐料理 ($7000)', price: 7000, category: Category.SET_MEAL, description: '8-10人份：頂級全席，包含鮮蝦煲、魚露鱈魚等。', imageUrl: 'https://picsum.photos/seed/set3/400/300', isAvailable: true, isMarketPrice: false, spicinessLevel: 0, isRecommended: true }
];

export const TABLES = ['1', '2', '3', '4', 'Takeout'];

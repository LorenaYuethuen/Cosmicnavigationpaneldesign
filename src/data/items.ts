export type ItemCategory =
  | 'personal-care'
  | 'skincare'
  | 'makeup'
  | 'hygiene'
  | 'household'
  | 'tech-accessories'
  | 'supplements'
  | 'clothing'
  | 'other';

export type ItemStatus =
  | 'in-stock'
  | 'low-stock'
  | 'out-of-stock'
  | 'need-to-buy'
  | 'researching';

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  status: ItemStatus;
  priority: 'high' | 'medium' | 'low';
  notes?: string;
  link?: string;
  tags?: string[];
}

export const categoryLabels: Record<ItemCategory, string> = {
  'personal-care': '个人护理',
  'skincare': '护肤',
  'makeup': '彩妆',
  'hygiene': '卫生用品',
  'household': '家居用品',
  'tech-accessories': '科技配件',
  'supplements': '营养补充',
  'clothing': '服装',
  'other': '其他',
};

export const statusLabels: Record<ItemStatus, string> = {
  'in-stock': '有库存',
  'low-stock': '库存不足',
  'out-of-stock': '缺货',
  'need-to-buy': '需要购买',
  'researching': '研究中',
};

export const itemsDatabase: Item[] = [
  {
    id: 'hand-soap',
    name: '洗手液',
    category: 'personal-care',
    status: 'in-stock',
    priority: 'high',
    tags: ['清洁', '日常'],
  },
  {
    id: 'toothpaste',
    name: '牙膏',
    category: 'personal-care',
    status: 'low-stock',
    priority: 'high',
    tags: ['口腔', '日常'],
  },
  {
    id: 'shampoo',
    name: '洗发水',
    category: 'personal-care',
    status: 'in-stock',
    priority: 'medium',
    tags: ['头发护理'],
  },
  {
    id: 'conditioner',
    name: '护发素',
    category: 'personal-care',
    status: 'in-stock',
    priority: 'medium',
    tags: ['头发护理'],
  },
  {
    id: 'body-wash',
    name: '沐浴露',
    category: 'personal-care',
    status: 'in-stock',
    priority: 'medium',
    tags: ['清洁', '日常'],
  },
  {
    id: 'facial-cleanser',
    name: '洗面奶',
    category: 'skincare',
    status: 'in-stock',
    priority: 'high',
    tags: ['清洁', '护肤'],
  },
  {
    id: 'makeup-remover',
    name: '卸妆膏',
    category: 'skincare',
    status: 'low-stock',
    priority: 'high',
    tags: ['卸妆', '护肤'],
  },
  {
    id: 'toner',
    name: '爽肤水',
    category: 'skincare',
    status: 'in-stock',
    priority: 'medium',
    tags: ['护肤'],
  },
  {
    id: 'essence',
    name: '精华',
    category: 'skincare',
    status: 'in-stock',
    priority: 'medium',
    tags: ['护肤'],
  },
  {
    id: 'moisturizer',
    name: '面霜',
    category: 'skincare',
    status: 'in-stock',
    priority: 'medium',
    tags: ['护肤', '保湿'],
  },
  {
    id: 'sunscreen',
    name: '防晒霜',
    category: 'skincare',
    status: 'need-to-buy',
    priority: 'high',
    tags: ['防晒', '护肤'],
  },
  {
    id: 'face-mask',
    name: '面膜',
    category: 'skincare',
    status: 'in-stock',
    priority: 'low',
    tags: ['护肤', '保湿'],
  },
  {
    id: 'tissues',
    name: '抽纸',
    category: 'hygiene',
    status: 'low-stock',
    priority: 'high',
    tags: ['日常', '清洁'],
  },
  {
    id: 'wet-toilet-paper',
    name: '湿厕纸',
    category: 'hygiene',
    status: 'in-stock',
    priority: 'medium',
    tags: ['卫生'],
  },
  {
    id: 'sanitary-pads',
    name: '卫生巾',
    category: 'hygiene',
    status: 'in-stock',
    priority: 'high',
    tags: ['个人护理'],
  },
  {
    id: 'cotton-pads',
    name: '化妆棉',
    category: 'hygiene',
    status: 'in-stock',
    priority: 'medium',
    tags: ['护肤', '清洁'],
  },
  {
    id: 'bath-towel',
    name: '浴巾',
    category: 'household',
    status: 'in-stock',
    priority: 'medium',
    tags: ['浴室'],
  },
  {
    id: 'summer-blanket',
    name: '夏凉被',
    category: 'household',
    status: 'in-stock',
    priority: 'low',
    tags: ['床上用品'],
  },
  {
    id: 'shower-filter',
    name: '淋浴过滤器',
    category: 'household',
    status: 'need-to-buy',
    priority: 'medium',
    tags: ['浴室', '健康'],
    notes: '改善水质',
  },
  {
    id: 'phone-screen-protector',
    name: '手机膜',
    category: 'tech-accessories',
    status: 'need-to-buy',
    priority: 'high',
    tags: ['电子产品'],
  },
  {
    id: 'ipad-pen-tip',
    name: 'iPad 笔头',
    category: 'tech-accessories',
    status: 'researching',
    priority: 'low',
    tags: ['电子产品'],
  },
  {
    id: 'vitamin-c',
    name: '维生素C',
    category: 'supplements',
    status: 'in-stock',
    priority: 'medium',
    tags: ['健康', '营养'],
  },
  {
    id: 'sports-leggings',
    name: '运动 Leggings',
    category: 'clothing',
    status: 'need-to-buy',
    priority: 'medium',
    tags: ['运动', '服装'],
  },
  {
    id: 'foundation',
    name: '粉底液',
    category: 'makeup',
    status: 'in-stock',
    priority: 'low',
    tags: ['彩妆'],
  },
  {
    id: 'lipstick',
    name: '口红',
    category: 'makeup',
    status: 'in-stock',
    priority: 'low',
    tags: ['彩妆'],
  },
  {
    id: 'nail-polish',
    name: '指甲油',
    category: 'makeup',
    status: 'researching',
    priority: 'low',
    tags: ['美甲'],
  },
  {
    id: 'laundry-detergent',
    name: '洗衣液',
    category: 'household',
    status: 'in-stock',
    priority: 'high',
    tags: ['清洁', '日常'],
  },
  {
    id: 'dish-soap',
    name: '洗洁精',
    category: 'household',
    status: 'in-stock',
    priority: 'high',
    tags: ['清洁', '日常'],
  },
  {
    id: 'trash-bags',
    name: '垃圾袋',
    category: 'household',
    status: 'low-stock',
    priority: 'medium',
    tags: ['日常'],
  },
  {
    id: 'air-freshener',
    name: '空气清新剂',
    category: 'household',
    status: 'need-to-buy',
    priority: 'low',
    tags: ['清洁', '香氛'],
  },
];

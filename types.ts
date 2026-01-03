
export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  SERVED = 'SERVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum Category {
  CHICKEN_EGG = '雞肉/蛋',
  PORK = '豬肉',
  BEEF = '牛肉',
  SEAFOOD = '海鮮',
  COLD = '涼拌',
  VEGETABLE = '蔬菜',
  SOUP = '湯',
  STAPLE_DRINK = '飯/甜點/飲料',
  SET_MEAL = '套餐料理'
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  isMarketPrice: boolean;
  spicinessLevel: 0 | 1 | 2; // 0: None, 1: Spicy, 2: Very Spicy
  isRecommended: boolean;
  customizationOptions?: string[];
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  customizations: {
    spiciness?: 'None' | 'Mild' | 'Medium' | 'Hot';
    drinkTiming?: 'With meal' | 'Before meal' | 'After meal';
    notes?: string;
    sauceSeparate?: boolean;
  };
}

export interface Order {
  id: string;
  tableNumber: string; // "1" to "4" or "Takeout"
  pax: number;
  timestamp: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

export type UserRole = 'CUSTOMER' | 'STAFF' | 'ADMIN';

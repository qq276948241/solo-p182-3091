export type Category = "vegetable" | "handmade" | "bakery";

export interface Product {
  id: string;
  name: string;
  price: string;
  unit: string;
  note?: string;
  image: string;
}

export interface Stall {
  id: string;
  name: string;
  category: Category;
  coverImage: string;
  description: string;
  ownerName: string;
  ownerAvatar: string;
  ownerQuote: string;
  businessHours: string;
  location: string;
  products: Product[];
}

export const CATEGORY_LABEL: Record<Category, string> = {
  vegetable: "蔬菜",
  handmade: "手作",
  bakery: "烘焙",
};

export const CATEGORY_TEXT: Record<Category, string> = {
  vegetable: "🥬 蔬菜",
  handmade: "🧶 手作",
  bakery: "🥐 烘焙",
};

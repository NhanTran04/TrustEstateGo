export interface Property {
  id: number;
  categoryId: number;
  categoryName: string;
  userId: number;
  title: string;
  description: string;
  expireAt: string;
  price: number;
  location: string;
  isActive: boolean;
  propertyType: string;
  createdAt: string;
  images: string[];
}
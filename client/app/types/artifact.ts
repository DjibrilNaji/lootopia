export interface Artifact {
  id: string;
  name: string;
  category: 'weapon' | 'armor' | 'accessory' | 'consumable';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  image: string;
  seller: string;
  description: string;
  stats?: {
    power?: number;
    defense?: number;
    magic?: number;
  };
}

export interface SearchFilters {
  searchTerm: string;
  selectedCategory: string;
  selectedRarity: string;
}


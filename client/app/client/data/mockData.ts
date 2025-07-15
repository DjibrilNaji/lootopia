import { Artifact } from '~/types/artifact';
import { GoldPackage } from '~/types/GoldPackage';
import { Coins, Zap, Crown, Gem } from "lucide-react"

export const mockArtifacts: Artifact[] = [
  {
    id: '1',
    name: 'Épée de Lumière Dorée',
    category: 'weapon',
    rarity: 'legendary',
    price: 2500,
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: 'DragonSlayer99',
    description: 'Une épée légendaire forgée dans les flammes du soleil. Augmente considérablement les dégâts de lumière.',
    stats: { power: 95, magic: 75 }
  },
  {
    id: '2',
    name: 'Bouclier du Gardien',
    category: 'armor',
    rarity: 'epic',
    price: 1800,
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: 'ShieldMaster',
    description: 'Un bouclier incassable qui protège contre tous types d\'attaques.',
    stats: { defense: 88, power: 20 }
  },
  {
    id: '3',
    name: 'Amulette des Vents',
    category: 'accessory',
    rarity: 'rare',
    price: 950,
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: 'WindWalker',
    description: 'Augmente la vitesse de déplacement et confère la capacité de lévitation.',
    stats: { magic: 60, power: 30 }
  },
  {
    id: '4',
    name: 'Potion de Régénération Supreme',
    category: 'consumable',
    rarity: 'epic',
    price: 450,
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: 'AlchemistPro',
    description: 'Restaure instantanément 100% des points de vie et de mana.',
    stats: { magic: 100 }
  },
  {
    id: '5',
    name: 'Dague de l\'Ombre',
    category: 'weapon',
    rarity: 'epic',
    price: 1600,
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: 'ShadowAssassin',
    description: 'Une dague maudite qui inflige des dégâts d\'ombre et augmente la vitesse d\'attaque.',
    stats: { power: 78, magic: 45 }
  },
  {
    id: '6',
    name: 'Armure du Phoenix',
    category: 'armor',
    rarity: 'legendary',
    price: 3200,
    image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: 'PhoenixRider',
    description: 'Armure légendaire qui octroie l\'immunité au feu et une régénération passive.',
    stats: { defense: 92, magic: 65 }
  }
];




export const goldPackages: GoldPackage[] = [
    {
      id: "starter",
      name: "Pack Débutant",
      gold: 100,
      price: 9.99,
      icon: Coins,
    },
    {
      id: "adventurer",
      name: "Pack Aventurier",
      gold: 250,
      price: 19.99,
      bonus: 25,
      icon: Zap,
    },
    {
      id: "explorer",
      name: "Pack Explorateur",
      gold: 500,
      price: 39.99,
      bonus: 75,
      popular: true,
      icon: Crown,
    },
    {
      id: "legend",
      name: "Pack Légendaire",
      gold: 1000,
      price: 69.99,
      bonus: 200,
      icon: Gem,
    },
]

import { useState, useMemo } from 'react';
import type { Artifact, SearchFilters } from '~/types/artifact';

export function useMarketplace(artifacts: Artifact[]) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [showSellModal, setShowSellModal] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    selectedCategory: 'all',
    selectedRarity: 'all'
  });

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter(artifact => {
      const matchesSearch = artifact.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           artifact.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesCategory = filters.selectedCategory === 'all' || artifact.category === filters.selectedCategory;
      const matchesRarity = filters.selectedRarity === 'all' || artifact.rarity === filters.selectedRarity;
      
      return matchesSearch && matchesCategory && matchesRarity;
    });
  }, [artifacts, filters]);

  const toggleCart = (artifactId: string) => {
    setCart(prev => 
      prev.includes(artifactId) 
        ? prev.filter(id => id !== artifactId)
        : [...prev, artifactId]
    );
  };

  const toggleFavorite = (artifactId: string) => {
    setFavorites(prev => 
      prev.includes(artifactId) 
        ? prev.filter(id => id !== artifactId)
        : [...prev, artifactId]
    );
  };

  return {
    activeTab,
    setActiveTab,
    showSellModal,
    setShowSellModal,
    cart,
    favorites,
    filters,
    setFilters,
    filteredArtifacts,
    toggleCart,
    toggleFavorite
  };
}
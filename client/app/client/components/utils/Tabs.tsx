interface TabProps {
  activeTab: 'buy' | 'sell';
  onTabChange: (tab: 'buy' | 'sell') => void;
}

export default function Tab({ activeTab, onTabChange }: TabProps) {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
      <button
        onClick={() => onTabChange('buy')}
        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
          activeTab === 'buy'
            ? 'bg-white text-yellow-600 shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Acheter des Artefacts
      </button>
      <button
        onClick={() => onTabChange('sell')}
        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
          activeTab === 'sell'
            ? 'bg-white text-yellow-600 shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Vendre mes Artefacts
      </button>
    </div>
  );
}
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Pressable,
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { TreasureCard } from '@/src/components/TreasureCard';
import { QuickActionCard } from '@/src/components/QuickActionCard';
import { useAuth } from '@/src/client/hook/useAuth';

const treasureHunts = [
  {
    id: '1',
    title: 'Le Trésor du Parc Central',
    location: 'Parc Central, Paris',
    difficulty: 'Facile' as const,
    participants: 24,
    reward: '150 pts',
    timeEstimate: '45 min',
    imageUrl: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Mystères du Quartier Latin',
    location: 'Quartier Latin, Paris',
    difficulty: 'Moyen' as const,
    participants: 18,
    reward: '300 pts',
    timeEstimate: '1h 30',
    imageUrl: 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'L\'Énigme de Montmartre',
    location: 'Montmartre, Paris',
    difficulty: 'Difficile' as const,
    participants: 12,
    reward: '500 pts',
    timeEstimate: '2h 15',
    imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header avec gradient */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Bonjour {user?.username || 'Aventurier'} 👋</Text>
            <Text style={styles.subtitle}>Prêt pour une nouvelle aventure ?</Text>
          </View>
          <Pressable style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <Text style={styles.searchPlaceholder}>Rechercher une chasse...</Text>
          </View>
          <Pressable style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Actions rapides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActions}>
            <QuickActionCard
              title="Créer"
              subtitle="Nouvelle chasse"
              iconName="add"
              iconFamily="Ionicons"
              color="#10B981"
              onPress={() => {}}
            />
            <QuickActionCard
              title="Explorer"
              subtitle="Carte AR"
              iconName="map"
              iconFamily="Ionicons"
              color="#F59E0B"
              onPress={() => {}}
            />
            <QuickActionCard
              title="Défis"
              subtitle="Quotidiens"
              iconName="flash"
              iconFamily="Ionicons"
              color="#EF4444"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Statistiques utilisateur */}
        {user && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vos performances</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
              
                <Text style={styles.statLabel}>Trésors trouvés</Text>
              </View>
              <View style={styles.statCard}>
     
                <Text style={styles.statLabel}>Chasseur Expert</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="trophy" size={24} color="#F59E0B" />
                <Text style={styles.statLabel}>Top 10%</Text>
              </View>
            </View>
          </View>
        )}

        {/* Chasses populaires */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chasses populaires</Text>
            <Pressable>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </Pressable>
          </View>
          
          {treasureHunts.map((hunt) => (
            <TreasureCard
              key={hunt.id}
              title={hunt.title}
              location={hunt.location}
              difficulty={hunt.difficulty}
              participants={hunt.participants}
              reward={hunt.reward}
              timeEstimate={hunt.timeEstimate}
              imageUrl={hunt.imageUrl}
              onPress={() => {}}
            />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#6B7280',
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});
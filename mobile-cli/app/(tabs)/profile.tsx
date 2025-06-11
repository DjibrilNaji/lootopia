import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  ScrollView,
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '@/src/client/hook/useAuth';

interface MenuItemProps {
  iconName: string;
  iconFamily: 'Ionicons' | 'MaterialIcons' | 'FontAwesome5';
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  color?: string;
}

function MenuItem({ iconName, iconFamily, title, subtitle, onPress, showChevron = true, color = '#6B7280' }: MenuItemProps) {
  const IconComponent = iconFamily === 'Ionicons' ? Ionicons : 
                       iconFamily === 'MaterialIcons' ? MaterialIcons : FontAwesome5;

  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIconContainer, { backgroundColor: `${color}15` }]}>
          <IconComponent name={iconName as any} size={20} color={color} />
        </View>
        <View>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const achievements = [
    { id: 1, title: 'Premier Trésor', icon: '🏆', unlocked: true },
    { id: 2, title: 'Explorateur', icon: '🗺️', unlocked: true },
    { id: 3, title: 'Chasseur Expert', icon: '⭐', unlocked: true },
    { id: 4, title: 'Maître AR', icon: '🎯', unlocked: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {user ? (
          <>
            {/* Header avec profil utilisateur */}
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.header}
            >
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarBubble}>
                    <Text style={styles.avatarText}>
                      {user.username?.[0]?.toUpperCase() ?? '?'}
                    </Text>
                  </View>
                  <Pressable style={styles.editButton}>
                    <Ionicons name="pencil" size={16} color="#FFFFFF" />
                  </Pressable>
                </View>
                
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
                
                <View style={styles.levelBadge}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  
                </View>
              </View>
            </LinearGradient>

            {/* Statistiques */}
            <View style={styles.statsSection}>
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={24} color="#F59E0B" />
                <Text style={styles.statNumber}>1</Text>
                <Text style={styles.statLabel}>Trésors</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="location" size={24} color="#10B981" />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Lieux visités</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="people" size={24} color="#6366F1" />
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Amis</Text>
              </View>
            </View>

            {/* Succès récents */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Succès récents</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
                {achievements.map((achievement) => (
                  <View 
                    key={achievement.id} 
                    style={[
                      styles.achievementCard,
                      !achievement.unlocked && styles.achievementCardLocked
                    ]}
                  >
                    <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                    <Text style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.achievementTitleLocked
                    ]}>
                      {achievement.title}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Menu */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Paramètres</Text>
              <View style={styles.menuContainer}>
                <MenuItem
                  iconName="pencil"
                  iconFamily="Ionicons"
                  title="Modifier le profil"
                  subtitle="Nom, photo, informations"
                  onPress={() => {}}
                  color="#6366F1"
                />
                <MenuItem
                  iconName="shield-checkmark"
                  iconFamily="Ionicons"
                  title="Confidentialité"
                  subtitle="Contrôlez vos données"
                  onPress={() => {}}
                  color="#10B981"
                />
                <MenuItem
                  iconName="gift"
                  iconFamily="Ionicons"
                  title="Inviter des amis"
                  subtitle="Gagnez des récompenses"
                  onPress={() => {}}
                  color="#F59E0B"
                />
                <MenuItem
                  iconName="help-circle"
                  iconFamily="Ionicons"
                  title="Aide & Support"
                  subtitle="FAQ, contact"
                  onPress={() => {}}
                  color="#8B5CF6"
                />
                <MenuItem
                  iconName="settings"
                  iconFamily="Ionicons"
                  title="Paramètres avancés"
                  subtitle="Notifications, langue"
                  onPress={() => {}}
                  color="#6B7280"
                />
              </View>
            </View>

            {/* Déconnexion */}
            <View style={styles.section}>
              <Pressable style={styles.logoutButton} onPress={logout}>
                <Ionicons name="log-out" size={20} color="#EF4444" />
                <Text style={styles.logoutText}>Déconnexion</Text>
              </Pressable>
            </View>
          </>
        ) : (
          /* État non connecté */
          <View style={styles.notLoggedIn}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.loginPrompt}
            >
              <Text style={styles.loginTitle}>Rejoignez Lootopia</Text>
              <Text style={styles.loginSubtitle}>
                Découvrez des trésors cachés dans le monde réel grâce à la réalité augmentée
              </Text>
              
              <View style={styles.loginButtons}>
                <Link href="/login" asChild>
                  <Pressable style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Connexion</Text>
                  </Pressable>
                </Link>
                
                <Link href="/register" asChild>
                  <Pressable style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Créer un compte</Text>
                  </Pressable>
                </Link>
              </View>
            </LinearGradient>
            
            <View style={styles.features}>
              <Text style={styles.featuresTitle}>Pourquoi Lootopia ?</Text>
              <View style={styles.featureItem}>
                <Ionicons name="trophy" size={24} color="#F59E0B" />
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Chasses au trésor AR</Text>
                  <Text style={styles.featureDescription}>Explorez le monde avec la réalité augmentée</Text>
                </View>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="people" size={24} color="#6366F1" />
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Communauté active</Text>
                  <Text style={styles.featureDescription}>Rejoignez des milliers d'aventuriers</Text>
                </View>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="gift" size={24} color="#10B981" />
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Récompenses réelles</Text>
                  <Text style={styles.featureDescription}>Gagnez des prix et des expériences</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        
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
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarBubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 32,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#10B981',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  achievementsScroll: {
    paddingLeft: 20,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementCardLocked: {
    backgroundColor: '#F3F4F6',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#9CA3AF',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  notLoggedIn: {
    flex: 1,
  },
  loginPrompt: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  loginButtons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6366F1',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  features: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  bottomSpacing: {
    height: 100,
  },
});
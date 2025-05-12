import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, CircleCheck as CheckCircle2, Lock, Clock } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate 
} from 'react-native-reanimated';
import { getUserProfile, completeChallenge, getCompletedChallenges } from '@/utils/storage';
import { challenges } from '@/utils/challenges';
import { NavigationContext } from './_layout';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 130 : 110;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ChallengesScreen() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [streak, setStreak] = useState(0);
  const { setIsVisible } = useContext(NavigationContext);
  
  const modalY = useSharedValue(1000);
  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const headerTranslateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      
      // Se começou a rolar (qualquer valor positivo), esconde imediatamente
      if (currentScrollY > 0) {
        headerTranslateY.value = -HEADER_HEIGHT - 50; // Adiciona margem extra para garantir que suma completamente
      } else {
        // Só mostra quando voltar exatamente ao topo
        headerTranslateY.value = withTiming(0, { duration: 200 });
      }
      
      scrollY.value = currentScrollY;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerTranslateY.value }],
      opacity: interpolate(
        headerTranslateY.value,
        [-HEADER_HEIGHT - 50, 0],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  useEffect(() => {
    loadUserData();
  }, []);
  
  const loadUserData = async () => {
    const profile = await getUserProfile();
    setUserProfile(profile);
    setStreak(profile?.streakDays || 0);
    
    const completed = await getCompletedChallenges();
    setCompletedChallengeIds(completed);
  };
  
  const showChallengeDetails = (challenge: any) => {
    setSelectedChallenge(challenge);
    setIsVisible(false);
    modalY.value = withTiming(0, { duration: 300 });
  };
  
  const hideModal = () => {
    modalY.value = withTiming(1000, { duration: 300 });
    setTimeout(() => {
      setSelectedChallenge(null);
      setIsVisible(true);
    }, 300);
  };
  
  const handleCompleteChallenge = async () => {
    if (selectedChallenge) {
      await completeChallenge(selectedChallenge.id);
      await loadUserData();
      hideModal();
    }
  };

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: modalY.value }]
    };
  });
  
  const isChallengeLocked = (challenge: any) => {
    // Check if the challenge is locked based on streak requirement
    return challenge.requiredStreak > streak;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Desafios</Text>
            <Text style={styles.subtitle}>Complete desafios diários para manter o progresso</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{completedChallengeIds.length}</Text>
                <Text style={styles.statLabel}>Desafios Completos</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{challenges.length}</Text>
                <Text style={styles.statLabel}>Desafios no Total</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>

      <AnimatedScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { paddingTop: HEADER_HEIGHT }]}>
          <Text style={styles.sectionTitle}>Desafio Diário</Text>
          
          <TouchableOpacity 
            style={styles.featuredChallengeCard}
            onPress={() => showChallengeDetails(challenges[0])}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg' }}
              style={styles.featuredChallengeImage}
            />
            <View style={styles.featuredChallengeContent}>
              <View style={styles.featuredChallengeBadge}>
                <Trophy size={12} color="#fff" />
                <Text style={styles.featuredChallengeBadgeText}>Diário</Text>
              </View>
              <Text style={styles.featuredChallengeTitle}>{challenges[0].title}</Text>
              <Text style={styles.featuredChallengeDescription}>{challenges[0].shortDescription}</Text>
              
              {completedChallengeIds.includes(challenges[0].id) ? (
                <View style={styles.completedBadge}>
                  <CheckCircle2 size={16} color="#16A34A" />
                  <Text style={styles.completedText}>Completado</Text>
                </View>
              ) : (
                <View style={styles.startBadge}>
                  <Text style={styles.startText}>Iniciar Desafio</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <Text style={styles.sectionTitle}>Todos os Desafios</Text>
          
          <View style={styles.challengeGrid}>
            {challenges.slice(1).map(challenge => (
              <TouchableOpacity
                key={challenge.id}
                style={[
                  styles.challengeCard,
                  isChallengeLocked(challenge) && styles.challengeCardLocked
                ]}
                onPress={() => !isChallengeLocked(challenge) && showChallengeDetails(challenge)}
                disabled={isChallengeLocked(challenge)}
              >
                {isChallengeLocked(challenge) && (
                  <View style={styles.lockOverlay}>
                    <Lock size={24} color="#fff" />
                    <Text style={styles.lockText}>Desbloqueie aos {challenge.requiredStreak} dias</Text>
                  </View>
                )}
                
                <View style={styles.challengeHeader}>
                  <View style={[
                    styles.challengeTypeBadge,
                    challenge.type === 'physical' && styles.physicalBadge,
                    challenge.type === 'mental' && styles.mentalBadge,
                    challenge.type === 'social' && styles.socialBadge,
                  ]}>
                    <Text style={styles.challengeTypeBadgeText}>
                      {challenge.type === 'physical' ? 'físico' : 
                       challenge.type === 'mental' ? 'mental' : 
                       'social'}
                    </Text>
                  </View>
                  
                  {completedChallengeIds.includes(challenge.id) && (
                    <CheckCircle2 size={20} color="#16A34A" />
                  )}
                </View>
                
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                
                <View style={styles.challengeFooter}>
                  <Clock size={14} color="#64748B" />
                  <Text style={styles.challengeDuration}>{challenge.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </AnimatedScrollView>
      
      {selectedChallenge && (
        <Animated.View style={[styles.modalContainer, modalStyle]}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalCloseArea} onPress={hideModal} />
            
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <View style={[
                  styles.challengeTypeBadge,
                  selectedChallenge.type === 'physical' && styles.physicalBadge,
                  selectedChallenge.type === 'mental' && styles.mentalBadge,
                  selectedChallenge.type === 'social' && styles.socialBadge,
                ]}>
                  <Text style={styles.challengeTypeBadgeText}>
                    {selectedChallenge.type === 'physical' ? 'físico' : 
                     selectedChallenge.type === 'mental' ? 'mental' : 
                     'social'}
                  </Text>
                </View>
                
                <TouchableOpacity onPress={hideModal}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.modalTitle}>{selectedChallenge.title}</Text>
              
              <View style={styles.modalDurationRow}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.modalDuration}>{selectedChallenge.duration}</Text>
              </View>
              
              <Text style={styles.descriptionTitle}>O que você vai fazer:</Text>
              <Text style={styles.descriptionText}>{selectedChallenge.description}</Text>
              
              <Text style={styles.descriptionTitle}>Por que isso ajuda:</Text>
              <Text style={styles.descriptionText}>{selectedChallenge.benefit}</Text>
              
              {completedChallengeIds.includes(selectedChallenge.id) ? (
                <View style={styles.completedContainer}>
                  <CheckCircle2 size={24} color="#16A34A" />
                  <Text style={styles.completedMessage}>
                    Você completou este desafio!
                  </Text>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.completeButton}
                  onPress={handleCompleteChallenge}
                >
                  <Text style={styles.completeButtonText}>
                    Marcar como Completado
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#60A5FA',
    zIndex: 10,
    elevation: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 2,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(30, 64, 175, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#fff',
    marginBottom: 2,
    textShadowColor: 'rgba(30, 64, 175, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: '70%',
    alignSelf: 'center',
    marginHorizontal: 12,
    borderRadius: 1,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  featuredChallengeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featuredChallengeImage: {
    width: '100%',
    height: 140,
  },
  featuredChallengeContent: {
    padding: 16,
  },
  featuredChallengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7E22CE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  featuredChallengeBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  featuredChallengeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  featuredChallengeDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 22,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#16A34A',
    marginLeft: 6,
  },
  startBadge: {
    marginTop: 4,
  },
  startText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
  },
  challengeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  challengeCard: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  challengeCardLocked: {
    opacity: 0.7,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  lockText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: '#CBD5E1',
  },
  physicalBadge: {
    backgroundColor: '#DBEAFE',
  },
  mentalBadge: {
    backgroundColor: '#F3E8FF',
  },
  socialBadge: {
    backgroundColor: '#ECFDF5',
  },
  challengeTypeBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#1E293B',
    textTransform: 'capitalize',
  },
  challengeTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 12,
    minHeight: 40,
  },
  challengeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeDuration: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  modalCloseArea: {
    flex: 1,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    fontSize: 24,
    color: '#64748B',
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 12,
  },
  modalDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalDuration: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
  },
  descriptionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#475569',
    marginBottom: 24,
    lineHeight: 24,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#16A34A',
  },
  completedMessage: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#166534',
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: '#60A5FA',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
  },
});
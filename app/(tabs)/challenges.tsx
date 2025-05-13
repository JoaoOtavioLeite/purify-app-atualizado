import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, CircleCheck as CheckCircle2, Lock, Clock, ArrowLeft } from 'lucide-react-native';
import { getUserProfile, completeChallenge, getCompletedChallenges } from '@/utils/storage';
import { challenges } from '@/utils/challenges';
import { router } from 'expo-router';

export default function ChallengesScreen() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    loadUserData();
  }, []);
  
  const loadUserData = async () => {
    const profile = await getUserProfile();
    setUserProfile(profile);
    const completed = await getCompletedChallenges();
    setCompletedChallengeIds(completed);
  };

  const handleShowChallenge = (challenge: any) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedChallenge(null);
  };

  const handleCompleteChallenge = async () => {
    if (selectedChallenge) {
      await completeChallenge(selectedChallenge.id);
      await loadUserData();
      handleCloseModal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Desafios</Text>
          <Text style={styles.subtitle}>Complete desafios diários para manter o progresso</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
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

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Desafio em Destaque</Text>
        
        <TouchableOpacity 
          style={styles.featuredCard}
          onPress={() => handleShowChallenge(challenges[0])}
        >
          <View style={styles.featuredImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/5340280/pexels-photo-5340280.jpeg' }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Espiritual</Text>
            </View>
          </View>
          
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>Leitura Bíblica Diária</Text>
            <Text style={styles.featuredDescription}>Fortaleça sua fé através da Palavra de Deus</Text>
            <View style={styles.featuredMeta}>
              <View style={styles.featuredDuration}>
                <Clock size={14} color="#64748B" />
                <Text style={styles.featuredDurationText}>10 minutos</Text>
              </View>
              <View style={styles.startButton}>
                <Trophy size={16} color="#FFFFFF" />
                <Text style={styles.startButtonText}>Iniciar Desafio</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Todos os Desafios</Text>

        <View style={styles.challengeGrid}>
          {challenges.slice(1).map((challenge, index) => (
            <TouchableOpacity 
              key={challenge.id}
              style={[
                styles.challengeCard,
                challenge.requiredStreak > (userProfile?.streakDays || 0) && styles.lockedCard
              ]}
              onPress={() => {
                if (challenge.requiredStreak <= (userProfile?.streakDays || 0)) {
                  handleShowChallenge(challenge);
                }
              }}
              disabled={challenge.requiredStreak > (userProfile?.streakDays || 0)}
            >
              {challenge.requiredStreak > (userProfile?.streakDays || 0) && (
                <View style={styles.lockOverlay}>
                  <Lock size={20} color="#FFFFFF" />
                  <Text style={styles.lockText}>
                    Desbloqueie aos {challenge.requiredStreak} dias
                  </Text>
                </View>
              )}
              
              <View style={styles.challengeHeader}>
                <View style={[
                  styles.typeBadge,
                  challenge.type === 'biblical' && styles.biblicalBadge,
                  challenge.type === 'mental' && styles.mentalBadge,
                  challenge.type === 'physical' && styles.physicalBadge,
                  challenge.type === 'social' && styles.socialBadge,
                ]}>
                  <Text style={styles.typeBadgeText}>
                    {challenge.type === 'biblical' ? 'Espiritual' :
                     challenge.type === 'mental' ? 'Mental' :
                     challenge.type === 'physical' ? 'Físico' : 'Social'}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDescription}>{challenge.shortDescription}</Text>
              
              <View style={styles.challengeMeta}>
                <View style={styles.durationContainer}>
                  <Clock size={14} color="#64748B" />
                  <Text style={styles.durationText}>{challenge.duration}</Text>
                </View>
                {completedChallengeIds.includes(challenge.id) && (
                  <CheckCircle2 size={20} color="#16A34A" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={[
                styles.typeBadge,
                selectedChallenge?.type === 'biblical' && styles.biblicalBadge,
                selectedChallenge?.type === 'mental' && styles.mentalBadge,
                selectedChallenge?.type === 'physical' && styles.physicalBadge,
                selectedChallenge?.type === 'social' && styles.socialBadge,
              ]}>
                <Text style={styles.typeBadgeText}>
                  {selectedChallenge?.type === 'biblical' ? 'Espiritual' :
                   selectedChallenge?.type === 'mental' ? 'Mental' :
                   selectedChallenge?.type === 'physical' ? 'Físico' : 'Social'}
                </Text>
              </View>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>{selectedChallenge?.title}</Text>
            
            <View style={styles.modalDurationRow}>
              <Clock size={16} color="#64748B" />
              <Text style={styles.modalDuration}>{selectedChallenge?.duration}</Text>
            </View>

            <Text style={styles.descriptionTitle}>O que você vai fazer:</Text>
            <Text style={styles.descriptionText}>{selectedChallenge?.description}</Text>

            <Text style={styles.descriptionTitle}>Por que isso ajuda:</Text>
            <Text style={styles.descriptionText}>{selectedChallenge?.benefit}</Text>

            {selectedChallenge?.verse && (
              <>
                <Text style={styles.descriptionTitle}>Versículo para meditar:</Text>
                <Text style={styles.verseText}>{selectedChallenge.verse}</Text>
              </>
            )}

            {completedChallengeIds.includes(selectedChallenge?.id) ? (
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
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#60A5FA',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredImageContainer: {
    position: 'relative',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#7E22CE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredDurationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#64748B',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#60A5FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  challengeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  challengeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lockedCard: {
    opacity: 0.7,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  lockText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  challengeHeader: {
    marginBottom: 12,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  biblicalBadge: {
    backgroundColor: '#E9D5FF',
  },
  mentalBadge: {
    backgroundColor: '#DBEAFE',
  },
  physicalBadge: {
    backgroundColor: '#BBF7D0',
  },
  socialBadge: {
    backgroundColor: '#FED7AA',
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#1E293B',
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  challengeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#64748B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
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
    fontWeight: '500',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  modalDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalDuration: {
    fontSize: 16,
    color: '#64748B',
    marginLeft: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
    lineHeight: 24,
  },
  verseText: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#16A34A',
  },
  completedMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: '#166534',
    marginLeft: 12,
  },
  completeButton: {
    backgroundColor: '#60A5FA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
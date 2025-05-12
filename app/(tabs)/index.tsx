import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronRight, Trophy, CheckCircle, AlertTriangle } from 'lucide-react-native';
import { getUserProfile, recordCheckIn, getStreak } from '@/utils/storage';
import { getDailyMotivation, getStreakMotivation, getRelapseMessage } from '@/utils/motivation';
import { colors, spacing, borderRadius, shadows, typography } from '@/app/styles/theme';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [streak, setStreak] = useState(0);
  const [motivation, setMotivation] = useState('');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRelapseModal, setShowRelapseModal] = useState(false);
  const [showGoalAchievedModal, setShowGoalAchievedModal] = useState(false);
  
  const progressValue = useSharedValue(0);
  const lastUpdated = useSharedValue(Date.now());
  
  useEffect(() => {
    loadUserData();
    setMotivation(getDailyMotivation());
  }, []);
  
  const loadUserData = async () => {
    const profile = await getUserProfile();
    setUserProfile(profile);
    const userStreak = await getStreak();
    setStreak(userStreak);
    
    if (profile && profile.goal) {
      const progress = Math.min(userStreak / profile.goal, 1);
      progressValue.value = withTiming(progress, { duration: 1000 });
    }
  };
  
  const handleCheckInPress = () => {
    setShowCheckInModal(true);
  };

  const handleCheckInResponse = async (hadRelapse: boolean) => {
    setShowCheckInModal(false);
    
    if (hadRelapse) {
      await recordCheckIn({ 
        status: 'relapse', 
        notes: 'Recaída identificada', 
        triggers: [] 
      });
      setShowRelapseModal(true);
    } else {
      await recordCheckIn({ 
        status: 'success', 
        notes: 'Dia completado com sucesso', 
        triggers: [] 
      });
      
      const updatedStreak = streak + 1;
      if (userProfile && userProfile.goal && updatedStreak >= userProfile.goal) {
        setShowGoalAchievedModal(true);
      } else {
        setShowSuccessModal(true);
      }
    }
    
    await loadUserData();
  };

  const handleRestart = async () => {
    setShowRelapseModal(false);
    await loadUserData();
  };

  const handleSuccessContinue = () => {
    setShowSuccessModal(false);
  };

  const handleGoalAchievedContinue = () => {
    setShowGoalAchievedModal(false);
  };
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`,
    };
  });
  
  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(`${lastUpdated.value % 360}deg`, { duration: 500 }) }],
    };
  });
  
  if (!userProfile) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {userProfile.name}</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
          </View>
        </View>
        
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <Trophy size={24} color="#60A5FA" />
            <Text style={styles.streakTitle}>Sequência Atual</Text>
          </View>
          <Text style={styles.streakCount}>{streak} dias</Text>
          <Text style={styles.streakGoal}>Meta: {userProfile.goal} dias</Text>
          
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </View>
          
          <TouchableOpacity 
            style={styles.checkInButton} 
            onPress={handleCheckInPress}
          >
            <Calendar size={24} color={colors.text.onPrimary} />
            <Text style={styles.checkInButtonText}>Realizar check-in de hoje</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>Versículo do Dia</Text>
          <Text style={styles.motivationVerse}>{motivation.split('\n\n')[0]}</Text>
          <Text style={styles.motivationReference}>{motivation.split('\n\n')[1]}</Text>
        </View>
        
        <TouchableOpacity style={styles.journalButton} onPress={() => router.push('/journal')}>
          <View style={styles.journalButtonContent}>
            <View style={styles.journalButtonLeft}>
              <Calendar size={24} color="#60A5FA" />
              <View style={styles.journalButtonText}>
                <Text style={styles.journalButtonTitle}>Diário</Text>
                <Text style={styles.journalButtonSubtitle}>Registre seus pensamentos</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.challengeButton} onPress={() => router.push('/challenges')}>
          <View style={styles.challengeButtonContent}>
            <View style={styles.challengeButtonLeft}>
              <Trophy size={24} color="#60A5FA" />
              <View style={styles.challengeButtonText}>
                <Text style={styles.challengeButtonTitle}>Desafio Diário</Text>
                <Text style={styles.challengeButtonSubtitle}>Complete o desafio de hoje</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </View>
        </TouchableOpacity>
        
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg' }} 
          style={styles.backgroundImage}
        />

        {/* Modal de Check-in */}
        <Modal
          visible={showCheckInModal}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Check-in Diário</Text>
              <Text style={styles.modalQuestion}>
                Você teve alguma recaída hoje com pornografia ou masturbação?
              </Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.modalButtonNo]}
                  onPress={() => handleCheckInResponse(false)}
                >
                  <Text style={styles.modalButtonText}>Não</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.modalButtonYes]}
                  onPress={() => handleCheckInResponse(true)}
                >
                  <Text style={styles.modalButtonText}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de Sucesso */}
        <Modal
          visible={showSuccessModal}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <CheckCircle size={50} color="#60A5FA" />
              <Text style={styles.modalTitle}>Parabéns!</Text>
              <Text style={styles.modalMessage}>
                Você conseguiu se manter firme por mais um dia! Continue assim!
              </Text>
              <Text style={styles.streakCount}>
                {streak} dias
              </Text>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSuccess]}
                onPress={handleSuccessContinue}
              >
                <Text style={styles.modalButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de Recaída */}
        <Modal
          visible={showRelapseModal}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <AlertTriangle size={50} color="#60A5FA" />
              <Text style={styles.modalTitle}>Recaída Identificada</Text>
              <Text style={styles.modalMessage}>
                "Porque sete vezes cairá o justo, e se levantará; mas os ímpios tropeçarão no mal."
              </Text>
              <Text style={styles.verseReference}>Provérbios 24:16</Text>
              <Text style={styles.modalMessage}>
                Não desista! Cada recomeço é uma nova oportunidade de vitória.
              </Text>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonRestart]}
                onPress={handleRestart}
              >
                <Text style={styles.modalButtonText}>Recomeçar Minha Jornada</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de Meta Alcançada */}
        <Modal
          visible={showGoalAchievedModal}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Trophy size={50} color="#60A5FA" />
              <Text style={styles.modalTitle}>Meta Alcançada!</Text>
              <Text style={styles.modalMessage}>
                Parabéns! Você completou sua meta de {userProfile?.goal} dias!
              </Text>
              <Text style={styles.motivationVerse}>
                "Combati o bom combate, acabei a carreira, guardei a fé."
              </Text>
              <Text style={styles.verseReference}>2 Timóteo 4:7</Text>
              <Text style={styles.modalMessage}>
                Você provou que é possível vencer esta batalha. Continue firme em sua jornada!
              </Text>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSuccess]}
                onPress={handleGoalAchievedContinue}
              >
                <Text style={styles.modalButtonText}>Continuar Jornada</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,
  container: {
    flex: 1,
  } as ViewStyle,
  contentContainer: {
    padding: spacing.lg,
  } as ViewStyle,
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  header: {
    marginBottom: spacing.lg,
  } as ViewStyle,
  greeting: {
    ...typography.h2,
    color: colors.text.primary,
  } as TextStyle,
  date: {
    ...typography.body2,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  } as TextStyle,
  streakCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  } as ViewStyle,
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  } as ViewStyle,
  streakTitle: {
    ...typography.h3,
    color: colors.text.primary,
  } as TextStyle,
  streakCount: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
  } as TextStyle,
  streakGoal: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  } as TextStyle,
  progressContainer: {
    height: 8,
    backgroundColor: colors.border.light,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  } as ViewStyle,
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  } as ViewStyle,
  checkInButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    marginTop: spacing.md,
    ...shadows.sm,
  } as ViewStyle,
  checkInButtonText: {
    ...typography.button,
    color: colors.text.onPrimary,
  } as TextStyle,
  motivationCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
  } as ViewStyle,
  motivationTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  } as TextStyle,
  motivationVerse: {
    ...typography.body1,
    color: colors.text.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: spacing.sm,
    lineHeight: 24,
  } as TextStyle,
  motivationReference: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: '600',
  } as TextStyle,
  actionsContainer: {
    marginBottom: spacing.lg,
  } as ViewStyle,
  journalButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  } as ViewStyle,
  journalButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  journalButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  journalButtonText: {
    marginLeft: spacing.md,
  } as ViewStyle,
  journalButtonTitle: {
    ...typography.h4,
    color: colors.text.primary,
  } as TextStyle,
  journalButtonSubtitle: {
    ...typography.body2,
    color: colors.text.secondary,
  } as TextStyle,
  challengeButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  } as ViewStyle,
  challengeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  challengeButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  challengeButtonText: {
    marginLeft: spacing.md,
  } as ViewStyle,
  challengeButtonTitle: {
    ...typography.h4,
    color: colors.text.primary,
  } as TextStyle,
  challengeButtonSubtitle: {
    ...typography.body2,
    color: colors.text.secondary,
  } as TextStyle,
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.03,
    zIndex: -1,
  } as ImageStyle,
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    ...shadows.lg,
  } as ViewStyle,
  modalTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  } as TextStyle,
  modalQuestion: {
    ...typography.body1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  } as TextStyle,
  modalMessage: {
    ...typography.body1,
    color: colors.text.primary,
    textAlign: 'center',
    marginVertical: spacing.md,
    lineHeight: 24,
  } as TextStyle,
  verseReference: {
    ...typography.body2,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  } as TextStyle,
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  } as ViewStyle,
  modalButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    minWidth: 120,
    alignItems: 'center',
  } as ViewStyle,
  modalButtonNo: {
    backgroundColor: colors.success,
  } as ViewStyle,
  modalButtonYes: {
    backgroundColor: colors.error,
  } as ViewStyle,
  modalButtonSuccess: {
    backgroundColor: colors.success,
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl * 2,
  } as ViewStyle,
  modalButtonRestart: {
    backgroundColor: colors.primary,
  } as ViewStyle,
  modalButtonText: {
    ...typography.button,
    color: colors.text.onPrimary,
  } as TextStyle,
});
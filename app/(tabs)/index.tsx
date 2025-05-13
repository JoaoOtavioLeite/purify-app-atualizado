import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronRight, Trophy, CheckCircle, AlertTriangle } from 'lucide-react-native';
import { getUserProfile, recordCheckIn, getStreak } from '@/utils/storage';
import { getDailyMotivation, getStreakMotivation, getRelapseMessage } from '@/utils/motivation';
import { colors, spacing, borderRadius, shadows, typography } from '@/app/styles/theme';
import { router } from 'expo-router';

const formatarData = () => {
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  const data = new Date();
  const diaSemana = diasSemana[data.getDay()];
  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  
  return `${diaSemana}, ${dia} de ${mes}`;
};

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
    try {
      const profile = await getUserProfile();
      setUserProfile(profile);
      const currentStreak = await getStreak();
      setStreak(currentStreak);
      
      if (profile?.goal) {
        const progress = Math.min(currentStreak / profile.goal, 1);
        progressValue.value = withTiming(progress, { duration: 1000 });
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };
  
  const handleCheckInPress = () => {
    setShowCheckInModal(true);
  };

  const handleCheckInResponse = async (hadRelapse: boolean) => {
    setShowCheckInModal(false);
    
    try {
      if (hadRelapse) {
        await recordCheckIn({ 
          status: 'relapse', 
          notes: 'Recaída identificada', 
          triggers: [] 
        });
        setStreak(0);
        progressValue.value = withTiming(0, { duration: 1000 });
        setShowRelapseModal(true);
      } else {
        const newStreak = streak + 1;
        await recordCheckIn({ 
          status: 'success', 
          notes: 'Dia completado com sucesso', 
          triggers: [] 
        });
        
        setStreak(newStreak);
        
        if (userProfile?.goal) {
          const progress = Math.min(newStreak / userProfile.goal, 1);
          progressValue.value = withTiming(progress, { duration: 1000 });
        }

        if (userProfile?.goal && newStreak >= userProfile.goal) {
          setShowGoalAchievedModal(true);
        } else {
          setShowSuccessModal(true);
        }
      }
    } catch (error) {
      console.error('Erro ao registrar check-in:', error);
    }
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
          <Text style={styles.greeting}>Olá, {userProfile?.name}</Text>
          <Text style={styles.date}>{formatarData()}</Text>
        </View>
        
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <View style={styles.streakHeaderLeft}>
              <Trophy size={20} color="#FFFFFF" />
              <Text style={styles.streakTitle}>Você está há</Text>
            </View>
            <Text style={styles.streakMeta}>Meta: {userProfile?.goal || 120} dias</Text>
          </View>
          <Text style={styles.streakCount}>{streak} dias sem cair</Text>
          
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </View>
          
          <TouchableOpacity style={styles.checkInButton} onPress={() => setShowCheckInModal(true)}>
            <Calendar size={20} color="#60A5FA" />
            <Text style={styles.checkInButtonText}>Realizar check-in de hoje</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.verseCard}>
          <Text style={styles.verseTitle}>Versículo do Dia</Text>
          <Text style={styles.verseText}>
            Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra fiel.
          </Text>
          <Text style={styles.verseReference}>Isaías 41:10</Text>
        </View>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/journal')}>
          <View style={styles.actionLeft}>
            <Calendar size={20} color="#60A5FA" />
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Diário</Text>
              <Text style={styles.actionSubtitle}>Registre seus pensamentos</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/challenges')}>
          <View style={styles.actionLeft}>
            <Trophy size={20} color="#60A5FA" />
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Desafio Diário</Text>
              <Text style={styles.actionSubtitle}>Complete o desafio de hoje</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#64748B" />
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
              <View style={styles.modalHeader}>
                <Calendar size={32} color="#60A5FA" />
                <Text style={styles.modalTitle}>Check-in Diário</Text>
              </View>
              
              <Text style={styles.modalQuestion}>
                Você se manteve firme hoje?
              </Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.modalButtonNo]}
                  onPress={() => handleCheckInResponse(false)}
                >
                  <CheckCircle size={24} color="#FFFFFF" />
                  <Text style={styles.modalButtonText}>Sim, me mantive firme!</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.modalButtonYes]}
                  onPress={() => handleCheckInResponse(true)}
                >
                  <AlertTriangle size={24} color="#FFFFFF" />
                  <Text style={styles.modalButtonText}>Não, tive uma recaída</Text>
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
              <Text style={styles.modalStreak}>
                {streak} dias
              </Text>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSuccess]}
                onPress={() => setShowSuccessModal(false)}
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
    backgroundColor: '#F8FAFC',
  } as ViewStyle,
  container: {
    flex: 1,
  } as ViewStyle,
  contentContainer: {
    padding: 16,
  } as ViewStyle,
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  header: {
    marginBottom: 16,
  } as ViewStyle,
  greeting: {
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 4,
  } as TextStyle,
  date: {
    fontSize: 14,
    color: '#64748B',
  } as TextStyle,
  streakCard: {
    backgroundColor: '#60A5FA',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  } as ViewStyle,
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  } as ViewStyle,
  streakHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  } as ViewStyle,
  streakTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  } as TextStyle,
  streakMeta: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  } as TextStyle,
  streakCount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  } as TextStyle,
  progressContainer: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
    marginBottom: 16,
  } as ViewStyle,
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  } as ViewStyle,
  checkInButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  } as ViewStyle,
  checkInButtonText: {
    color: '#60A5FA',
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,
  verseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  } as ViewStyle,
  verseTitle: {
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  } as TextStyle,
  verseText: {
    fontSize: 16,
    color: '#1E293B',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 24,
  } as TextStyle,
  verseReference: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'right',
    marginTop: 4,
  } as TextStyle,
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  } as ViewStyle,
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  } as ViewStyle,
  actionTextContainer: {
    gap: 4,
  } as ViewStyle,
  actionTitle: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  } as TextStyle,
  actionSubtitle: {
    fontSize: 14,
    color: '#64748B',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  } as ViewStyle,
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    ...shadows.xl,
  } as ViewStyle,
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  } as ViewStyle,
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  } as TextStyle,
  modalQuestion: {
    fontSize: 20,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 28,
    fontWeight: '500',
  } as TextStyle,
  modalButtons: {
    width: '100%',
    gap: spacing.lg,
  } as ViewStyle,
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    width: '100%',
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
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.onPrimary,
  } as TextStyle,
  modalStreak: {
    fontSize: 36,
    fontWeight: '700',
    color: '#60A5FA',
    marginVertical: 16,
  } as TextStyle,
  modalMessage: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    marginVertical: spacing.md,
    lineHeight: 24,
  } as TextStyle,
  
  motivationVerse: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: spacing.md,
    lineHeight: 24,
  } as TextStyle,
});
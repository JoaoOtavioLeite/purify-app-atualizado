import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, CircleCheck as CheckCircle, Shield } from 'lucide-react-native';
import { saveUserProfile } from '@/utils/storage';

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [addictionTime, setAddictionTime] = useState('');
  const [goal, setGoal] = useState('30');
  const [triggers, setTriggers] = useState<string[]>([]);
  const [supportSystem, setSupportSystem] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Save user data
      saveUserProfile({
        name,
        age: parseInt(age) || 0,
        addictionTime,
        goal: parseInt(goal) || 30,
        mainTrigger: triggers.join(', '),
        supportSystem: supportSystem.join(', '),
        challenges: challenges.join(', '),
        previousAttempts: '',
        startDate: new Date().toISOString(),
        streakDays: 0,
        lastCheckIn: new Date().toISOString(),
      });
      
      // Navigate to main app
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleTrigger = (trigger: string) => {
    setTriggers(prev => 
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const toggleSupport = (support: string) => {
    setSupportSystem(prev => 
      prev.includes(support)
        ? prev.filter(s => s !== support)
        : [...prev, support]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.appName}>Purify</Text>
        <Text style={styles.appTagline}>Sua jornada para a liberdade começa aqui</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.stepIndicator}>
          <View style={[styles.stepDot, step >= 1 && styles.activeStepDot]}>
            {step > 1 && <CheckCircle size={24} color="#fff" />}
            {step === 1 && <Text style={styles.stepNumber}>1</Text>}
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepDot, step >= 2 && styles.activeStepDot]}>
            {step > 2 && <CheckCircle size={24} color="#fff" />}
            {step === 2 && <Text style={styles.stepNumber}>2</Text>}
            {step < 2 && <Text style={styles.stepNumber}>2</Text>}
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepDot, step >= 3 && styles.activeStepDot]}>
            {step === 3 && <Text style={styles.stepNumber}>3</Text>}
            {step < 3 && <Text style={styles.stepNumber}>3</Text>}
          </View>
        </View>

        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Bem-vindo ao Purify</Text>
            <Text style={styles.stepDescription}>
              Estamos aqui para apoiar sua jornada em direção à liberdade e autocontrole. Vamos começar com algumas perguntas para personalizar sua experiência.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Qual é o seu apelido?</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Seu apelido"
                placeholderTextColor="#A1A1AA"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Qual é a sua idade?</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Sua idade"
                keyboardType="number-pad"
                placeholderTextColor="#A1A1AA"
              />
            </View>

            <TouchableOpacity 
              style={[styles.nextButton, !name || !age ? styles.disabledButton : null]} 
              onPress={handleNext}
              disabled={!name || !age}
            >
              <Text style={styles.nextButtonText}>Continuar</Text>
              <ArrowRight size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.verseContainer}>
              <Text style={styles.verseText}>
                "Se, pois, o Filho vos libertar, verdadeiramente sereis livres."
              </Text>
              <Text style={styles.verseReference}>João 8:36</Text>
            </View>

            {step > 1 && (
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleBack}
              >
                <Text style={styles.backButtonText}>Voltar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Sua Jornada</Text>
            <Text style={styles.stepDescription}>
              Sabemos que estas perguntas são pessoais. Suas respostas são confidenciais e nos ajudam a personalizar sua jornada de recuperação da melhor forma possível.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Há quanto tempo você está enfrentando essa luta?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={[styles.radioButton, addictionTime === 'Menos de 1 ano' && styles.radioButtonSelected]} 
                  onPress={() => setAddictionTime('Menos de 1 ano')}
                >
                  <Text style={[styles.radioText, addictionTime === 'Menos de 1 ano' && styles.radioTextSelected]}>
                    Menos de 1 ano
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.radioButton, addictionTime === '1-5 anos' && styles.radioButtonSelected]} 
                  onPress={() => setAddictionTime('1-5 anos')}
                >
                  <Text style={[styles.radioText, addictionTime === '1-5 anos' && styles.radioTextSelected]}>
                    1-5 anos
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.radioButton, addictionTime === '5+ anos' && styles.radioButtonSelected]} 
                  onPress={() => setAddictionTime('5+ anos')}
                >
                  <Text style={[styles.radioText, addictionTime === '5+ anos' && styles.radioTextSelected]}>
                    5+ anos
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.nextButton, !addictionTime ? styles.disabledButton : null]} 
              onPress={handleNext}
              disabled={!addictionTime}
            >
              <Text style={styles.nextButtonText}>Continuar</Text>
              <ArrowRight size={20} color="#fff" />
            </TouchableOpacity>

            {step > 1 && (
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleBack}
              >
                <Text style={styles.backButtonText}>Voltar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Gatilhos</Text>
            <Text style={styles.stepDescription}>
              Identificar o que desencadeia o comportamento é um passo importante para a recuperação. Selecione todos que se aplicam.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Quais são seus principais gatilhos?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={[styles.radioButton, triggers.includes('Estresse') && styles.radioButtonSelected]} 
                  onPress={() => toggleTrigger('Estresse')}
                >
                  <Text style={[styles.radioText, triggers.includes('Estresse') && styles.radioTextSelected]}>
                    Estresse
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.radioButton, triggers.includes('Solidão') && styles.radioButtonSelected]} 
                  onPress={() => toggleTrigger('Solidão')}
                >
                  <Text style={[styles.radioText, triggers.includes('Solidão') && styles.radioTextSelected]}>
                    Solidão
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.radioButton, triggers.includes('Tédio') && styles.radioButtonSelected]} 
                  onPress={() => toggleTrigger('Tédio')}
                >
                  <Text style={[styles.radioText, triggers.includes('Tédio') && styles.radioTextSelected]}>
                    Tédio
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.radioButton, triggers.includes('Ansiedade') && styles.radioButtonSelected]} 
                  onPress={() => toggleTrigger('Ansiedade')}
                >
                  <Text style={[styles.radioText, triggers.includes('Ansiedade') && styles.radioTextSelected]}>
                    Ansiedade
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.nextButton, triggers.length === 0 ? styles.disabledButton : null]} 
              onPress={handleNext}
              disabled={triggers.length === 0}
            >
              <Text style={styles.nextButtonText}>Continuar</Text>
              <ArrowRight size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Rede de Apoio</Text>
            <Text style={styles.stepDescription}>
              Ter suporte pode fazer uma grande diferença na sua jornada de recuperação. Selecione todas as opções que se aplicam.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Com quem você pode contar?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={[styles.radioButton, supportSystem.includes('Família') && styles.radioButtonSelected]} 
                  onPress={() => toggleSupport('Família')}
                >
                  <Text style={[styles.radioText, supportSystem.includes('Família') && styles.radioTextSelected]}>
                    Família
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.radioButton, supportSystem.includes('Amigos') && styles.radioButtonSelected]} 
                  onPress={() => toggleSupport('Amigos')}
                >
                  <Text style={[styles.radioText, supportSystem.includes('Amigos') && styles.radioTextSelected]}>
                    Amigos
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.radioButton, supportSystem.includes('Terapeuta') && styles.radioButtonSelected]} 
                  onPress={() => toggleSupport('Terapeuta')}
                >
                  <Text style={[styles.radioText, supportSystem.includes('Terapeuta') && styles.radioTextSelected]}>
                    Terapeuta
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.radioButton, supportSystem.includes('Ninguém ainda') && styles.radioButtonSelected]} 
                  onPress={() => toggleSupport('Ninguém ainda')}
                >
                  <Text style={[styles.radioText, supportSystem.includes('Ninguém ainda') && styles.radioTextSelected]}>
                    Ninguém ainda
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.nextButton, supportSystem.length === 0 ? styles.disabledButton : null]} 
              onPress={handleNext}
              disabled={supportSystem.length === 0}
            >
              <Text style={styles.nextButtonText}>Continuar</Text>
              <ArrowRight size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 5 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Seus Desafios</Text>
            <Text style={styles.stepDescription}>
              Refletir sobre o que funcionou antes pode nos ajudar a construir estratégias mais eficazes.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Qual é seu maior desafio na recuperação?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={[styles.radioButton, challenges.includes('Solidão') && styles.radioButtonSelected]} 
                  onPress={() => {
                    setChallenges(prev => 
                      prev.includes('Solidão')
                        ? prev.filter(c => c !== 'Solidão')
                        : [...prev, 'Solidão']
                    );
                  }}
                >
                  <Text style={[styles.radioText, challenges.includes('Solidão') && styles.radioTextSelected]}>
                    Solidão
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.radioButton, challenges.includes('Pressão social') && styles.radioButtonSelected]} 
                  onPress={() => {
                    setChallenges(prev => 
                      prev.includes('Pressão social')
                        ? prev.filter(c => c !== 'Pressão social')
                        : [...prev, 'Pressão social']
                    );
                  }}
                >
                  <Text style={[styles.radioText, challenges.includes('Pressão social') && styles.radioTextSelected]}>
                    Pressão social
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.radioButton, challenges.includes('Falta de motivação') && styles.radioButtonSelected]} 
                  onPress={() => {
                    setChallenges(prev => 
                      prev.includes('Falta de motivação')
                        ? prev.filter(c => c !== 'Falta de motivação')
                        : [...prev, 'Falta de motivação']
                    );
                  }}
                >
                  <Text style={[styles.radioText, challenges.includes('Falta de motivação') && styles.radioTextSelected]}>
                    Falta de motivação
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.radioButton, challenges.includes('Recaídas frequentes') && styles.radioButtonSelected]} 
                  onPress={() => {
                    setChallenges(prev => 
                      prev.includes('Recaídas frequentes')
                        ? prev.filter(c => c !== 'Recaídas frequentes')
                        : [...prev, 'Recaídas frequentes']
                    );
                  }}
                >
                  <Text style={[styles.radioText, challenges.includes('Recaídas frequentes') && styles.radioTextSelected]}>
                    Recaídas frequentes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.nextButton, challenges.length === 0 ? styles.disabledButton : null]} 
              onPress={handleNext}
              disabled={challenges.length === 0}
            >
              <Text style={styles.nextButtonText}>Continuar</Text>
              <ArrowRight size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 6 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Defina Sua Meta</Text>
            <Text style={styles.stepDescription}>
              Ter uma meta clara ajuda a medir o progresso e manter a motivação.
            </Text>
            
            <View style={styles.goalContainer}>
              <Text style={styles.inputLabel}>Quero me manter limpo por:</Text>
              <View style={styles.goalOptionsContainer}>
                <TouchableOpacity 
                  style={[styles.goalOption, goal === '30' && styles.goalOptionSelected]} 
                  onPress={() => setGoal('30')}
                >
                  <Text style={[styles.goalOptionText, goal === '30' && styles.goalOptionTextSelected]}>30 dias</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.goalOption, goal === '60' && styles.goalOptionSelected]} 
                  onPress={() => setGoal('60')}
                >
                  <Text style={[styles.goalOptionText, goal === '60' && styles.goalOptionTextSelected]}>60 dias</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.goalOption, goal === '90' && styles.goalOptionSelected]} 
                  onPress={() => setGoal('90')}
                >
                  <Text style={[styles.goalOptionText, goal === '90' && styles.goalOptionTextSelected]}>90 dias</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.goalOptionsContainer, { marginTop: 8 }]}>
                <TouchableOpacity 
                  style={[styles.goalOption, goal === '120' && styles.goalOptionSelected]} 
                  onPress={() => setGoal('120')}
                >
                  <Text style={[styles.goalOptionText, goal === '120' && styles.goalOptionTextSelected]}>120 dias</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.goalOption, goal === '150' && styles.goalOptionSelected]} 
                  onPress={() => setGoal('150')}
                >
                  <Text style={[styles.goalOptionText, goal === '150' && styles.goalOptionTextSelected]}>150 dias</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.goalOption, goal === '180' && styles.goalOptionSelected]} 
                  onPress={() => setGoal('180')}
                >
                  <Text style={[styles.goalOptionText, goal === '180' && styles.goalOptionTextSelected]}>180 dias</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.finalMessage}>
              <Shield size={24} color="#60A5FA" />
              <Text style={styles.finalMessageText}>
                Sua jornada é pessoal e privada. Valorizamos sua privacidade e todos os seus dados permanecem no seu dispositivo.
              </Text>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Começar Minha Jornada</Text>
              <ArrowRight size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Image 
        source={{ uri: 'https://images.pexels.com/photos/775907/pexels-photo-775907.jpeg' }} 
        style={styles.backgroundImage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingBottom: 40,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#1E40AF',
    marginBottom: 8,
  },
  appTagline: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
    zIndex: 2,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepDot: {
    backgroundColor: '#1E40AF',
  },
  stepNumber: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
  },
  stepContent: {
    alignItems: 'center',
  },
  stepTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  radioGroup: {
    marginTop: 8,
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  radioButtonSelected: {
    borderColor: '#60A5FA',
    backgroundColor: '#EFF6FF',
  },
  radioText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#334155',
  },
  radioTextSelected: {
    color: '#60A5FA',
    fontFamily: 'Poppins-Medium',
  },
  nextButton: {
    backgroundColor: '#60A5FA',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#A1A1AA',
  },
  nextButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  goalContainer: {
    width: '100%',
    marginBottom: 20,
  },
  goalOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  goalOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  goalOptionSelected: {
    borderColor: '#60A5FA',
    backgroundColor: '#EFF6FF',
  },
  goalOptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
  },
  goalOptionTextSelected: {
    color: '#60A5FA',
  },
  finalMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  finalMessageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 12,
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '80%',
    height: '40%',
    opacity: 0.05,
    borderTopLeftRadius: 200,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
  },
  verseContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  verseText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  verseReference: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
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

  const questions = {
    1: {
      title: "Tempo de Luta",
      question: "Há quanto tempo você leva uma vida com pornografia e masturbação?",
      options: [
        { value: "a", label: "Menos de 6 meses" },
        { value: "b", label: "Entre 6 meses e 1 ano" },
        { value: "c", label: "Entre 1 e 3 anos" },
        { value: "d", label: "Entre 3 e 5 anos" },
        { value: "e", label: "Mais de 5 anos" }
      ]
    },
    2: {
      title: "Frequência",
      question: "Com que frequência você recorre à pornografia ou à masturbação?",
      options: [
        { value: "a", label: "Todos os dias" },
        { value: "b", label: "Algumas vezes por semana" },
        { value: "c", label: "Uma vez por semana" },
        { value: "d", label: "Raramente (menos de uma vez por semana)" },
        { value: "e", label: "Não tenho um padrão fixo" }
      ]
    },
    3: {
      title: "Padrões",
      question: "Você consegue identificar momentos específicos do dia ou situações que mais te levam a isso?",
      options: [
        { value: "a", label: "Sim, geralmente à noite" },
        { value: "b", label: "Sim, quando estou sozinho(a)" },
        { value: "c", label: "Sim, quando estou entediado(a), triste ou ansioso(a)" },
        { value: "d", label: "Não, acontece de forma aleatória" },
        { value: "e", label: "Nunca parei para pensar sobre isso" }
      ]
    },
    4: {
      title: "Impacto nos Relacionamentos",
      question: "Como esse vício tem afetado seus relacionamentos?",
      options: [
        { value: "a", label: "Tem prejudicado minhas relações amorosas" },
        { value: "b", label: "Me sinto distante da família" },
        { value: "c", label: "Afeta minha vida social" },
        { value: "d", label: "Não percebo impacto significativo" },
        { value: "e", label: "Prefiro não responder" }
      ]
    },
    5: {
      title: "Impacto Espiritual",
      question: "Como você sente que isso afeta sua vida espiritual?",
      options: [
        { value: "a", label: "Me sinto distante de Deus" },
        { value: "b", label: "Tenho dificuldade em orar" },
        { value: "c", label: "Me sinto indigno(a)" },
        { value: "d", label: "Evito participar de atividades religiosas" },
        { value: "e", label: "Busco mais a Deus após as quedas" }
      ]
    },
    6: {
      title: "Gatilhos Emocionais",
      question: "Quais emoções geralmente te levam a recair? (Selecione todas que se aplicam)",
      options: [
        { value: "Ansiedade", label: "Ansiedade" },
        { value: "Solidão", label: "Solidão" },
        { value: "Estresse", label: "Estresse" },
        { value: "Tristeza", label: "Tristeza" },
        { value: "Tédio", label: "Tédio" }
      ],
      isMultiSelect: true
    },
    7: {
      title: "Motivação para Mudança",
      question: "O que te motiva a buscar libertação? (Selecione todas que se aplicam)",
      options: [
        { value: "Fé", label: "Minha fé e relacionamento com Deus" },
        { value: "Relacionamentos", label: "Melhorar meus relacionamentos" },
        { value: "Saúde", label: "Saúde mental e física" },
        { value: "Autoestima", label: "Melhorar minha autoestima" },
        { value: "Futuro", label: "Construir um futuro melhor" }
      ],
      isMultiSelect: true
    },
    8: {
      title: "Tentativas Anteriores",
      question: "Qual foi seu maior período sem recaídas?",
      options: [
        { value: "a", label: "Nunca consegui mais que uma semana" },
        { value: "b", label: "Entre 1 semana e 1 mês" },
        { value: "c", label: "Entre 1 e 3 meses" },
        { value: "d", label: "Mais de 3 meses" },
        { value: "e", label: "Nunca tentei realmente parar" }
      ]
    },
    9: {
      title: "Suporte",
      question: "Você tem alguém com quem pode conversar abertamente sobre isso?",
      options: [
        { value: "a", label: "Sim, tenho um mentor/líder espiritual" },
        { value: "b", label: "Sim, amigos próximos" },
        { value: "c", label: "Sim, participo de um grupo de apoio" },
        { value: "d", label: "Não, mas gostaria de ter" },
        { value: "e", label: "Não me sinto confortável em compartilhar" }
      ]
    },
    10: {
      title: "Compromisso",
      question: "Qual seu nível de comprometimento com a recuperação?",
      options: [
        { value: "a", label: "Totalmente comprometido(a)" },
        { value: "b", label: "Quero tentar, mas tenho medo" },
        { value: "c", label: "Vou dar o meu melhor" },
        { value: "d", label: "Ainda tenho dúvidas" },
        { value: "e", label: "Preciso de mais motivação" }
      ]
    }
  };

  const currentQuestion = questions[step as keyof typeof questions];

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
            <Text style={styles.stepTitle}>Tempo de Luta</Text>
            <Text style={styles.stepDescription}>
              Há quanto tempo você leva uma vida com pornografia e masturbação?
            </Text>
            
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={[styles.radioButton, addictionTime === 'Menos de 6 meses' && styles.radioButtonSelected]} 
                onPress={() => setAddictionTime('Menos de 6 meses')}
              >
                <Text style={[styles.radioText, addictionTime === 'Menos de 6 meses' && styles.radioTextSelected]}>
                  Menos de 6 meses
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioButton, addictionTime === 'Entre 6 meses e 1 ano' && styles.radioButtonSelected]} 
                onPress={() => setAddictionTime('Entre 6 meses e 1 ano')}
              >
                <Text style={[styles.radioText, addictionTime === 'Entre 6 meses e 1 ano' && styles.radioTextSelected]}>
                  Entre 6 meses e 1 ano
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioButton, addictionTime === 'Entre 1 e 3 anos' && styles.radioButtonSelected]} 
                onPress={() => setAddictionTime('Entre 1 e 3 anos')}
              >
                <Text style={[styles.radioText, addictionTime === 'Entre 1 e 3 anos' && styles.radioTextSelected]}>
                  Entre 1 e 3 anos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.radioButton, addictionTime === 'Entre 3 e 5 anos' && styles.radioButtonSelected]} 
                onPress={() => setAddictionTime('Entre 3 e 5 anos')}
              >
                <Text style={[styles.radioText, addictionTime === 'Entre 3 e 5 anos' && styles.radioTextSelected]}>
                  Entre 3 e 5 anos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.radioButton, addictionTime === 'Mais de 5 anos' && styles.radioButtonSelected]} 
                onPress={() => setAddictionTime('Mais de 5 anos')}
              >
                <Text style={[styles.radioText, addictionTime === 'Mais de 5 anos' && styles.radioTextSelected]}>
                  Mais de 5 anos
                </Text>
              </TouchableOpacity>
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
            <Text style={styles.stepTitle}>Sentimentos Pós-Recaída</Text>
            <Text style={styles.stepDescription}>
              Como você geralmente se sente após uma recaída?
            </Text>
            
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={[styles.radioButton, supportSystem.includes('Culpado(a) e envergonhado(a)') && styles.radioButtonSelected]} 
                onPress={() => toggleSupport('Culpado(a) e envergonhado(a)')}
              >
                <Text style={[styles.radioText, supportSystem.includes('Culpado(a) e envergonhado(a)') && styles.radioTextSelected]}>
                  Culpado(a) e envergonhado(a)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioButton, supportSystem.includes('Frustrado(a) e desanimado(a)') && styles.radioButtonSelected]} 
                onPress={() => toggleSupport('Frustrado(a) e desanimado(a)')}
              >
                <Text style={[styles.radioText, supportSystem.includes('Frustrado(a) e desanimado(a)') && styles.radioTextSelected]}>
                  Frustrado(a) e desanimado(a)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioButton, supportSystem.includes('Ansioso(a) e preocupado(a)') && styles.radioButtonSelected]} 
                onPress={() => toggleSupport('Ansioso(a) e preocupado(a)')}
              >
                <Text style={[styles.radioText, supportSystem.includes('Ansioso(a) e preocupado(a)') && styles.radioTextSelected]}>
                  Ansioso(a) e preocupado(a)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.radioButton, supportSystem.includes('Determinado(a) a recomeçar') && styles.radioButtonSelected]} 
                onPress={() => toggleSupport('Determinado(a) a recomeçar')}
              >
                <Text style={[styles.radioText, supportSystem.includes('Determinado(a) a recomeçar') && styles.radioTextSelected]}>
                  Determinado(a) a recomeçar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.radioButton, supportSystem.includes('Indiferente') && styles.radioButtonSelected]} 
                onPress={() => toggleSupport('Indiferente')}
              >
                <Text style={[styles.radioText, supportSystem.includes('Indiferente') && styles.radioTextSelected]}>
                  Indiferente
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.nextButton, supportSystem.length === 0 ? styles.disabledButton : null]} 
              onPress={handleNext}
              disabled={supportSystem.length === 0}
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

        {step === 5 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Momentos de Risco</Text>
            <Text style={styles.stepDescription}>
              Em quais momentos você percebe que está mais vulnerável a cair neste comportamento?
            </Text>
            
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={[styles.radioButton, challenges.includes('Antes de dormir') && styles.radioButtonSelected]} 
                onPress={() => setChallenges(prev => 
                  prev.includes('Antes de dormir')
                    ? prev.filter(c => c !== 'Antes de dormir')
                    : [...prev, 'Antes de dormir']
                )}
              >
                <Text style={[styles.radioText, challenges.includes('Antes de dormir') && styles.radioTextSelected]}>
                  Antes de dormir
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioButton, challenges.includes('Quando estou sozinho(a)') && styles.radioButtonSelected]} 
                onPress={() => setChallenges(prev => 
                  prev.includes('Quando estou sozinho(a)')
                    ? prev.filter(c => c !== 'Quando estou sozinho(a)')
                    : [...prev, 'Quando estou sozinho(a)']
                )}
              >
                <Text style={[styles.radioText, challenges.includes('Quando estou sozinho(a)') && styles.radioTextSelected]}>
                  Quando estou sozinho(a)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.radioButton, challenges.includes('Após um dia estressante') && styles.radioButtonSelected]} 
                onPress={() => setChallenges(prev => 
                  prev.includes('Após um dia estressante')
                    ? prev.filter(c => c !== 'Após um dia estressante')
                    : [...prev, 'Após um dia estressante']
                )}
              >
                <Text style={[styles.radioText, challenges.includes('Após um dia estressante') && styles.radioTextSelected]}>
                  Após um dia estressante
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.radioButton, challenges.includes('Quando estou entediado(a)') && styles.radioButtonSelected]} 
                onPress={() => setChallenges(prev => 
                  prev.includes('Quando estou entediado(a)')
                    ? prev.filter(c => c !== 'Quando estou entediado(a)')
                    : [...prev, 'Quando estou entediado(a)']
                )}
              >
                <Text style={[styles.radioText, challenges.includes('Quando estou entediado(a)') && styles.radioTextSelected]}>
                  Quando estou entediado(a)
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.nextButton, challenges.length === 0 ? styles.disabledButton : null]} 
              onPress={handleNext}
              disabled={challenges.length === 0}
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
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
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
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  radioButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#60A5FA',
    backgroundColor: '#EFF6FF',
  },
  radioText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#334155',
    textAlign: 'left',
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
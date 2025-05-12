import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TextStyle,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Save, ChevronDown, ChevronUp, Calendar, CircleAlert as AlertCircle, CheckCircle } from 'lucide-react-native';
import { getJournalEntries, saveJournalEntry } from '@/utils/storage';

const TRIGGERS = [
  'Tédio', 
  'Estresse', 
  'Solidão', 
  'Ansiedade', 
  'Cansaço',
  'Redes Sociais', 
  'Noite/Madrugada', 
  'Álcool',
  'Estar Sozinho'
];

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [showTriggers, setShowTriggers] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [mood, setMood] = useState('neutral');
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [showPastEntries, setShowPastEntries] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const loadJournalEntries = async () => {
    const entries = await getJournalEntries();
    setJournalEntries(entries.reverse()); // Show newest first
  };

  const toggleTrigger = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const handleSave = async () => {
    if (!entry.trim()) return;
    
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: entry,
      triggers: selectedTriggers,
      mood,
    };
    
    await saveJournalEntry(newEntry);
    setEntry('');
    setSelectedTriggers([]);
    setMood('neutral');
    loadJournalEntries();
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Diário & Reflexão</Text>
          <Text style={styles.subtitle}>Registre seus pensamentos e identifique gatilhos</Text>
        </View>
        
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Como você está se sentindo hoje?</Text>
            
            <View style={styles.moodSelector}>
              <TouchableOpacity 
                style={[styles.moodOption, mood === 'great' && styles.moodOptionSelected]} 
                onPress={() => setMood('great')}
              >
                <Text style={[styles.moodEmoji, mood === 'great' && styles.moodEmojiSelected]}>😃</Text>
                <Text style={[styles.moodText, mood === 'great' && styles.moodTextSelected]}>Ótimo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.moodOption, mood === 'good' && styles.moodOptionSelected]} 
                onPress={() => setMood('good')}
              >
                <Text style={[styles.moodEmoji, mood === 'good' && styles.moodEmojiSelected]}>🙂</Text>
                <Text style={[styles.moodText, mood === 'good' && styles.moodTextSelected]}>Bem</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.moodOption, mood === 'neutral' && styles.moodOptionSelected]} 
                onPress={() => setMood('neutral')}
              >
                <Text style={[styles.moodEmoji, mood === 'neutral' && styles.moodEmojiSelected]}>😐</Text>
                <Text style={[styles.moodText, mood === 'neutral' && styles.moodTextSelected]}>Normal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.moodOption, mood === 'struggling' && styles.moodOptionSelected]} 
                onPress={() => setMood('struggling')}
              >
                <Text style={[styles.moodEmoji, mood === 'struggling' && styles.moodEmojiSelected]}>😔</Text>
                <Text style={[styles.moodText, mood === 'struggling' && styles.moodTextSelected]}>Lutando</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Escreva seus pensamentos</Text>
            <TextInput
              style={styles.textInput}
              multiline
              value={entry}
              onChangeText={setEntry}
              placeholder="Como você está se sentindo hoje? Quais desafios você está enfrentando?"
              placeholderTextColor="#94A3B8"
              textAlignVertical="top"
            />
            
            <TouchableOpacity 
              style={styles.triggersHeader} 
              onPress={() => setShowTriggers(!showTriggers)}
            >
              <Text style={styles.triggersHeaderText}>
                {selectedTriggers.length > 0 
                  ? `Gatilhos Selecionados (${selectedTriggers.length})`
                  : 'Selecionar Gatilhos'
                }
              </Text>
              {showTriggers ? 
                <ChevronUp size={20} color="#60A5FA" /> : 
                <ChevronDown size={20} color="#60A5FA" />
              }
            </TouchableOpacity>
            
            {showTriggers && (
              <View style={styles.triggerContainer}>
                {TRIGGERS.map(trigger => (
                  <TouchableOpacity
                    key={trigger}
                    style={[
                      styles.triggerOption,
                      selectedTriggers.includes(trigger) && styles.triggerOptionSelected
                    ]}
                    onPress={() => toggleTrigger(trigger)}
                  >
                    <Text
                      style={[
                        styles.triggerText,
                        selectedTriggers.includes(trigger) && styles.triggerTextSelected
                      ]}
                    >
                      {trigger}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Save size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Salvar Entrada</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.pastEntriesHeader}
            onPress={() => setShowPastEntries(!showPastEntries)}
          >
            <View style={styles.pastEntriesHeaderContent}>
              <Calendar size={20} color="#60A5FA" />
              <Text style={styles.pastEntriesHeaderText}>Entradas Anteriores</Text>
            </View>
            {showPastEntries ? 
              <ChevronUp size={20} color="#60A5FA" /> : 
              <ChevronDown size={20} color="#60A5FA" />
            }
          </TouchableOpacity>
          
          {showPastEntries && (
            <View style={styles.pastEntries}>
              {journalEntries.length === 0 ? (
                <View style={styles.noEntriesContainer}>
                  <AlertCircle size={24} color="#94A3B8" />
                  <Text style={styles.noEntriesText}>Nenhuma entrada no diário ainda</Text>
                </View>
              ) : (
                journalEntries.map((entry: any) => (
                  <View key={entry.id} style={styles.entryCard}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                      <View style={styles.entryMood}>
                        <Text style={styles.entryMoodEmoji}>
                          {entry.mood === 'great' ? '😃' :
                           entry.mood === 'good' ? '🙂' :
                           entry.mood === 'neutral' ? '😐' : '😔'}
                        </Text>
                        <Text style={styles.entryMoodText}>
                          {entry.mood === 'great' ? 'Ótimo' :
                           entry.mood === 'good' ? 'Bem' :
                           entry.mood === 'neutral' ? 'Normal' : 'Lutando'}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.entryContent}>{entry.content}</Text>
                    
                    {entry.triggers && entry.triggers.length > 0 && (
                      <View style={styles.entryTriggersContainer}>
                        <Text style={styles.entryTriggersTitle}>Gatilhos:</Text>
                        <View style={styles.entryTriggers}>
                          {entry.triggers.map((trigger: string) => (
                            <View key={trigger} style={styles.entryTrigger}>
                              <Text style={styles.entryTriggerText}>{trigger}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                ))
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de Sucesso */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseSuccessModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CheckCircle size={50} color="#60A5FA" />
            <Text style={styles.modalTitle}>Registro Realizado!</Text>
            <Text style={styles.modalMessage}>
              Parabéns por dedicar um momento para refletir sobre sua jornada. 
              Cada registro é um passo importante no seu caminho de recuperação.
            </Text>
            <Text style={styles.modalSubMessage}>
              Continue firme! Volte amanhã para mais um momento de reflexão e crescimento.
            </Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleCloseSuccessModal}
            >
              <Text style={styles.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  moodOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flex: 1,
    marginHorizontal: 4,
  },
  moodOptionSelected: {
    borderColor: '#60A5FA',
    backgroundColor: '#EFF6FF',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodEmojiSelected: {},
  moodText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  moodTextSelected: {
    color: '#60A5FA',
    fontFamily: 'Poppins-Medium',
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 120,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 20,
  },
  triggersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  triggersHeaderText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#60A5FA',
  },
  triggerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  triggerOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
    marginBottom: 8,
  },
  triggerOptionSelected: {
    backgroundColor: '#EFF6FF',
  },
  triggerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  triggerTextSelected: {
    color: '#60A5FA',
    fontFamily: 'Poppins-Medium',
  },
  saveButton: {
    backgroundColor: '#60A5FA',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  pastEntriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  pastEntriesHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pastEntriesHeaderText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 8,
  },
  pastEntries: {
    marginTop: 4,
  },
  noEntriesContainer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  noEntriesText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 12,
  },
  entryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  entryMood: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  entryMoodEmoji: {
    fontSize: 20,
  } as TextStyle,
  entryMoodText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
  } as TextStyle,
  entryContent: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#334155',
    marginBottom: 16,
    lineHeight: 22,
  },
  entryTriggersContainer: {
    marginTop: 8,
  },
  entryTriggersTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  entryTriggers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  entryTrigger: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  entryTriggerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#60A5FA',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  modalSubMessage: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#60A5FA',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#60A5FA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
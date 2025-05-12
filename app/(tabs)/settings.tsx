import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Shield, Calendar, Lock, CircleAlert as AlertCircle, BookOpen, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { getUserProfile, saveSettings, getSettings, resetProgress } from '@/utils/storage';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [settings, setSettings] = useState({
    notifications: true,
    contentFilter: true,
    nightMode: false,
    privacyMode: false,
  });
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    const profile = await getUserProfile();
    setUserProfile(profile);
    
    const savedSettings = await getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
  };
  
  const updateSetting = async (key: string, value: boolean) => {
    const updatedSettings = {
      ...settings,
      [key]: value
    };
    
    setSettings(updatedSettings);
    await saveSettings(updatedSettings);
  };
  
  const handleResetProgress = () => {
    if (Platform.OS === 'web') {
      const confirmReset = window.confirm(
        'Are you sure you want to reset all your progress? This action cannot be undone.'
      );
      
      if (confirmReset) {
        resetProgress();
        router.replace('/onboarding');
      }
    } else {
      Alert.alert(
        'Reset Progress',
        'Are you sure you want to reset all your progress? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Reset', 
            style: 'destructive',
            onPress: () => {
              resetProgress();
              router.replace('/onboarding');
            }
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>
        
        <ScrollView style={styles.content}>
          {userProfile && (
            <View style={styles.profileCard}>
              <View style={styles.profileInfo}>
                <View style={styles.profileInitials}>
                  <Text style={styles.initialsText}>
                    {userProfile.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                
                <View>
                  <Text style={styles.profileName}>{userProfile.name}</Text>
                  <Text style={styles.profileStatus}>
                    {userProfile.streakDays} day streak • Goal: {userProfile.goal} days
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingIconContainer}>
                  <Bell size={20} color="#7E22CE" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Notifications</Text>
                  <Text style={styles.settingDescription}>Daily reminders and motivation</Text>
                </View>
              </View>
              <Switch
                value={settings.notifications}
                onValueChange={(value) => updateSetting('notifications', value)}
                trackColor={{ false: '#E2E8F0', true: '#C4B5FD' }}
                thumbColor={settings.notifications ? '#7E22CE' : '#fff'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingIconContainer}>
                  <Shield size={20} color="#7E22CE" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Content Filter</Text>
                  <Text style={styles.settingDescription}>Block explicit content</Text>
                </View>
              </View>
              <Switch
                value={settings.contentFilter}
                onValueChange={(value) => updateSetting('contentFilter', value)}
                trackColor={{ false: '#E2E8F0', true: '#C4B5FD' }}
                thumbColor={settings.contentFilter ? '#7E22CE' : '#fff'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingIconContainer}>
                  <Calendar size={20} color="#7E22CE" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Night Mode</Text>
                  <Text style={styles.settingDescription}>Reduce blue light at night</Text>
                </View>
              </View>
              <Switch
                value={settings.nightMode}
                onValueChange={(value) => updateSetting('nightMode', value)}
                trackColor={{ false: '#E2E8F0', true: '#C4B5FD' }}
                thumbColor={settings.nightMode ? '#7E22CE' : '#fff'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingIconContainer}>
                  <Lock size={20} color="#7E22CE" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Privacy Mode</Text>
                  <Text style={styles.settingDescription}>Hide app content when switching apps</Text>
                </View>
              </View>
              <Switch
                value={settings.privacyMode}
                onValueChange={(value) => updateSetting('privacyMode', value)}
                trackColor={{ false: '#E2E8F0', true: '#C4B5FD' }}
                thumbColor={settings.privacyMode ? '#7E22CE' : '#fff'}
              />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suporte</Text>
            
            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportItemIconContainer}>
                <BookOpen size={20} color="#7E22CE" />
              </View>
              <Text style={styles.supportItemText}>Recursos & Artigos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportItemIconContainer}>
                <HelpCircle size={20} color="#7E22CE" />
              </View>
              <Text style={styles.supportItemText}>Ajuda & FAQ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportItemIconContainer}>
                <AlertCircle size={20} color="#7E22CE" />
              </View>
              <Text style={styles.supportItemText}>Sobre o Purify</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.dangerSection}>
            <TouchableOpacity 
              style={styles.dangerButton}
              onPress={handleResetProgress}
            >
              <LogOut size={20} color="#EF4444" />
              <Text style={styles.dangerButtonText}>Reiniciar Progresso</Text>
            </TouchableOpacity>
            
            <Text style={styles.dangerNote}>
              Isso irá reiniciar todos os seus dados e progresso. Esta ação não pode ser desfeita.
            </Text>
          </View>
          
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Purify v1.0.0</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitials: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7E22CE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initialsText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#fff',
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 4,
  },
  profileStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#7E22CE',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F3E8FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#64748B',
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  supportItemIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F3E8FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  dangerSection: {
    marginBottom: 24,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  dangerButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  dangerNote: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
});
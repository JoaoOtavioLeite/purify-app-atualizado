import { Platform } from 'react-native';

// Type definitions
interface UserProfile {
  name: string;
  age: number;
  addictionTime: string;
  goal: number;
  startDate: string;
  streakDays: number;
  lastCheckIn: string;
  mainTrigger: string;
  supportSystem: string;
  previousAttempts: string;
  challenges: string;
}

interface CheckIn {
  date: string;
  status: 'success' | 'relapse';
  notes: string;
  triggers: string[];
}

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  triggers: string[];
  mood: string;
}

interface AppSettings {
  notifications: boolean;
  contentFilter: boolean;
  nightMode: boolean;
  privacyMode: boolean;
}

// Storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'purify_user_profile',
  CHECK_INS: 'purify_check_ins',
  JOURNAL_ENTRIES: 'purify_journal_entries',
  SETTINGS: 'purify_settings',
  COMPLETED_CHALLENGES: 'purify_completed_challenges',
};

// Helper function to get data from storage
const getItem = async (key: string): Promise<any> => {
  try {
    if (Platform.OS === 'web') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      // For React Native mobile, we'd use AsyncStorage
      // This is just a placeholder as we're focusing on web
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  } catch (error) {
    console.error(`Error getting item from storage: ${key}`, error);
    return null;
  }
};

// Helper function to set data in storage
const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const stringValue = JSON.stringify(value);
    if (Platform.OS === 'web') {
      localStorage.setItem(key, stringValue);
    } else {
      // For React Native mobile
      localStorage.setItem(key, stringValue);
    }
  } catch (error) {
    console.error(`Error setting item in storage: ${key}`, error);
  }
};

// User Profile Functions
export const getUserProfile = async (): Promise<UserProfile | null> => {
  return getItem(STORAGE_KEYS.USER_PROFILE);
};

export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  await setItem(STORAGE_KEYS.USER_PROFILE, profile);
};

// Check-in Functions
export const getCheckIns = async (): Promise<CheckIn[]> => {
  const checkIns = await getItem(STORAGE_KEYS.CHECK_INS);
  return checkIns || [];
};

export const recordCheckIn = async (checkIn: Omit<CheckIn, 'date'>): Promise<void> => {
  const checkIns = await getCheckIns();
  
  const newCheckIn: CheckIn = {
    ...checkIn,
    date: new Date().toISOString(),
  };
  
  const updatedCheckIns = [...checkIns, newCheckIn];
  await setItem(STORAGE_KEYS.CHECK_INS, updatedCheckIns);
  
  // Update last check-in date and streak
  const profile = await getUserProfile();
  if (profile) {
    const newProfile = {
      ...profile,
      lastCheckIn: new Date().toISOString(),
      streakDays: checkIn.status === 'relapse' ? 0 : profile.streakDays + 1,
    };
    await saveUserProfile(newProfile);
  }
};

// Get current streak
export const getStreak = async (): Promise<number> => {
  const profile = await getUserProfile();
  return profile?.streakDays || 0;
};

// Journal Functions
export const getJournalEntries = async (): Promise<JournalEntry[]> => {
  const entries = await getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
  return entries || [];
};

export const saveJournalEntry = async (entry: JournalEntry): Promise<void> => {
  const entries = await getJournalEntries();
  const updatedEntries = [...entries, entry];
  await setItem(STORAGE_KEYS.JOURNAL_ENTRIES, updatedEntries);
};

// Settings Functions
export const getSettings = async (): Promise<AppSettings | null> => {
  return getItem(STORAGE_KEYS.SETTINGS);
};

export const saveSettings = async (settings: AppSettings): Promise<void> => {
  await setItem(STORAGE_KEYS.SETTINGS, settings);
};

// Challenge Functions
export const getCompletedChallenges = async (): Promise<string[]> => {
  const completed = await getItem(STORAGE_KEYS.COMPLETED_CHALLENGES);
  return completed || [];
};

export const completeChallenge = async (challengeId: string): Promise<void> => {
  const completed = await getCompletedChallenges();
  if (!completed.includes(challengeId)) {
    const updatedCompleted = [...completed, challengeId];
    await setItem(STORAGE_KEYS.COMPLETED_CHALLENGES, updatedCompleted);
  }
};

// Reset all data
export const resetProgress = async (): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.clear();
  } else {
    // For React Native mobile
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import { challenges, Challenge } from './challenges';

const LAST_CHALLENGE_KEY = '@purify:lastChallengeDate';
const CURRENT_CHALLENGE_KEY = '@purify:currentChallenge';
const COMPLETED_CHALLENGES_KEY = '@purify:completedChallenges';

export async function getDailyChallenge(): Promise<Challenge | null> {
  try {
    // Verificar a data do último desafio
    const lastChallengeDate = await AsyncStorage.getItem(LAST_CHALLENGE_KEY);
    const today = new Date().toISOString().split('T')[0];

    // Se não houver desafio hoje ou for um novo dia
    if (!lastChallengeDate || lastChallengeDate !== today) {
      // Obter desafios completados
      const completedChallengesStr = await AsyncStorage.getItem(COMPLETED_CHALLENGES_KEY);
      const completedChallenges = completedChallengesStr ? JSON.parse(completedChallengesStr) : [];

      // Filtrar desafios não completados
      const availableChallenges = challenges.filter(
        challenge => !completedChallenges.includes(challenge.id)
      );

      if (availableChallenges.length === 0) {
        // Se todos os desafios foram completados, resetar
        await AsyncStorage.setItem(COMPLETED_CHALLENGES_KEY, '[]');
        return challenges[0];
      }

      // Selecionar um novo desafio aleatório
      const randomIndex = Math.floor(Math.random() * availableChallenges.length);
      const newChallenge = availableChallenges[randomIndex];

      // Salvar o novo desafio e a data
      await AsyncStorage.setItem(CURRENT_CHALLENGE_KEY, JSON.stringify(newChallenge));
      await AsyncStorage.setItem(LAST_CHALLENGE_KEY, today);

      return newChallenge;
    }

    // Retornar o desafio atual se já existe um para hoje
    const currentChallengeStr = await AsyncStorage.getItem(CURRENT_CHALLENGE_KEY);
    return currentChallengeStr ? JSON.parse(currentChallengeStr) : null;
  } catch (error) {
    console.error('Erro ao obter desafio diário:', error);
    return null;
  }
}

export async function completeCurrentChallenge(challengeId: string): Promise<void> {
  try {
    const completedChallengesStr = await AsyncStorage.getItem(COMPLETED_CHALLENGES_KEY);
    const completedChallenges = completedChallengesStr ? JSON.parse(completedChallengesStr) : [];

    if (!completedChallenges.includes(challengeId)) {
      completedChallenges.push(challengeId);
      await AsyncStorage.setItem(COMPLETED_CHALLENGES_KEY, JSON.stringify(completedChallenges));
    }
  } catch (error) {
    console.error('Erro ao completar desafio:', error);
  }
} 
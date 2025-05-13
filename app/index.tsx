import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getUserProfile } from '@/utils/storage';

type RouteType = '/(tabs)' | '/onboarding';

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<RouteType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      setIsLoading(true);
      const userProfile = await getUserProfile();
      // Se o usuário já tem um perfil, redireciona para o dashboard
      // Caso contrário, redireciona para o onboarding
      setInitialRoute(userProfile ? '/(tabs)' : '/onboarding');
    } catch (error) {
      console.error('Erro ao verificar perfil:', error);
      // Em caso de erro, redireciona para o onboarding por segurança
      setInitialRoute('/onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#60A5FA" />
        <Text style={{ marginTop: 10, color: '#4B5563' }}>Carregando...</Text>
      </View>
    );
  }

  if (!initialRoute) {
    return null;
  }

  return <Redirect href={initialRoute} />;
}
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/utils/storage';

type RouteType = '/(tabs)' | '/onboarding';

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<RouteType | null>(null);

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      const userProfile = await getUserProfile();
      // Se o usuário já tem um perfil, redireciona para o dashboard
      // Caso contrário, redireciona para o onboarding
      setInitialRoute(userProfile ? '/(tabs)' : '/onboarding');
    } catch (error) {
      // Em caso de erro, redireciona para o onboarding por segurança
      setInitialRoute('/onboarding');
    }
  };

  // Mostra uma tela de carregamento enquanto verifica o perfil
  if (!initialRoute) {
    return null;
  }

  return <Redirect href={initialRoute} />;
}
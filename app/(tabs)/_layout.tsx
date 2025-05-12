import React, { createContext, useState } from 'react';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet, View, Platform } from 'react-native';
import { ChartBar as BarChart2, Book, Award, Users, Settings } from 'lucide-react-native';

// Criar contexto para controlar a visibilidade da navegação
export const NavigationContext = createContext({
  isVisible: true,
  setIsVisible: (visible: boolean) => {},
});

export default function TabLayout() {
  const [isNavigationVisible, setNavigationVisible] = useState(true);
  const tabBarBlur = Platform.OS === 'ios';

  return (
    <NavigationContext.Provider value={{
      isVisible: isNavigationVisible,
      setIsVisible: setNavigationVisible,
    }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            !isNavigationVisible && { display: 'none' }
          ],
          tabBarActiveTintColor: '#60A5FA',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarBackground: () => 
            tabBarBlur ? (
              <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="light" />
            ) : (
              <View style={[StyleSheet.absoluteFill, styles.tabBarBackground]} />
            )
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <BarChart2 size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: 'Diário',
            tabBarIcon: ({ color, size }) => (
              <Book size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="challenges"
          options={{
            title: 'Desafios',
            tabBarIcon: ({ color, size }) => (
              <Award size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            title: 'Comunidade',
            tabBarIcon: ({ color, size }) => (
              <Users size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Configurações',
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            )
          }}
        />
      </Tabs>
    </NavigationContext.Provider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabBarBackground: {
    backgroundColor: '#fff',
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginBottom: 4,
  }
});
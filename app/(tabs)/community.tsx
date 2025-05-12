import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Award, BookOpen, ChevronRight } from 'lucide-react-native';
import { successStories } from '@/utils/community';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('stories');
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Comunidade</Text>
          <Text style={styles.subtitle}>Conecte-se e compartilhe com outros na mesma jornada</Text>
        </View>
        
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'stories' && styles.activeTabButton]}
            onPress={() => setActiveTab('stories')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'stories' && styles.activeTabButtonText]}>
              Histórias de Sucesso
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'resources' && styles.activeTabButton]}
            onPress={() => setActiveTab('resources')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'resources' && styles.activeTabButtonText]}>
              Recursos
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content}>
          {activeTab === 'stories' ? (
            <View style={styles.storiesContainer}>
              <View style={styles.featuredStoryContainer}>
                <Text style={styles.sectionTitle}>História em Destaque</Text>
                
                <TouchableOpacity style={styles.featuredStoryCard}>
                  <Image
                    source={{ uri: successStories[0].image }}
                    style={styles.featuredStoryImage}
                  />
                  <View style={styles.featuredStoryContent}>
                    <View style={styles.featuredStoryHeader}>
                      <View style={styles.featuredStoryBadge}>
                        <Award size={12} color="#fff" />
                        <Text style={styles.featuredStoryBadgeText}>Destaque</Text>
                      </View>
                      <Text style={styles.featuredStoryDays}>{successStories[0].daysClean} dias limpo</Text>
                    </View>
                    
                    <Text style={styles.featuredStoryTitle}>{successStories[0].title}</Text>
                    <Text style={styles.featuredStoryAuthor}>Por {successStories[0].author}</Text>
                    
                    <Text style={styles.featuredStoryExcerpt}>
                      {successStories[0].content.substring(0, 150)}...
                    </Text>
                    
                    <View style={styles.featuredStoryFooter}>
                      <View style={styles.featuredStoryStats}>
                        <View style={styles.featuredStoryStat}>
                          <Heart size={16} color="#64748B" />
                          <Text style={styles.featuredStoryStatText}>{successStories[0].likes}</Text>
                        </View>
                        
                        <View style={styles.featuredStoryStat}>
                          <MessageCircle size={16} color="#64748B" />
                          <Text style={styles.featuredStoryStatText}>{successStories[0].comments}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.readMoreText}>Ler Mais</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.sectionTitle}>Mais Histórias de Sucesso</Text>
              
              {successStories.slice(1).map((story, index) => (
                <TouchableOpacity key={index} style={styles.storyCard}>
                  <Image 
                    source={{ uri: story.image }} 
                    style={styles.storyThumbnail}
                  />
                  
                  <View style={styles.storyContent}>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storyAuthor}>By {story.author}</Text>
                    
                    <View style={styles.storyFooter}>
                      <View style={styles.storyDaysBadge}>
                        <Text style={styles.storyDaysText}>{story.daysClean} days</Text>
                      </View>
                      
                      <View style={styles.storyStats}>
                        <View style={styles.storyStat}>
                          <Heart size={14} color="#64748B" />
                          <Text style={styles.storyStatText}>{story.likes}</Text>
                        </View>
                        
                        <View style={styles.storyStat}>
                          <MessageCircle size={14} color="#64748B" />
                          <Text style={styles.storyStatText}>{story.comments}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Share Your Success Story</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.resourcesContainer}>
              <View style={styles.resourcesHeader}>
                <Text style={styles.resourcesTitle}>Recursos Educacionais</Text>
                <Text style={styles.resourcesSubtitle}>
                  Aprenda mais sobre dependência, recuperação e técnicas para superar desafios.
                </Text>
              </View>
              
              <TouchableOpacity style={styles.resourceCard}>
                <BookOpen size={24} color="#1E40AF" />
                <View style={styles.resourceCardContent}>
                  <Text style={styles.resourceCardTitle}>A Ciência da Dependência</Text>
                  <Text style={styles.resourceCardDescription}>
                    Entenda como a dependência afeta seu cérebro e comportamento.
                  </Text>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceCard}>
                <BookOpen size={24} color="#1E40AF" />
                <View style={styles.resourceCardContent}>
                  <Text style={styles.resourceCardTitle}>Quebrando Hábitos Indesejados</Text>
                  <Text style={styles.resourceCardDescription}>
                    Estratégias eficazes para substituir padrões negativos.
                  </Text>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceCard}>
                <BookOpen size={24} color="#1E40AF" />
                <View style={styles.resourceCardContent}>
                  <Text style={styles.resourceCardTitle}>Mecanismos de Enfrentamento Saudáveis</Text>
                  <Text style={styles.resourceCardDescription}>
                    Formas alternativas de lidar com estresse e emoções difíceis.
                  </Text>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceCard}>
                <BookOpen size={24} color="#1E40AF" />
                <View style={styles.resourceCardContent}>
                  <Text style={styles.resourceCardTitle}>Construindo Melhores Relacionamentos</Text>
                  <Text style={styles.resourceCardDescription}>
                    Como se conectar autenticamente sem dependência.
                  </Text>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceCard}>
                <BookOpen size={24} color="#1E40AF" />
                <View style={styles.resourceCardContent}>
                  <Text style={styles.resourceCardTitle}>Mindfulness para Recuperação</Text>
                  <Text style={styles.resourceCardDescription}>
                    Práticas para aumentar a consciência e reduzir a reatividade.
                  </Text>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
              
              <View style={styles.helpSection}>
                <Text style={styles.helpSectionTitle}>Precisa de Mais Suporte?</Text>
                <Text style={styles.helpSectionSubtitle}>
                  Se você está enfrentando dificuldades e precisa de ajuda profissional, considere procurar um terapeuta ou conselheiro especializado em recuperação de dependência.
                </Text>
                
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>Encontrar Suporte Profissional</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#EDE9FE',
  },
  tabButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeTabButtonText: {
    color: '#7E22CE',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  storiesContainer: {
    paddingBottom: 40,
  },
  featuredStoryContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  featuredStoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featuredStoryImage: {
    width: '100%',
    height: 180,
  },
  featuredStoryContent: {
    padding: 16,
  },
  featuredStoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredStoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E40AF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  featuredStoryBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  featuredStoryDays: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#16A34A',
  },
  featuredStoryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 6,
  },
  featuredStoryAuthor: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  featuredStoryExcerpt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
    marginBottom: 16,
  },
  featuredStoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredStoryStats: {
    flexDirection: 'row',
  },
  featuredStoryStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  featuredStoryStatText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  readMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#7E22CE',
  },
  storyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  storyThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  storyContent: {
    flex: 1,
    marginLeft: 12,
  },
  storyTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  storyAuthor: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyDaysBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  storyDaysText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#16A34A',
  },
  storyStats: {
    flexDirection: 'row',
  },
  storyStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  storyStatText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  shareButton: {
    backgroundColor: '#7E22CE',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  shareButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
  },
  resourcesContainer: {
    paddingBottom: 40,
  },
  resourcesHeader: {
    marginBottom: 24,
  },
  resourcesTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 8,
  },
  resourcesSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius:.8,
    elevation: 2,
  },
  resourceCardContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  resourceCardTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  resourceCardDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  helpSection: {
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
  },
  helpSectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  helpSectionSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    marginBottom: 16,
  },
  helpButton: {
    backgroundColor: '#7E22CE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  helpButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
  },
});
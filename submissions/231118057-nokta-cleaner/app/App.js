import './global.css';

import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import InputSection from './src/components/InputSection';
import IdeaCard from './src/components/IdeaCard';
import { processNotes } from './src/services/GeminiService';

export default function App() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleProcessNotes = async (text) => {
    setIsLoading(true);
    setIdeas([]); // Clear previous
    try {
      const result = await processNotes(text);
      setIdeas(result);
    } catch (error) {
      Alert.alert("Error processings notes", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f172a]">
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <ScrollView 
        className="flex-1 px-4 pt-8"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="mb-8 mt-2">
          <Text className="text-white text-3xl font-extrabold mb-1 tracking-tight">Nokta Away</Text>
          <Text className="text-blue-400 font-bold text-sm tracking-widest uppercase">
            Mission: Migration & Dedup
          </Text>
        </View>

        <InputSection onSubmit={handleProcessNotes} isLoading={isLoading} />

        <View className="mt-2">
          {ideas.length > 0 ? (
            <>
              <Text className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">
                Structured Ideas ({ideas.length})
              </Text>
              {ideas.map((idea, index) => (
                <IdeaCard key={idea.id || index} idea={idea} />
              ))}
            </>
          ) : (
             !isLoading && (
               <View className="items-center py-12 px-6 border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/20">
                 <Text className="text-slate-400 text-center mb-2 font-bold text-lg">No Ideas Yet</Text>
                 <Text className="text-slate-500 text-center text-sm leading-6">
                   Paste your messy notes above to extract structured, categorized, and deduplicated ideas.
                 </Text>
               </View>
             )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
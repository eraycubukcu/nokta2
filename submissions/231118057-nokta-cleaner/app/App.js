import './global.css';

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, Alert, TouchableOpacity } from 'react-native';
import InputSection from './src/components/InputSection';
import IdeaCard from './src/components/IdeaCard';
import { processNotes } from './src/services/GeminiService';
import { useColorScheme } from 'nativewind';

export default function App() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  // Force default to light as specifically requested
  useEffect(() => {
    setColorScheme('light');
  }, []);

  const handleProcessNotes = async (text) => {
    setIsLoading(true);
    setIdeas([]);
    try {
      const result = await processNotes(text);
      setIdeas(result);
    } catch (error) {
      Alert.alert("Error processing notes", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
      />
      
      <ScrollView 
        className="flex-1 px-6 pt-8"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-row justify-between items-center mb-10 mt-2">
          <View>
            <Text className="text-black dark:text-white text-3xl font-black tracking-tighter mb-1">
              Nokta
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 font-bold text-[10px] tracking-widest uppercase">
              Migration & Dedup
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={toggleColorScheme}
            className="w-12 h-12 rounded-full border-2 border-black dark:border-white items-center justify-center bg-transparent active:scale-90"
            accessibilityLabel="Toggle Theme"
          >
             <View className="w-5 h-5 rounded-full bg-black dark:bg-white" />
          </TouchableOpacity>
        </View>

        <InputSection onSubmit={handleProcessNotes} isLoading={isLoading} />

        <View className="mt-8">
          {ideas.length > 0 ? (
            <>
              <View className="flex-row justify-between items-end mb-6 border-b-[3px] border-black dark:border-white pb-3">
                 <Text className="text-black dark:text-white font-extrabold uppercase tracking-widest text-sm">
                   Extracted
                 </Text>
                 <Text className="text-black dark:text-white font-bold text-xs">
                   {ideas.length}
                 </Text>
              </View>
              {ideas.map((idea, index) => (
                <IdeaCard key={idea.id || index} idea={idea} />
              ))}
            </>
          ) : (
             !isLoading && (
               <View className="items-center py-16 px-6 border-[3px] border-black dark:border-white">
                 <Text className="text-black dark:text-white text-center mb-3 font-black text-2xl uppercase tracking-tighter">Void</Text>
                 <Text className="text-gray-500 dark:text-gray-400 text-center font-medium text-sm leading-6">
                   Feed your chaotic notes. Produce structured purity.
                 </Text>
               </View>
             )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
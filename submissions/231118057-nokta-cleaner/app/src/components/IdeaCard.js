import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const getBadgeStyles = (category) => {
  switch (category?.toLowerCase()) {
    case 'technical':
      return { bg: 'bg-blue-900/50 border-blue-500', text: 'text-blue-300' };
    case 'business':
      return { bg: 'bg-green-900/50 border-green-500', text: 'text-green-300' };
    case 'design':
      return { bg: 'bg-purple-900/50 border-purple-500', text: 'text-purple-300' };
    default:
      return { bg: 'bg-slate-700/50 border-slate-500', text: 'text-slate-300' };
  }
};

export default function IdeaCard({ idea }) {
  const handleCopy = async () => {
    const textToCopy = `[${idea.category}] ${idea.title}\n${idea.desc}`;
    await Clipboard.setStringAsync(textToCopy);
    Alert.alert("Copied", "Idea copied to clipboard!");
  };

  const badge = getBadgeStyles(idea.category);

  return (
    <View className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-4 shadow-lg">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-3 shrink">
          <Text className="text-white font-bold text-lg mb-1 leading-6">{idea.title}</Text>
        </View>
        <View className={`border rounded-full px-3 py-1 ${badge.bg}`}>
          <Text className={`text-[10px] font-bold uppercase tracking-wider ${badge.text}`}>
            {idea.category}
          </Text>
        </View>
      </View>
      
      <Text className="text-slate-300 leading-6 mb-4">
        {idea.desc}
      </Text>
      
      <TouchableOpacity 
        onPress={handleCopy}
        className="self-end px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg active:bg-blue-500/30 flex-row items-center"
      >
        <Text className="text-blue-400 font-bold ml-1">Copy to Clipboard</Text>
      </TouchableOpacity>
    </View>
  );
}

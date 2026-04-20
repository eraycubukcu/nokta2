import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function IdeaCard({ idea }) {
  const handleCopy = async () => {
    const textToCopy = `[${idea.category}] ${idea.title}\n${idea.desc}`;
    await Clipboard.setStringAsync(textToCopy);
    Alert.alert("Copied", "Text copied to clipboard.");
  };

  return (
    <View className="border-[3px] border-black dark:border-white p-5 mb-5 bg-transparent" style={{ borderRadius: 0 }}>
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3 shrink">
          <Text className="text-black dark:text-white font-black text-xl mb-1 leading-7">{idea.title}</Text>
        </View>
        <View className="border-2 border-black dark:border-white px-2 py-1 bg-black dark:bg-white" style={{ borderRadius: 0 }}>
          <Text className="text-[10px] font-black uppercase tracking-widest text-white dark:text-black">
            {idea.category}
          </Text>
        </View>
      </View>
      
      <Text className="text-gray-700 dark:text-gray-300 leading-6 mb-5 font-medium text-base">
        {idea.desc}
      </Text>
      
      <TouchableOpacity 
        onPress={handleCopy}
        className="self-start px-5 py-3 border-[2px] border-black dark:border-white active:scale-95"
        style={{ borderRadius: 0 }}
      >
        <Text className="text-black dark:text-white font-black uppercase tracking-widest text-[10px]">Copy Text</Text>
      </TouchableOpacity>
    </View>
  );
}

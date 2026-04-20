import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function InputSection({ onSubmit, isLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    onSubmit(text);
  };

  const isDisabled = isLoading || text.trim().length === 0;

  return (
    <View className="mb-0">
      <TextInput
        className="bg-transparent border-[3px] border-black dark:border-white text-black dark:text-white p-5 min-h-[180px] max-h-[300px] mb-4 text-lg font-medium"
        multiline
        placeholder="Paste chaotic text..."
        placeholderTextColor="#9ca3af"
        value={text}
        onChangeText={setText}
        textAlignVertical="top"
        editable={!isLoading}
        style={{ borderRadius: 0 }} // Hard corners for minimalist feel
      />
      
      <TouchableOpacity
        className={`p-5 h-16 flex-row justify-center items-center active:scale-95 ${
          isDisabled 
            ? 'bg-gray-200 dark:bg-gray-800 border-[3px] border-gray-200 dark:border-gray-800' 
            : 'bg-black dark:bg-white border-[3px] border-black dark:border-white'
        }`}
        onPress={handleSubmit}
        disabled={isDisabled}
        activeOpacity={0.9}
        style={{ borderRadius: 0 }}
      >
        {isLoading ? (
            <ActivityIndicator color={isDisabled ? "gray" : "#9ca3af"} className="mr-3" />
        ) : null}
        
        <Text className={`font-black text-lg tracking-widest uppercase ${
          isDisabled ? 'text-gray-400 dark:text-gray-600' : 'text-white dark:text-black'
        }`}>
          {isLoading ? 'Processing' : 'Analyze'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

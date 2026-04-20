import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function InputSection({ onSubmit, isLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    onSubmit(text);
  };

  return (
    <View className="mb-6">
      <Text className="text-slate-400 mb-2 font-bold uppercase tracking-widest text-xs">
        Paste Messy Notes Below
      </Text>
      <TextInput
        className="bg-slate-900 border border-slate-700 text-white p-4 rounded-xl min-h-[150px] max-h-[300px] mb-4 text-base"
        multiline
        placeholder="e.g. WhatsApp exports, scattered meeting bullet points..."
        placeholderTextColor="#475569"
        value={text}
        onChangeText={setText}
        textAlignVertical="top"
        editable={!isLoading}
      />
      
      <TouchableOpacity
        className={`p-4 rounded-xl flex-row justify-center items-center ${
          isLoading || text.trim().length === 0 ? 'bg-blue-800/50' : 'bg-blue-500 shadow-md shadow-blue-500/30'
        }`}
        onPress={handleSubmit}
        disabled={isLoading || text.trim().length === 0}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <>
            <ActivityIndicator color="#fff" className="mr-2" />
            <Text className="text-white font-bold text-lg tracking-wide">Cleaning...</Text>
          </>
        ) : (
          <Text className="text-white font-bold text-lg tracking-wide">Analyze & Clean</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

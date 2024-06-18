import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import Navbar from './components/Navbar';
import Graficas from './components/Graficas';
import Boleta from './components/Boleta';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <ScrollView className="w-full bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Navbar />
      <Boleta />
      <View className="mx-auto max-w-2xl text-center">
        <Text className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Votos App</Text>
      </View>
    </ScrollView>
  );
}

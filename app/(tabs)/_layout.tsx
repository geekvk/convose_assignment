import {Stack, Tabs} from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="Home Screen"
        options={{ headerTitle: "Home" }}
      />
    </Stack>
  );
}

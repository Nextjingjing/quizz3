import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/painting-app-logo.jpg')} // Replace with a relevant image for your app
          style={styles.appLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to DrawingApp!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Start Drawing</ThemedText>
        <ThemedText>
          Tap on the screen to start drawing. Use the color and eraser tools to customize your artwork.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Customize Your Drawing</ThemedText>
        <ThemedText>
          Choose different colors and adjust the size of the brush and eraser to fit your needs.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20, // Added margin for better spacing
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16, // Increased margin for better spacing
  },
  appLogo: {
    height: 200, // Adjust the size as needed
    width: 300,  // Adjust the size as needed
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

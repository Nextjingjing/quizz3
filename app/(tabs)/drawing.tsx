import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  Pressable,
  Text,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const DrawingApp: React.FC = () => {
  const [paths, setPaths] = useState<{ d: string; color: string }[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState<string>('red');
  const [tool, setTool] = useState<string>('pen');
  const [svgLayout, setSvgLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const onLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSvgLayout({ x, y, width, height });
  };

  const onTouchMove = (event: GestureResponderEvent) => {
    if (svgLayout) {
      const { pageX, pageY } = event.nativeEvent;

      // Adjusting the touch position based on SVG's layout
      const adjustedX = pageX - svgLayout.x;
      const adjustedY = pageY - svgLayout.y;

      const newPoint = `${currentPath.length === 0 ? 'M' : 'L'}${adjustedX.toFixed(
        0,
      )},${adjustedY.toFixed(0)} `;

      setCurrentPath((prevPath) => [...prevPath, newPoint]);
    }
  };

  const onTouchEnd = () => {
    if (currentPath.length > 0) {
      setPaths((prevPaths) => [
        ...prevPaths,
        { d: currentPath.join(''), color: tool === 'eraser' ? 'white' : currentColor },
      ]);
      setCurrentPath([]);
    }
  };

  const clearDrawing = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  const changeColor = (color: string) => {
    setCurrentColor(color);
    setTool('pen');
  };

  const useEraser = () => {
    setTool('eraser');
    setCurrentColor('white');
  };

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper} onLayout={onLayout}>
        <Svg height={height * 0.7} width={width}>
          {paths.map((path, index) => (
            <Path
              key={`path-${index}`}
              d={path.d}
              stroke={path.color}
              fill={'transparent'}
              strokeWidth={2}
              strokeLinejoin={'round'}
              strokeLinecap={'round'}
            />
          ))}
          {currentPath.length > 0 && (
            <Path
              d={currentPath.join('')}
              stroke={currentColor}
              fill={'transparent'}
              strokeWidth={2}
              strokeLinejoin={'round'}
              strokeLinecap={'round'}
            />
          )}
        </Svg>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.clearButton]} onPress={clearDrawing}>
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.eraserButton]} onPress={useEraser}>
          <Text style={styles.buttonText}>Eraser</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.colorButton]} onPress={() => changeColor('red')}>
          <Text style={styles.buttonText}>Red</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.colorButton]} onPress={() => changeColor('blue')}>
          <Text style={styles.buttonText}>Blue</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.colorButton]} onPress={() => changeColor('green')}>
          <Text style={styles.buttonText}>Green</Text>
        </Pressable>
      </View>
      <View
        style={styles.touchArea}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  svgWrapper: {
    height: height * 0.7,
    width,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 20,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 3,
  },
  clearButton: {
    backgroundColor: '#dc3545',
  },
  eraserButton: {
    backgroundColor: '#6c757d',
  },
  colorButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height * 0.7,
    width,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});

export default DrawingApp;

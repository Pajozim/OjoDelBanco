declare module 'react-native-progress/Circle' {
  import { Component } from 'react';
  import { Animated } from 'react-native';
  
  interface CircleProps {
    radius?: number,
    offset?: {
      top?: number,
      left?: number,
    },
    strokeWidth?: number,
    direction?: 'clockwise' | 'counter-clockwise',
    showsText?: boolean,
    formatText?: () => string,
    progress?: number | Animated.Value,
  }
  
  class Circle extends Component<CircleProps> {}
  class ProgressCircle extends Component<CircleProps> {}
  export default Circle;
}
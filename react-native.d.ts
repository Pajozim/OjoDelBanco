import React from 'react';
import 'react-native';

declare module 'react-native' {
  class View extends React.Component<ViewProps> {}
  class Text extends React.Component<TextProps> {}
  class TextInput extends React.Component<TextInputProps> {}
  class Image extends React.Component<ImageProps> {}
  class ScrollView extends React.Component<ScrollViewProps> {}
  class TouchableOpacity extends React.Component<TouchableOpacityProps> {}
  class Pressable extends React.Component<PressableProps> {}
  class FlatList<T = any> extends React.Component<FlatListProps<T>> {}
  class SectionList<T = any> extends React.Component<SectionListProps<T>> {}
}
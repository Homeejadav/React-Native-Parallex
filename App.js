import * as React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH * 1;

const images = [
  'https://unsplash.com/photos/FTy5VSGIfiQ/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDY4ODM0&force=true',
  'https://unsplash.com/photos/9mPl0Zo7_gQ/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDcyOTI2&force=true',
  'https://unsplash.com/photos/cqMwRNd0i7I/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDcyOTQ1&force=true',
  'https://unsplash.com/photos/Da0pdCekeUs/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDcxMjUy&force=true',
  'https://unsplash.com/photos/miLZ8Hjl87I/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDczMDQ4&force=true',
];

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
}));

function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        pagingEnabled
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View style={{ width, alignItems: 'center', alignItems: 'center' }}>
              <View
                style={{
                  borderRadius: 18,
                  // padding: 12,
                  // backgroundColor: 'white',
                  // borderColor: 'white',
                  shadowOpacity: 0.5,
                  shadowColor: '#000',
                  shadowOffset: { height: 0, width: 0 },
                  shadowRadius: 30,
                }}>
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Animated.Image
                    source={{ uri: item.photo }}
                    resizeMode={'cover'}
                    style={{
                      borderRadius: 15,
                      width: ITEM_WIDTH * 1.4,

                      height: ITEM_HEIGHT,
                      transform: [{ translateX }],
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

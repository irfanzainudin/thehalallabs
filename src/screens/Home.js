import * as React from 'react';
import { View } from 'react-native';

// our own components
import Camera from './Camera';

function Home({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Camera navigation={navigation} />
    </View>
  );
}

export default Home;
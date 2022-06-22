import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

function Details({ route }) {
  const photo = route.params.photo;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
      <Image
        style={{
          width: photo.width / 10,
          height: photo.height / 10
        }}
        source={{
          uri: photo.uri,
        }}
      />
    </View>
  );
}

export default Details;
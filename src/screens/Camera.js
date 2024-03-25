import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

// Our own components
import CameraComponent from '../components/CameraComponent';

const CameraScreen = (props) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return (
      <View style={{flex:1,alignSelf:'center',justifyContent:'center'}}>
        <Text>No access to camera</Text>
        <Button
          title="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
      </View>
    );
  }

  const onSnap = async () => {
    const options = { base64: true }
    if (cameraRef) {
      try {
        let photo = await cameraRef.current.takePictureAsync(options);

        props.navigation.navigate('Details', {
          photo: photo
        })
      } catch (err) {
        setErrorMessage(err);
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraComponent
        type={type}
        navigation={props.navigation}
        setType={setType}
        cameraRef={cameraRef}
        onSnap={onSnap}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CameraScreen;

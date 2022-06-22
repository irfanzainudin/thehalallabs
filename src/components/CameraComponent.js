import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const CameraComponent = ({ type, setType, cameraRef, onSnap }) => {
  return (
    <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
      <View
        style={styles.camera_view}>
        <TouchableOpacity
          style={styles.flip_btn}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <MaterialIcons name="flip-camera-ios" style={styles.flip_btn} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.snap}
          onPress={onSnap}
        >
          <Ionicons name='ios-radio-button-on' style={styles.snap_btn} />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera_view: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flip_btn: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 36,
    color: 'white',
  },
  snap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  snap_btn: {
    color: 'white',
    fontSize: 100
  }
});

export default CameraComponent;

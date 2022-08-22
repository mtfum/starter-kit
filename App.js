import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
} from '@viro-community/react-viro';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

const HelloWorldSceneAR = () => {
  const [isEmojiVisible, setIsEmojiVisible] = useState(true);
  const [brightness, setBrightness] = useState(0);

  async function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    const brightness = await DeviceBrightness.getBrightnessLevel();
    console.log(brightness);
    setBrightness(brightness);
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
      />
      <ViroSpotLight innerAngle={5} outerAngle={90} />

      <ViroARPlaneSelector>
        <ViroNode
          position={[0, 0, -1]}
          dragType="FixedToWorld"
          onDrag={() => {}}>
          <Viro3DObject
            source={require('./emoji_smile.vrx')}
            visible={isEmojiVisible}
            position={[0, 0.1, 0]}
            scale={[0.2, 0.2, 0.2]}
            type="VRX"
            dragType="FixedDistance"
            onDrag={() => {}}
            onClick={() => {
              setIsEmojiVisible(false);
            }}
          />
        </ViroNode>
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

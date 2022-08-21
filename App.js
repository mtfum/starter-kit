import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');
  const [isEmojiVisible, setIsEmojiVisible] = useState(true);

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
      setText('Tracking lost. Please find a surface.');
    }
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
        {/* <Viro3DObject
          source={require('./emoji_smile.vrx')}
          position={[0, 0.1, 0]}
          scale={[0.2, 0.2, 0.2]}
          type="VRX"
          dragType="FixedDistance"
          onDrag={() => {}}
        /> */}
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

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-fontawesome-pro';

import {Container} from '../components';
import theme from '../global/styles/theme';

export const HomeScreen = ({navigation}) => {
  return (
    <Container>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BarChart')}>
        <Text style={styles.buttonText}>Bar chart</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('WaterChart', {
            value: 45.34,
            config: {
              minValue: 0,
              maxValue: 100,
              circleThickness: 0.05,
              circleFillGap: 0.05,
              circleColor: '#178BCA',
              waveHeight: 0.05,
              waveCount: 3,
              waveRiseTime: 1000,
              waveAnimateTime: 2000,
              waveRise: true,
              waveHeightScaling: true,
              waveAnimate: true,
              waveColor: '#178BCA',
              waveOffset: 0.25,
              textVertPosition: 0.8,
              textSize: 0.6,
              valueCountUp: true,
              displayPercent: true,
              textColor: '#045681',
              waveTextColor: '#A4DBf8',
            },
          })
        }>
        <Text style={styles.buttonText}>Water chart</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WaterChart')}>
        <Text style={styles.buttonText}>Water Level</Text>
      </TouchableOpacity>
      <View>
        <Icon name="chevron-right" color="red" type="regular" size={24} />
      </View>
      <View>
        <Icon name="alicorn" color="red" type="light" size={56} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: theme.colors.primary,
    marginBottom: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

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

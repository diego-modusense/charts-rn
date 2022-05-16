import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import theme from '../global/styles/theme';

export const Container = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentWrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
});

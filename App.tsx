import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.contentWrapper}>
        <Text>Modusense Charts</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    padding: 16,
  },
});

export default App;

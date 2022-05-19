import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BarChart, HomeScreen, WaterChart, LiquidGauge} from '../screens';

const stackRoutes = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator>
    <stackRoutes.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Home'}}
    />
    <stackRoutes.Screen
      name="BarChart"
      component={BarChart}
      options={{title: 'Bar Chart'}}
    />
    <stackRoutes.Screen
      name="WaterChart"
      component={WaterChart}
      options={{title: 'Water Chart'}}
    />
    <stackRoutes.Screen
      name="LiquidGauge"
      component={LiquidGauge}
      options={{title: 'Liquid Gauge'}}
    />
  </stackRoutes.Navigator>
);

export default AppRoutes;

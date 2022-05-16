import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {G, NumberProp, Rect, Svg} from 'react-native-svg';

import {Container} from '../components';
import theme from '../global/styles/theme';

type SellModel = {
  price: number;
  month: string;
};

export const BarChart = () => {
  const svgHeight = 250;
  const groupingHeight = 200;
  const difference = svgHeight - groupingHeight;
  const barWidth = 20;
  const horizontalAxisSpaceBase = 5;
  const initialHorizontalAxis = 15;
  let horizontalAxis = 0;
  let isFirstBar = true;

  const sells: SellModel[] = [
    {
      price: 142,
      month: 'Jan',
    },
    {
      price: 185,
      month: 'Feb',
    },
    {
      price: 78,
      month: 'Mar',
    },
    {
      price: 110,
      month: 'Apr',
    },
    {
      price: 225,
      month: 'May',
    },
  ];

  const getYPosition = (value: number): number => {
    return Math.abs(value) * -1 + difference;
  };

  const calculateNextHorizontalAxis = (): NumberProp => {
    const position = horizontalAxis + horizontalAxisSpaceBase;

    horizontalAxis = position + barWidth;

    return position;
  };

  const getHorizontalAxis = (): NumberProp => {
    if (isFirstBar) {
      isFirstBar = false;
      horizontalAxis = initialHorizontalAxis + barWidth;

      return initialHorizontalAxis;
    }

    return calculateNextHorizontalAxis();
  };

  const getRectObject = (sell: SellModel) => {
    const xAxis = getHorizontalAxis();
    const key = `${sell.month}-${new Date().getTime()}`;

    return (
      <Rect
        key={key}
        x={xAxis}
        y={getYPosition(sell.price)}
        width={barWidth}
        height={sell.price}
        fill={theme.colors.primary}
      />
    );
  };

  return (
    <Container>
      <View style={styles.contentWrapper}>
        <Svg width={'98%'} height={svgHeight}>
          <G y={groupingHeight}>{sells.map(sell => getRectObject(sell))}</G>
        </Svg>
        <Text style={styles.label}>Bar Chart example</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
});

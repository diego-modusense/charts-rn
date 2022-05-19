import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  G,
  Line,
  LineProps,
  NumberProp,
  Rect,
  Svg,
  Text as TextChart,
} from 'react-native-svg';

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
  const barWidth = 25;
  const horizontalAxisSpaceBase = 5;
  const initialHorizontalAxis = 25;
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
    {
      price: 142,
      month: 'Jun',
    },
    {
      price: 185,
      month: 'Jul',
    },
    {
      price: 78,
      month: 'Aug',
    },
    {
      price: 110,
      month: 'Sep',
    },
    {
      price: 225,
      month: 'Oct',
    },
    {
      price: 110,
      month: 'Nov',
    },
    {
      price: 225,
      month: 'Dec',
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
      <>
        <Rect
          key={`bar-value-${key}`}
          x={xAxis}
          y={getYPosition(sell.price)}
          width={barWidth}
          height={sell.price}
          fill={theme.colors.primary}
        />
        <TextChart
          key={`bar-label-${key}`}
          x={xAxis}
          y={40}
          fontSize={10}
          fill={theme.colors.text}>
          {sell.price}
        </TextChart>
      </>
    );
  };

  const getWidth = (): NumberProp => Dimensions.get('screen').width * 0.98;

  const GetFrameChart = () => {
    const horizontalLines: JSX.Element[] = [];

    const baseLinesSpace = 20;
    // for (let index = 0; index < svgHeight; index++) {
    //   let linePosition = svgHeight - baseLinesSpace;

    //   const obj = (
    //     <Line
    //       x1={getWidth()}
    //       y1={linePosition}
    //       x2={0}
    //       y2={linePosition}
    //       stroke={theme.colors.text}
    //       strokeWidth={1}
    //       strokeOpacity={0.2}
    //     />
    //   );

    //   horizontalLines.push(obj);
    // }

    let totalLinesFilled = 0;
    let linePosition = svgHeight - baseLinesSpace;
    let lineLimitXAxis = 0;
    while (totalLinesFilled < svgHeight) {
      console.log('linePosition -> ', linePosition);

      const obj = (
        <Line
          key={`bar-chart-key-${linePosition}`}
          x1={getWidth()}
          y1={linePosition}
          x2={0}
          y2={linePosition}
          stroke={theme.colors.text}
          strokeWidth={1}
          strokeOpacity={0.2}
        />
      );

      horizontalLines.push(obj);

      horizontalLines.push(
        <TextChart
          key={`bar-chart-text-key-${linePosition}`}
          x={0}
          y={linePosition + 18}
          fontSize={10}
          fill={theme.colors.text}>
          {totalLinesFilled}
        </TextChart>,
      );

      totalLinesFilled += baseLinesSpace;
      linePosition -= baseLinesSpace;

      if (totalLinesFilled > svgHeight) {
        lineLimitXAxis = svgHeight - (totalLinesFilled - baseLinesSpace);
      }
    }

    horizontalLines.push(
      <Line
        key={'bar-chart-key-x'}
        x1={0}
        y1={lineLimitXAxis}
        x2={0}
        y2={svgHeight}
        stroke={theme.colors.text}
        strokeWidth={1}
        strokeOpacity={0.5}
      />,
    );
    horizontalLines.push(
      <Line
        key={'bar-chart-key-y'}
        x1={getWidth()}
        y1={svgHeight}
        x2={0}
        y2={svgHeight}
        stroke={theme.colors.text}
        strokeWidth={1}
        strokeOpacity={0.5}
      />,
    );

    return <G>{horizontalLines.map(item => item)}</G>;
  };

  return (
    <Container>
      <View style={styles.contentWrapper}>
        <Svg width={'98%'} height={svgHeight} style={{backgroundColor: '#fff'}}>
          <GetFrameChart />
          {/* <Line
            x1={0}
            y1={0}
            x2={0}
            y2={svgHeight}
            stroke={theme.colors.text}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <Line
            x1={getWidth()}
            y1={svgHeight - 20}
            x2={0}
            y2={svgHeight - 20}
            stroke={theme.colors.text}
            strokeWidth={1}
            strokeOpacity={0.2}
          />
          <Line
            x1={getWidth()}
            y1={svgHeight - 40}
            x2={0}
            y2={svgHeight - 40}
            stroke={theme.colors.text}
            strokeWidth={1}
            strokeOpacity={0.2}
          />
          <Line
            x1={getWidth()}
            y1={svgHeight - 60}
            x2={0}
            y2={svgHeight - 60}
            stroke={theme.colors.text}
            strokeWidth={1}
            strokeOpacity={0.2}
          />
          <Line
            x1={getWidth()}
            y1={svgHeight}
            x2={0}
            y2={svgHeight}
            stroke={theme.colors.text}
            strokeWidth={1}
            strokeOpacity={0.5}
          /> */}
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

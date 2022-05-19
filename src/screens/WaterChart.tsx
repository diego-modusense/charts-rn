import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Circle,
  G,
  Line,
  NumberProp,
  Rect,
  Svg,
  Text as TextSvg,
} from 'react-native-svg';
import * as d3 from 'd3';

import {Container} from '../components';
import theme from '../global/styles/theme';

type LiquidFillGaugeDefaultSettings = {
  minValue: number;
  maxValue: number;
  circleThickness: number;
  circleFillGap: number;
  circleColor: string;
  waveHeight: number;
  waveCount: number;
  waveRiseTime: number;
  waveAnimateTime: number;
  waveRise: boolean;
  waveHeightScaling: boolean;
  waveAnimate: boolean;
  waveColor: string;
  waveOffset: number;
  textVertPosition: number;
  textSize: number;
  valueCountUp: boolean;
  displayPercent: boolean;
  textColor: string;
  waveTextColor: string;
};

type RouteParams = {
  value: number;
  config: LiquidFillGaugeDefaultSettings;
};

export const WaterChart = ({route, navigation}) => {
  //   const value: number = route.params.value;
  //   const config: LiquidFillGaugeDefaultSettings = route.params.config;

  const {value, config}: RouteParams = route.params;

  const svgWidth = Dimensions.get('screen').width * 0.97; // '97%';
  const svgHeight = 250;
  let radius = Math.min(svgWidth, svgHeight) / 2;
  // var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height"))) / 2;

  // var locationX = parseInt(gauge.style("width")) / 2 - radius;
  let locationX = svgWidth / 2 - radius;
  // var locationY = parseInt(gauge.style("height")) / 2 - radius;
  let locationY = svgHeight / 2 - radius;
  // var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
  let fillPercent =
    Math.max(config.minValue, Math.min(config.maxValue, value)) /
    config.maxValue;

  //   var waveHeightScale;
  let waveHeightScale = null as unknown as d3.ScaleLinear<
    number,
    number,
    never
  >;
  //   if (config.waveHeightScaling) {
  //     waveHeightScale = d3.scale
  //       .linear()
  //       .range([0, config.waveHeight, 0])
  //       .domain([0, 50, 100]);
  //   } else {
  //     waveHeightScale = d3.scale
  //       .linear()
  //       .range([config.waveHeight, config.waveHeight])
  //       .domain([0, 100]);
  //   }
  if (config.waveHeightScaling) {
    waveHeightScale = d3
      .scaleLinear()
      .range([0, config.waveHeight, 0])
      .domain([0, 50, 100]);
  } else {
    waveHeightScale = d3
      .scaleLinear()
      .range([config.waveHeight, config.waveHeight])
      .domain([0, 100]);
  }

  //   var textPixels = (config.textSize * radius) / 2;
  const textPixels = (config.textSize * radius) / 2;
  // var textFinalValue = parseFloat(value).toFixed(2);
  const textFinalValue = parseFloat(value.toString()).toFixed(2);
  // var textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
  const textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
  // var percentText = config.displayPercent ? '%' : '';
  const percentText = config.displayPercent ? '%' : '';
  // var circleThickness = config.circleThickness * radius;
  const circleThickness = config.circleThickness * radius;
  // var circleFillGap = config.circleFillGap * radius;
  const circleFillGap = config.circleFillGap * radius;
  // var fillCircleMargin = circleThickness + circleFillGap;
  const fillCircleMargin = circleThickness + circleFillGap;
  // var fillCircleRadius = radius - fillCircleMargin;
  const fillCircleRadius = radius - fillCircleMargin;
  // var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
  const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

  // var waveLength = (fillCircleRadius * 2) / config.waveCount;
  const waveLength = (fillCircleRadius * 2) / config.waveCount;
  // var waveClipCount = 1 + config.waveCount;
  const waveClipCount = 1 + config.waveCount;
  // var waveClipWidth = waveLength * waveClipCount;
  const waveClipWidth = waveLength * waveClipCount;

  // // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
  // var textRounder = function (value) {
  //   return Math.round(value);
  // };
  let textRounder = (valueToRounder: number) => {
    return Math.round(valueToRounder).toString();
  };
  // if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
  //   textRounder = function (value) {
  //   return parseFloat(value).toFixed(1);
  //   };
  // }
  if (
    parseFloat(textFinalValue) !==
    parseFloat(textRounder(Number(textFinalValue)).toString())
  ) {
    textRounder = (valueToRounder: number) =>
      parseFloat(valueToRounder.toString()).toFixed(1);
  }
  // if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
  //   textRounder = function (value) {
  //   return parseFloat(value).toFixed(2);
  //   };
  // }
  if (
    parseFloat(textFinalValue) !==
    parseFloat(textRounder(Number(textFinalValue)))
  ) {
    textRounder = (valueToRounder: number) =>
      parseFloat(valueToRounder.toString()).toFixed(2);
  }

  //   // Data for building the clip wave area.
  //   var data = [];
  //   for (var i = 0; i <= 40 * waveClipCount; i++) {
  //     data.push({
  //       x: i / (40 * waveClipCount),
  //       y: i / 40,
  //     });
  //   }
  const data: Array<{x: number; y: number}> = [];
  for (let index = 0; index <= 40 * waveClipCount; index++) {
    data.push({
      x: index / (40 * waveClipCount),
      y: index / 40,
    });
  }

  //   // Scales for drawing the outer circle.
  //   var gaugeCircleX = d3.scale
  //     .linear()
  //     .range([0, 2 * Math.PI])
  //     .domain([0, 1]);
  //   var gaugeCircleY = d3.scale.linear().range([0, radius]).domain([0, radius]);
  const gaugeCircleX = d3
    .scaleLinear()
    .range([0, 2 * Math.PI])
    .domain([0, 1]);
  const gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius]);

  //   // Scales for controlling the size of the clipping path.
  //   var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
  //   var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);
  const waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
  const waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);

  //   // Scales for controlling the position of the clipping path.
  //   var waveRiseScale = d3.scale
  //     .linear()
  //     // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
  //     // such that the it will won't overlap the fill circle at all when at 0%, and will totally cover the fill
  //     // circle at 100%.
  //     .range([
  //       fillCircleMargin + fillCircleRadius * 2 + waveHeight,
  //       fillCircleMargin - waveHeight,
  //     ])
  //     .domain([0, 1]);
  //   var waveAnimateScale = d3.scale
  //     .linear()
  //     .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
  //     .domain([0, 1]);
  const waveRiseScale = d3
    .scaleLinear()
    .range([
      fillCircleMargin + fillCircleRadius * 2 + waveHeight,
      fillCircleMargin - waveHeight,
    ])
    .domain([0, 1]);
  const waveAnimateScale = d3
    .scaleLinear()
    .range([0, waveClipWidth - fillCircleRadius * 2])
    .domain([0, 1]);

  //   // Scale for controlling the position of the text within the gauge.
  //   var textRiseScaleY = d3.scale
  //     .linear()
  //     .range([
  //       fillCircleMargin + fillCircleRadius * 2,
  //       fillCircleMargin + textPixels * 0.7,
  //     ])
  //     .domain([0, 1]);
  const textRiseScaleY = d3
    .scaleLinear()
    .range([
      fillCircleMargin + fillCircleRadius * 2,
      fillCircleMargin + textPixels * 0.7,
    ])
    .domain([0, 1]);

  //   // Center the gauge within the parent SVG.
  //   var gaugeGroup = gauge
  //     .append('g')
  //     .attr('transform', 'translate(' + locationX + ',' + locationY + ')');

  // ===========================================================================
  // CHECK THIS PART
  // ===========================================================================
  const gaugeGroup = (children: JSX.Element) => <G>{children}</G>;

  //   // Draw the outer circle.
  //   var gaugeCircleArc = d3.svg
  //     .arc()
  //     .startAngle(gaugeCircleX(0))
  //     .endAngle(gaugeCircleX(1))
  //     .outerRadius(gaugeCircleY(radius))
  //     .innerRadius(gaugeCircleY(radius - circleThickness));
  //   gaugeGroup
  //     .append('path')
  //     .attr('d', gaugeCircleArc)
  //     .style('fill', config.circleColor)
  //     .attr('transform', 'translate(' + radius + ',' + radius + ')');
  const gaugeCircleArc = d3
    .arc()
    .startAngle(gaugeCircleX(0))
    .endAngle(gaugeCircleX(1))
    .outerRadius(gaugeCircleY(radius))
    .innerRadius(gaugeCircleY(radius - circleThickness));

  //   // Text where the wave does not overlap.
  //   var text1 = gaugeGroup
  //     .append('text')
  //     .text(textRounder(textStartValue) + percentText)
  //     .attr('class', 'liquidFillGaugeText')
  //     .attr('text-anchor', 'middle')
  //     .attr('font-size', textPixels + 'px')
  //     .style('fill', config.textColor)
  //     .attr(
  //       'transform',
  //       'translate(' +
  //         radius +
  //         ',' +
  //         textRiseScaleY(config.textVertPosition) +
  //         ')',
  //     );

  const cx = svgWidth / 2;
  const cy = svgHeight / 2;

  return (
    <Container>
      <View style={styles.contentWrapper}>
        <Svg
          width={svgWidth}
          height={svgHeight}
          style={{backgroundColor: 'white'}}>
          {/* <Svg width={300} height={60} fill={theme.colors.primary}> */}
          <G>
            <Circle cx={radius} cy={radius} r={80} fill={config.circleColor} />
            <TextSvg>{textRounder(value)}</TextSvg>

            <TextSvg
              x={radius / 2}
              y={textRiseScaleY(0)}
              //   fontSize={textPixels}
              fontSize={32}
              fontWeight={'bold'}
              fill={theme.colors.text}>
              {`${textRounder(value)}%`}
            </TextSvg>
            {/* <Line
              x1={0}
              y1={0}
              x2={0}
              y2={svgHeight}
              stroke={theme.colors.text}
              strokeWidth={1}
            />
            <Line
              x1={svgWidth}
              y1={svgHeight}
              x2={0}
              y2={svgHeight}
              stroke={theme.colors.text}
              strokeWidth={1}
            /> */}
          </G>
        </Svg>
        <Text style={styles.label}>Water Chart example</Text>
        <ScrollView style={styles.list}>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>Value</Text>
            <Text style={styles.infoText}>{value}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>Radius</Text>
            <Text style={styles.infoText}>{radius}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>Location X</Text>
            <Text style={styles.infoText}>{locationX}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>location Y</Text>
            <Text style={styles.infoText}>{locationY}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>textPixels</Text>
            <Text style={styles.infoText}>{textPixels}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>textFinalValue</Text>
            <Text style={styles.infoText}>{textFinalValue}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>textStartValue</Text>
            <Text style={styles.infoText}>{textStartValue}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>percentText</Text>
            <Text style={styles.infoText}>{percentText}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>circleThickness</Text>
            <Text style={styles.infoText}>{circleThickness}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>circleFillGap</Text>
            <Text style={styles.infoText}>{circleFillGap}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>fillCircleMargin</Text>
            <Text style={styles.infoText}>{fillCircleMargin}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>fillCircleRadius</Text>
            <Text style={styles.infoText}>{fillCircleRadius}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>waveHeight</Text>
            <Text style={styles.infoText}>{waveHeight}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>waveLength</Text>
            <Text style={styles.infoText}>{waveLength}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>waveClipCount</Text>
            <Text style={styles.infoText}>{waveClipCount}</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoLabel}>waveClipWidth</Text>
            <Text style={styles.infoText}>{waveClipWidth}</Text>
          </View>
        </ScrollView>
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
  list: {
    width: '100%',
  },
  infoWrapper: {
    width: '100%',
    // backgroundColor: '#ccc',
    padding: 4,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 8,
  },
  infoText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

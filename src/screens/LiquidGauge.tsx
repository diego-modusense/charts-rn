import React, {useRef, useState} from 'react';
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
  ClipPath,
  Defs,
  EMaskUnits,
  G,
  Line,
  LinearGradient,
  Mask,
  NumberProp,
  Path,
  Rect,
  Stop,
  Svg,
  Text as TextSvg,
  Use,
} from 'react-native-svg';
import * as d3 from 'd3';

import {Container} from '../components';
import theme from '../global/styles/theme';

const GAUGE_CONFIG = {
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
    textSize: 37.5,
    valueCountUp: true,
    displayPercent: true,
    textColor: '#045681',
    waveTextColor: '#A4DBf8',
  },
};

export const LiquidGauge = ({route, navigation}) => {
  const svgWidth = Dimensions.get('screen').width * 0.97;
  const svgHeight = 400;
  const radius = 112.5;

  let locationX = svgWidth / 2 - radius;
  // var locationY = parseInt(gauge.style("height")) / 2 - radius;
  let locationY = svgHeight / 2 - radius;
  // var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
  let fillPercent =
    Math.max(
      GAUGE_CONFIG.config.minValue,
      Math.min(GAUGE_CONFIG.config.maxValue, GAUGE_CONFIG.value),
    ) / GAUGE_CONFIG.config.maxValue;

  let waveHeightScale = null as unknown as d3.ScaleLinear<
    number,
    number,
    never
  >;

  if (GAUGE_CONFIG.config.waveHeightScaling) {
    waveHeightScale = d3
      .scaleLinear()
      .range([0, GAUGE_CONFIG.config.waveHeight, 0])
      .domain([0, 50, 100]);
  } else {
    waveHeightScale = d3
      .scaleLinear()
      .range([GAUGE_CONFIG.config.waveHeight, GAUGE_CONFIG.config.waveHeight])
      .domain([0, 100]);
  }

  //   var textPixels = (GAUGE_CONFIG.config.textSize * radius) / 2;
  const textPixels = (GAUGE_CONFIG.config.textSize * radius) / 2;
  // var textFinalValue = parseFloat(value).toFixed(2);
  const textFinalValue = parseFloat(GAUGE_CONFIG.value.toString()).toFixed(2);
  // var textStartValue = GAUGE_CONFIG.config.valueCountUp ? GAUGE_CONFIG.config.minValue : textFinalValue;
  const textStartValue = GAUGE_CONFIG.config.valueCountUp
    ? GAUGE_CONFIG.config.minValue
    : textFinalValue;
  // var percentText = GAUGE_CONFIG.config.displayPercent ? '%' : '';
  const percentText = GAUGE_CONFIG.config.displayPercent ? '%' : '';
  // var circleThickness = GAUGE_CONFIG.config.circleThickness * radius;
  const circleThickness = GAUGE_CONFIG.config.circleThickness * radius;
  // var circleFillGap = GAUGE_CONFIG.config.circleFillGap * radius;
  const circleFillGap = GAUGE_CONFIG.config.circleFillGap * radius;
  // var fillCircleMargin = circleThickness + circleFillGap;
  const fillCircleMargin = circleThickness + circleFillGap;
  // var fillCircleRadius = radius - fillCircleMargin;
  const fillCircleRadius = radius - fillCircleMargin;
  // var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
  const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

  // var waveLength = (fillCircleRadius * 2) / GAUGE_CONFIG.config.waveCount;
  const waveLength = (fillCircleRadius * 2) / GAUGE_CONFIG.config.waveCount;
  // var waveClipCount = 1 + GAUGE_CONFIG.config.waveCount;
  const waveClipCount = 1 + GAUGE_CONFIG.config.waveCount;
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

  const data: Array<{x: number; y: number}> = [];
  for (let index = 0; index <= 40 * waveClipCount; index++) {
    data.push({
      x: index / (40 * waveClipCount),
      y: index / 40,
    });
  }

  const gaugeCircleX = d3
    .scaleLinear()
    .range([0, 2 * Math.PI])
    .domain([0, 1]);
  const gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius]);

  const waveScaleX = (pointer: [number, number]) => {
    console.log('');
    console.log('waveScaleX -> ', pointer);
    console.log('');

    return 8 * 2;
  };

  const waveScaleY = (pointer: [number, number]) => {
    console.log('');
    console.log('waveScaleY -> ', pointer);
    console.log('');

    return 8 * 2;
  };

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

  const waveGroupXPosition =
    fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;

  //   if (config.waveRise) {
  //     waveGroup
  //       .attr(
  //         'transform',
  //         'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')',
  //       )
  //       .transition()
  //       .duration(config.waveRiseTime)
  //       .attr(
  //         'transform',
  //         'translate(' +
  //           waveGroupXPosition +
  //           ',' +
  //           waveRiseScale(fillPercent) +
  //           ')',
  //       )
  //       .each('start', function () {
  //         wave.attr('transform', 'translate(1,0)');
  //       }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
  //   } else {
  //     waveGroup.attr(
  //       'transform',
  //       'translate(' +
  //         waveGroupXPosition +
  //         ',' +
  //         waveRiseScale(fillPercent) +
  //         ')',
  //     );
  //   }

  //   if (config.waveAnimate) animateWave();

  //   function animateWave() {
  //     wave
  //       .transition()
  //       .duration(config.waveAnimateTime)
  //       .ease('linear')
  //       .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
  //       .each('end', function () {
  //         wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
  //         animateWave(config.waveAnimateTime);
  //       });
  //   }

  return (
    <Container>
      <View style={styles.contentWrapper}>
        {/* <Svg
          width={svgWidth}
          height={svgHeight}
          style={{backgroundColor: 'white'}}>
          <G>
            <Circle
              cx={200}
              cy={200}
              r={120}
              fill={theme.charts.water.waveColor}
            />
            <TextSvg>35.34%</TextSvg>

            <TextSvg
              x={150}
              y={150}
              fontSize={32}
              fontWeight={'bold'}
              fill={theme.colors.text}>
              35.34%
            </TextSvg>
          </G>
        </Svg> */}
        <Svg
          width={svgWidth}
          height={svgHeight}
          style={{backgroundColor: 'white'}}>
          <G>
            <Path
              d={
                'M0,125A125,125 0 1,1 0,-125A125,125 0 1,1 0,125M0,118.75A118.75,118.75 0 1,0 0,-118.75A118.75,118.75 0 1,0 0,118.75Z'
              }
              transform={'translate(200,180)'}
              fill={theme.charts.water.waveColor}
            />
            <TextSvg
              textAnchor={'middle'}
              fontSize={GAUGE_CONFIG.config.textSize}
              transform={'translate(200, 140)'}
              fill={theme.charts.water.textPrimary}
              fontWeight={'bold'}>
              45.34%
            </TextSvg>

            {/* ============================================================ */}
            {/* WAVE MASK START */}
            {/* ============================================================ */}
            <Defs>
              <ClipPath id="clipPathWave">
                <Path
                  d="M0,230.10075L1.875,230.10075L3.75,230.10075L5.625,230.10075L7.5,230.10075L9.375,230.10075L11.25,230.10075L13.125,230.10075L15,230.10075L16.875,230.10075L18.75,230.10075L20.625,230.10075L22.5,230.10075L24.375,230.10075L26.25,230.10075L28.125,230.10075L30,230.10075L31.875,230.10075L33.75,230.10075L35.625,230.10075L37.5,230.10075L39.375,230.10075L41.25,230.10075L43.125,230.10075L45,230.10075L46.875,230.10075L48.75,230.10075L50.625,230.10075L52.5,230.10075L54.375,230.10075L56.25,230.10075L58.125,230.10075L60,230.10075L61.875,230.10075L63.75,230.10075L65.625,230.10075L67.5,230.10075L69.375,230.10075L71.25,230.10075L73.125,230.10075L75,230.10075L76.875,230.10075L78.75,230.10075L80.625,230.10075L82.5,230.10075L84.375,230.10075L86.25,230.10075L88.125,230.10075L90,230.10075L91.875,230.10075L93.75,230.10075L95.625,230.10075L97.5,230.10075L99.375,230.10075L101.25,230.10075L103.125,230.10075L105,230.10075L106.875,230.10075L108.75,230.10075L110.625,230.10075L112.5,230.10075L114.375,230.10075L116.25,230.10075L118.125,230.10075L120,230.10075L121.875,230.10075L123.75,230.10075L125.625,230.10075L127.5,230.10075L129.375,230.10075L131.25,230.10075L133.125,230.10075L135,230.10075L136.875,230.10075L138.75,230.10075L140.625,230.10075L142.5,230.10075L144.375,230.10075L146.25,230.10075L148.125,230.10075L150,230.10075L151.875,230.10075L153.75,230.10075L155.625,230.10075L157.5,230.10075L159.375,230.10075L161.25,230.10075L163.125,230.10075L165,230.10075L166.875,230.10075L168.75,230.10075L170.625,230.10075L172.5,230.10075L174.375,230.10075L176.25,230.10075L178.125,230.10075L180,230.10075L181.875,230.10075L183.75,230.10075L185.625,230.10075L187.5,230.10075L189.375,230.10075L191.25,230.10075L193.125,230.10075L195,230.10075L196.875,230.10075L198.75,230.10075L200.625,230.10075L202.5,230.10075L204.375,230.10075L206.25,230.10075L208.125,230.10075L210,230.10075L211.875,230.10075L213.75,230.10075L215.625,230.10075L217.5,230.10075L219.375,230.10075L221.25,230.10075L223.125,230.10075L225,230.10075L226.875,230.10075L228.75,230.10075L230.625,230.10075L232.5,230.10075L234.375,230.10075L236.25,230.10075L238.125,230.10075L240,230.10075L241.875,230.10075L243.75,230.10075L245.625,230.10075L247.5,230.10075L249.375,230.10075L251.25,230.10075L253.125,230.10075L255,230.10075L256.875,230.10075L258.75,230.10075L260.625,230.10075L262.5,230.10075L264.375,230.10075L266.25,230.10075L268.125,230.10075L270,230.10075L271.875,230.10075L273.75,230.10075L275.625,230.10075L277.5,230.10075L279.375,230.10075L281.25,230.10075L283.125,230.10075L285,230.10075L286.875,230.10075L288.75,230.10075L290.625,230.10075L292.5,230.10075L294.375,230.10075L296.25,230.10075L298.125,230.10075L300,230.10075L300,-5.100750000000001L298.125,-5.037951303290648L296.25,-4.851101525492507L294.375,-4.544801528253811L292.5,-4.126593434058012L290.625,-3.606774914137278L288.75,-2.9981456256308383L286.875,-2.315692041546496L285,-1.5762184340580114L283.125,-0.7979330975539514L281.25,1.0934737296796087e-14L279.375,0.797933097553955L277.5,1.576218434058015L275.625,2.3156920415464994L273.75,2.998145625630841L271.875,3.6067749141372807L270,4.126593434058014L268.125,4.544801528253813L266.25,4.851101525492508L264.375,5.037951303290649L262.5,5.100750000000001L260.625,5.037951303290648L258.75,4.851101525492508L256.875,4.544801528253811L255,4.126593434058012L253.125,3.6067749141372785L251.25,2.9981456256308388L249.375,2.3156920415464963L247.5,1.5762184340580119L245.625,0.7979330975539519L243.75,7.811428716420656e-15L241.875,-0.7979330975539545L240,-1.5762184340580143L238.125,-2.3156920415464985L236.25,-2.9981456256308405L234.375,-3.6067749141372802L232.5,-4.126593434058014L230.625,-4.544801528253813L228.75,-4.851101525492508L226.875,-5.037951303290649L225,-5.100750000000001L223.125,-5.037951303290648L221.25,-4.851101525492508L219.375,-4.544801528253811L217.5,-4.126593434058013L215.625,-3.606774914137279L213.75,-2.9981456256308396L211.875,-2.315692041546497L210,-1.5762184340580125L208.125,-0.7979330975539526L206.25,9.685413864645914e-15L204.375,0.7979330975539539L202.5,1.5762184340580137L200.625,2.315692041546498L198.75,2.9981456256308405L196.875,3.6067749141372802L195,4.126593434058013L193.125,4.544801528253812L191.25,4.851101525492508L189.375,5.03795130329065L187.5,5.100750000000001L185.625,5.03795130329065L183.75,4.851101525492508L181.875,4.5448015282538154L180,4.126593434058013L178.125,3.6067749141372794L176.25,2.9981456256308325L174.375,2.3156920415464977L172.5,1.5762184340580045L170.625,0.7979330975539531L168.75,0L166.875,-0.7979330975539531L165,-1.5762184340580045L163.125,-2.3156920415464977L161.25,-2.9981456256308325L159.375,-3.6067749141372794L157.5,-4.126593434058013L155.625,-4.5448015282538154L153.75,-4.851101525492508L151.875,-5.03795130329065L150,-5.100750000000001L148.125,-5.03795130329065L146.25,-4.851101525492505L144.375,-4.54480152825382L142.5,-4.126593434058013L140.625,-3.6067749141372802L138.75,-2.9981456256308334L136.875,-2.31569204154649L135,-1.5762184340580137L133.125,-0.7979330975539539L131.25,-6.246617160750862e-16L129.375,0.7979330975539526L127.5,1.5762184340580125L125.625,2.3156920415464888L123.75,2.998145625630832L121.875,3.606774914137279L120,4.126593434058013L118.125,4.54480152825382L116.25,4.8511015254925045L114.375,5.03795130329065L112.5,5.100750000000001L110.625,5.03795130329065L108.75,4.851101525492505L106.875,4.54480152825382L105,4.126593434058014L103.125,3.6067749141372802L101.25,2.998145625630834L99.375,2.3156920415464906L97.5,1.5762184340580143L95.625,0.7979330975539545L93.75,1.2493234321501725e-15L91.875,-0.7979330975539519L90,-1.5762184340580119L88.125,-2.3156920415464923L86.25,-2.9981456256308348L84.375,-3.606774914137282L82.5,-4.126593434058011L80.625,-4.544801528253817L78.75,-4.8511015254925045L76.875,-5.037951303290649L75,-5.100750000000001L73.125,-5.03795130329065L71.25,-4.851101525492505L69.375,-4.544801528253816L67.5,-4.126593434058014L65.625,-3.606774914137287L63.75,-2.998145625630834L61.875,-2.315692041546491L60,-1.576218434058015L58.125,-0.7979330975539639L56.25,-1.8739851482252586e-15L54.375,0.7979330975539602L52.5,1.5762184340580114L50.625,2.315692041546488L48.75,2.998145625630831L46.875,3.6067749141372847L45,4.126593434058012L43.125,4.544801528253819L41.25,4.8511015254925045L39.375,5.037951303290649L37.5,5.100750000000001L35.625,5.03795130329065L33.75,4.851101525492506L31.875,4.544801528253817L30,4.126593434058015L28.125,3.6067749141372873L26.25,2.9981456256308343L24.375,2.3156920415464914L22.5,1.5762184340580156L20.625,0.7979330975539646L18.75,2.498646864300345e-15L16.875,-0.7979330975539597L15,-1.5762184340580108L13.125,-2.315692041546487L11.25,-2.9981456256308303L9.375,-3.6067749141372842L7.5,-4.126593434058012L5.625,-4.544801528253815L3.75,-4.8511015254925045L1.875,-5.037951303290649L0,-5.100750000000001Z"
                  transform={'translate(30, 175)'}
                  fill={theme.charts.water.waveColor}
                />
                {/* <Path
                  d={
                    'M101,153 c45,24.5 55,-25.5 99,0 c45,24.5 55,-25.5 100,-1 c45,25 55,-25 100,0 l-1,148 l2,76 l-302,-1 l2,-223'
                  }
                  transform={'translate(50,180)'}
                  fill={theme.charts.water.waveColor}
                /> */}
              </ClipPath>
            </Defs>
            {/* ============================================================ */}
            {/* WAVE MASK END */}
            {/* ============================================================ */}
            <G clipPath="#clipPathWave">
              <Circle
                cx={200}
                cy={180}
                r={112.5}
                // fill={theme.charts.water.waveColor}
                fill={'#178bca'}
              />
              <TextSvg
                textAnchor={'middle'}
                fontSize={37.5}
                transform={'translate(200, 140)'}
                fill={theme.charts.water.textSecondary}
                fontWeight={'bold'}>
                45.34%
              </TextSvg>
            </G>
          </G>
        </Svg>
        <Text style={styles.label}>Liquid gauge Chart example</Text>
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

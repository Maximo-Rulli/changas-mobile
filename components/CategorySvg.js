import React from 'react'
import { View, StyleSheet } from 'react-native'

// Map of id to SVG imports
const svgMap = {
  '1': require('../assets/IconCategories/1.svg').default,
  '2': require('../assets/IconCategories/2.svg').default,
  '3': require('../assets/IconCategories/3.svg').default,
  '4': require('../assets/IconCategories/4.svg').default,
  '5': require('../assets/IconCategories/5.svg').default,
  '6': require('../assets/IconCategories/6.svg').default,
  '7': require('../assets/IconCategories/7.svg').default,
  '8': require('../assets/IconCategories/8.svg').default,
  '9': require('../assets/IconCategories/9.svg').default,
  '10': require('../assets/IconCategories/10.svg').default,
  '11': require('../assets/IconCategories/11.svg').default,
  '12': require('../assets/IconCategories/12.svg').default,
  '13': require('../assets/IconCategories/13.svg').default,
  '14': require('../assets/IconCategories/14.svg').default,
  '15': require('../assets/IconCategories/15.svg').default,
  '16': require('../assets/IconCategories/16.svg').default,
  '17': require('../assets/IconCategories/17.svg').default,
  '18': require('../assets/IconCategories/18.svg').default,
  '19': require('../assets/IconCategories/19.svg').default,
  '20': require('../assets/IconCategories/20.svg').default
}

const CategorySvg = ({ id, width, height }) => {
  const SvgComponent = svgMap[id]

  if (!SvgComponent) {
    // Handle case when SVG is not found
    return <View style={styles.notFound}><Text>Icono no encontrado</Text></View>
  }

  return <SvgComponent width={width} height={height}/>
}

const styles = StyleSheet.create({
  notFound: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CategorySvg

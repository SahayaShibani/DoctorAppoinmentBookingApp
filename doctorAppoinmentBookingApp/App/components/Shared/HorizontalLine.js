import { View, Text } from 'react-native'
import React from 'react'
import Color from '../../../assets/Shared/Color'

export default function HorizontalLine() {
  return (
    <View style={{borderBottomWidth: 1,
        borderColor: Color.LIGHT_GRAY || '#d3d3d3',
        margin: 5,
        marginBottom: 10}}>
        </View>
  )
}
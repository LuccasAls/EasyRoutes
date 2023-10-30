import React from 'react';
import { Image } from 'react-native'
import { ButtonContainer, Container, Text } from '../../styles';

export function CardOptions({title, icon, color, fontColor,onPress}) {
  return (
    <ButtonContainer
        height={161}
        background={color}
        gap={5}
        border={20}
        direction="column"
        onPress={onPress}
    >
        <Image source={icon} style={{height: 100, width: 100}}/>
        <Text
            fontSize={18}
            color={fontColor}
        >{title}</Text>
    </ButtonContainer>
  );
}
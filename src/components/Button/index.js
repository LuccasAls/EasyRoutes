import React from 'react';
import { ButtonContainer, Text } from '../../styles';
import { Image } from 'react-native';

export function Button({text, icon, color, textColor, direction, onPress}) {
  return (
    <ButtonContainer
        row
        height={61}
        background={color}
        border={10}
        direction={direction}
        gap={15}
        onPress={onPress}
     >
        {icon && <Image source={icon} style={{height: 18, width: 18}}/> }
        <Text fontSize={18} color={textColor}>{text}</Text>
    </ButtonContainer>
  );
}
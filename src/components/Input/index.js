import React from 'react';
import { Image, View } from  'react-native'
import { InputView, InputContainer, Text,  } from '../../styles';

export function Input({placeholder, icon, title, onChangeText,value, editable = true, onFocus}) {
  return (
    <InputView>
        <Text
            fontSize={16}

        >{title}</Text>
      
       <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', gap: 10}}>
            <Image source={icon} style={{height: 18, width: 18}}/>
            <InputContainer 
                editable={editable}
                placeholder={placeholder}
                placeholderTextColor={"#AEAEAE"}
                onChangeText={onChangeText}
                value={value}
                onFocus={onFocus}
            />
       </View>
       
    </InputView>
  );
}
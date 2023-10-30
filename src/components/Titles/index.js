import React from 'react';

import { Container, Text } from '../../styles';

export function Titles({title, description}) {
  return (
    <Container 
            align="flex-start"
            height={100}
           
          
        >
            <Text fontSize={25} >{title}</Text>
            <Text fontSize={15} color="muted">{description}</Text>
        </Container>
  );
}
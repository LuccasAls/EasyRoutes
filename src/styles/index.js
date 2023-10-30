import styled from "styled-components/native";
import theme from "./theme.json"
import MapView from "react-native-maps";
import Pulse from "react-native-pulse";



export const PulseCircle = styled(Pulse).attrs({
    color: "#FB974E",


})`

`;

export const Container  = styled.View`
    flex: 1;
    flex-direction: ${(props) => (props.row ? 'row' : 'column')};
    justify-content:${( prop ) => prop.justify || 'center'};
    align-items: ${(props) => props.align || 'center'};
    width: 100%;
    padding:  ${(props) => props.padding || 0}px;
    padding-bottom:  ${(props) => props.paddingBottom || 0}px;
    gap:  ${(props) => props.gap || 0}px;
    max-width:  ${(props) => props.width + "px" || '100%'};
    max-height:  ${(props) => props.height  ? props.height + "px" : 'auto'  };
    position:  ${(props) => props.position || 'relative'};
    top:  ${(props) => props.top || '0'}px;
    z-index:  ${(props) => props.zIndex || 1};
    background-color:  ${(props) => props.background ? theme.colors[props.background] : 'transparent'};
    border-radius: ${(props) => props.border || '0'}px;
    overflow: hidden;
`;

export const Scroll  = styled.ScrollView`
    flex: 1;
    flex-direction: ${(props) => (props.row ? 'row' : 'column')};
    width: 100%;
    padding:  ${(props) => props.padding || 0}px;
    padding-bottom:  ${(props) => props.paddingBottom || 0}px;
    gap:  ${(props) => props.gap || 0}px;
    max-width:  ${(props) => props.width + "px" || '100%'};
    max-height:  ${(props) => props.height ? props.height + "px" : 'auto'  };
    position:  ${(props) => props.position || 'relative'};
    top:  ${(props) => props.top || '0'}px;
    z-index:  ${(props) => props.zIndex || 1};
    background-color:  ${(props) => props.background ? theme.colors[props.background] : 'transparent'};
    border-radius: ${(props) => props.border || '0'}px;
`;

export const Text = styled.Text`
    font-size: ${(props) => props.fontSize || 10}px;
    color:  ${(props) => props.color ? theme.colors[props.color] : theme.colors.text};
    width: ${props => props.full && '100%'};
    
    
`;
export const InputContainer = styled.TextInput`
    font-size: ${(props) => props.fontSize || 10}px;
    color:  ${(props) => props.color ? theme.colors[props.color] : theme.colors.text};
    font-size: 14px;
    
`;
export const InputView = styled.View`
    border-bottom-width: 2px;
    border-color: #cecece;
    width: 100%;
    flex-direction: column;
    padding-left: 20px;
    gap: 5px;
`

export const ButtonContainer = styled.TouchableOpacity`
    flex: 1;
    flex-direction: ${(props) => (props.direction || 'row')};
    justify-content:${( prop ) => prop.justify || 'center'};
    align-items: ${(props) => props.align || 'center'};
    width: 100%;
    padding:  ${(props) => props.padding || 0}px;
    gap:  ${(props) => props.gap || 0}px;
    max-width:  ${(props) => props.width || '100%'};
    max-height:  ${(props) => props.height ? props.height + "px" : 'auto'  };
    background-color:  ${(props) => props.background ? theme.colors[props.background] : 'transparent'};
    border-radius: ${(props) => props.border || '0'}px;
`;

export const BackButton = styled.TouchableOpacity`
 
`;
export const ButtonEdit = styled.TouchableOpacity`
    width: 100%;
    padding: 8px;
    background-color: ${theme.colors.secondary};
    justify-content: center;
    align-items: center;
    
`

export const Circle = styled.View`
    height: 10px;
    width: 10px;
    border-radius: 10px;
    background-color: ${props => props.red ? theme.colors.info : '#80FF00'};
    margin-left: 10px;
`;

export const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 0px;
    background-color: ${(props) => props.type ? theme.colors[props.type] : 'secondary'};
`;

export const AddressList = styled.FlatList`
    flex: 1;
    width: 100%;
    padding-top: 10px;
`;
export const AddressItem = styled.TouchableOpacity`
    padding: 5px 0px;
    align-items: flex-start;
`;

export const Separator = styled.View`
    height: 10px;
    width: 10px;
`;
export const Line = styled.View`
    height: 100%;
    width: 2px;
    background-color: ${theme.colors.muted};
    margin: 0px 30px;
`;

export const Divider = styled(Line)`
    margin: 0px 10px;
`;

export const Map = styled(MapView)`
    flex: 1;
    width: 100%;
    height: 100%;
    opacity: ${props => props.disable ? 0.2 : 1};
`;

export const Avatar = styled.Image.attrs({
    elevation: 50,
})`
    width: ${props => props.small ? '35px' :'50px' };
    height: ${props => props.small ? '35px' :'50px' };
    border-radius: ${props => props.small ? '35px' :'50px' };
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: ${theme.colors.muted};
    
`;

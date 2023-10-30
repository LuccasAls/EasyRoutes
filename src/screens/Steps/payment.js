import React, {useState, useEffect} from 'react';
import {Keyboard } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { Container } from '../../styles';
import { Titles } from '../../components/Titles';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment, createUser } from '../../store/modules/app/actions';

export function Payment({navigation}) {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(true);
  const [payment, setPayment] = useState({
    nome: null,
    numero: null,
    validade: null,
    cvv: null,
  });
  
  const singIn = () => {
    console.log(payment)
    dispatch(updatePayment(payment))
    dispatch(createUser())

    
  }

  useEffect(()=> {
      const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
          setIsVisible(false)
      });
      const keyboardDidHiddenListener = Keyboard.addListener("keyboardDidHide", () => {
          setIsVisible(true)
      });
      return () => {
          keyboardDidShowListener.remove();
          keyboardDidHiddenListener.remove();
      }
  }, [])
  return (
    <Container
      background="background"
      padding={30}
      justify="space-between"
    >
        <Titles
          title="Cartão de Crédito"
          description="Preencha os dados do seu cartão de crédito"
        />
        <Container
          justify="flex-start"

        >
          <CreditCardInput 
            cardScale={1.1}
            allowScroll
            onChange={(e) => {
              const {number, expiry, cvc, name } = e.values;
              setPayment({
                nome: name,
                numero: number,
                validade: expiry,
                cvv: cvc,
              })
            }}
            labelStyle={{color: "#fff"}}
            inputStyle	={{color: "#fff"}}
            inputContainerStyle={{borderColor: "#fff", borderBottomWidth: 2}}
            requiresName
            labels={ {number: "NÚMERO DO CARTÃO", expiry: "VAL.", cvc: "CVC/CCV", name: "NOME DO TITULAR" }}
            placeholders={ {number: "**** **** **** ****", expiry: "MM/AA", cvc: "***", name: "Luccas A Santos" }}
          />
        </Container>

        { isVisible &&
          <Button
            text="Continuar"
            color="secondary"
            onPress={() => singIn()}
          />
        }

    </Container>
  );
}
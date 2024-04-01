import { useRef } from 'react';
import {
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';

import { Container, Content } from './styles';

const keyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const textAreaInputRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    console.log('Ok');
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardAvoidingViewBehavior}
      >
        <ScrollView>
          <Content>
            <LicensePlateInput
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => textAreaInputRef.current?.focus()}
              returnKeyType="next"
            />

            <TextAreaInput
              ref={textAreaInputRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
            />

            <Button title="Registrar saída" />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

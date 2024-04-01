import { useRef, useState } from 'react';
import {
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';

import { licensePlateValidate } from '../../utils/licensePlateValidate';

import { Container, Content } from './styles';

const keyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const licensePlateInputRef = useRef<TextInput>(null);
  const textAreaInputRef = useRef<TextInput>(null);

  const [licensePlace, setLicensePlace] = useState('');
  const [description, setDescription] = useState('');

  function handleDepartureRegister() {
    if (!licensePlateValidate(licensePlace)) {
      licensePlateInputRef.current?.focus();
      return Alert.alert(
        'Placa inválida',
        'A placa é inválida. Por favor, informe a placa correta do veículo.'
      );
    }

    if (description.trim().length === 0) {
      textAreaInputRef.current?.focus();
      return Alert.alert(
        'Finalidade',
        'Por favor, informe a finalidade da utilização do veículo.'
      );
    }
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
              ref={licensePlateInputRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => textAreaInputRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlace}
            />

            <TextAreaInput
              ref={textAreaInputRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button title="Registrar saída" onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

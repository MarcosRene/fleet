import { useRef, useState } from 'react';
import { TextInput, ScrollView, Alert } from 'react-native';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';

import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { licensePlateValidate } from '../../utils/licensePlateValidate';

import { Container, Content } from './styles';

export function Departure() {
  const { goBack } = useNavigation();

  const licensePlateInputRef = useRef<TextInput>(null);
  const textAreaInputRef = useRef<TextInput>(null);

  const [licensePlace, setLicensePlace] = useState('');
  const [description, setDescription] = useState('');
  const [isRegistring, setIsRegistring] = useState(false);

  const realm = useRealm();
  const user = useUser();

  function handleDepartureRegister() {
    try {
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

      setIsRegistring(true);

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlace.toLocaleUpperCase(),
            description,
          })
        );
      });

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!');
      goBack();
    } catch (error) {
      console.error(error);
      return Alert.alert(
        'Erro',
        'Não foi possível registrar a saída do veículo.'
      );
    } finally {
      setIsRegistring(false);
    }
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
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

            <Button
              title="Registrar saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistring}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}

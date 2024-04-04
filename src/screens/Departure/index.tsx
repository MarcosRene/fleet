import { useEffect, useRef, useState } from 'react';
import { TextInput, ScrollView, Alert } from 'react-native';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  requestBackgroundPermissionsAsync,
  useForegroundPermissions,
  watchPositionAsync,
} from 'expo-location';
import { Car } from 'phosphor-react-native';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { LicensePlateInput } from '@/components/LicensePlateInput';
import { Loading } from '@/components/Loading';
import { LocationInfo } from '@/components/LocationInfo';
import { Map } from '@/components/Map';
import { TextAreaInput } from '@/components/TextAreaInput';

import { useRealm } from '@/libs/realm';
import { Historic } from '@/libs/realm/schemas/Historic';
import { getAddressLocation } from '@/utils/getAddressLocation';

import { licensePlateValidate } from '@/utils/licensePlateValidate';

import { Container, Content, Message } from './styles';

export function Departure() {
  const { goBack } = useNavigation();
  const realm = useRealm();
  const user = useUser();

  const licensePlateInputRef = useRef<TextInput>(null);
  const textAreaInputRef = useRef<TextInput>(null);

  const [licensePlace, setLicensePlace] = useState('');
  const [description, setDescription] = useState('');
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurretnCoords] =
    useState<LocationObjectCoords | null>(null);
  const [isRegistring, setIsRegistring] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  const [locationForegroundPermission, requesLocationForegroundPermission] =
    useForegroundPermissions();

  async function handleDepartureRegister() {
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

      if (!currentCoords?.latitude && !currentCoords?.longitude) {
        return Alert.alert(
          'Localização',
          'Não foi possível obter a localização atual, Tente novamante!'
        );
      }

      setIsRegistring(true);

      const backgroundPermission = await requestBackgroundPermissionsAsync();

      if (!backgroundPermission.granted) {
        setIsRegistring(false);

        return Alert.alert(
          'Localização',
          'É necessário permitir que o App tenha acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo".'
        );
      }

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

  useEffect(() => {
    requesLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) return;

    let subscription: LocationSubscription;

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      ({ coords }) => {
        setCurretnCoords(coords);
        getAddressLocation(coords).then((addressResponse) => {
          if (addressResponse) {
            setCurrentAddress(addressResponse);
          }
        });
      }
    )
      .then((response) => (subscription = response))
      .finally(() => {
        setIsLoadingLocation(false);
      });

    return () => subscription?.remove();
  }, [locationForegroundPermission]);

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />

        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          utilizar essa funcionalidae. Por favor, acesse as configurações do seu
          dispositivo para conceder essa permissão ao aplicativo.
        </Message>
      </Container>
    );
  }

  if (isLoadingLocation) {
    return <Loading />;
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {!!currentCoords && <Map coordinates={[currentCoords]} />}

          <Content>
            {!!currentAddress && (
              <LocationInfo
                icon={Car}
                label="Localização atual"
                description={currentAddress}
              />
            )}

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

import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';
import { BSON } from 'realm';
import { LatLng } from 'react-native-maps';

import { Button } from '@/components/Button';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Header } from '@/components/Header';
import { Map } from '@/components/Map';

import { useObject, useRealm } from '@/libs/realm';
import { Historic } from '@/libs/realm/schemas/Historic';
import { getLastAsyncTimestamp } from '@/libs/asyncStorage/syncStorage';
import { getStorageLocations } from '@/libs/asyncStorage/locationStorage';

import { stopLocationTask } from '@/tasks/backgroundLocationTask';

import {
  AsyncMessage,
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles';

type RouteParamsProps = {
  id: string;
};

type UUID = string;

function toUUID(id: unknown): UUID {
  return id as UUID;
}

export function Arrival() {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, toUUID(new BSON.UUID(id)));
  const realm = useRealm();

  const [dataNotSynced, setDataNotSynced] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  const departureStatusType = historic?.status === 'departure';

  const asyncMessageText = departureStatusType ? 'partida' : 'chegada';

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => removeVehicleUsage(),
      },
    ]);
  }

  async function removeVehicleUsage() {
    try {
      realm.write(() => {
        realm.delete(historic);
      });

      await stopLocationTask();

      goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cancelar o uso do veículo.');
    }
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.'
        );
      }

      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });

      await stopLocationTask();

      Alert.alert('Chegada', 'Chegada registrada com sucesso!');
      goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo');
    }
  }

  async function getLocationsInfo() {
    if (!historic) {
      return;
    }

    const lastSync = await getLastAsyncTimestamp();
    const updatedAt = historic!.updated_at.getTime();
    setDataNotSynced(updatedAt > lastSync);

    const locationStorage = await getStorageLocations();
    setCoordinates(locationStorage);
  }

  useEffect(() => {
    getLocationsInfo();
  }, [historic]);

  return (
    <Container>
      <Header title={departureStatusType ? 'Chegada' : 'Detalhes'} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>

      {departureStatusType && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

          <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSynced && (
        <AsyncMessage>
          Sincronização da {asyncMessageText} pendente.
        </AsyncMessage>
      )}
    </Container>
  );
}

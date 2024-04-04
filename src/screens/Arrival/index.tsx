import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';
import { BSON } from 'realm';

import { Button } from '@/components/Button';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Header } from '@/components/Header';

import { useObject, useRealm } from '@/libs/realm';
import { Historic } from '@/libs/realm/schemas/Historic';
import { getLastAsyncTimestamp } from '@/libs/asyncStorage/syncStorage';

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

  function removeVehicleUsage() {
    try {
      realm.write(() => {
        realm.delete(historic);
      });

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

      await stopLocationTask();

      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });

      Alert.alert('Chegada', 'Chegada registrada com sucesso!');
      goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo');
    }
  }

  useEffect(() => {
    getLastAsyncTimestamp().then((lastSync) =>
      setDataNotSynced(historic!.updated_at.getTime() > lastSync)
    );
  }, []);

  return (
    <Container>
      <Header title={departureStatusType ? 'Chegada' : 'Detalhes'} />

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

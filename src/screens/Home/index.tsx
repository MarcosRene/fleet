import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Realm, useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { CloudArrowUp } from 'phosphor-react-native';

import { CarStatus } from '../../components/CarStatus';
import { HomeHeader } from '../../components/HomeHeader';
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard';
import { TopMessage } from '../../components/TopMessage';

import { useQuery, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import {
  getLastSyncTimestamp,
  saveLastSyncTimestamp,
} from '../../libs/asyncStorage/syncStorage';

import { formateDate } from '../../utils/formatDate';

import { Container, Content, LabelEmpty, Title } from './styles';

export function Home() {
  const { navigate } = useNavigation();
  const historic = useQuery(Historic);
  const realm = useRealm();

  const user = useUser();

  const [percentageToSync, setPercentageToSync] = useState<string | null>(null);

  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    []
  );

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse._id.toString() });
    } else {
      navigate('departure');
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Veículo em uso',
        'Não foi possível carregar o veículo em uso.'
      );
    }
  }

  async function fetchHistoric() {
    try {
      const response = historic.filtered(
        "status='arrival' SORT(created_at DESC)"
      );

      const lastSync = await getLastSyncTimestamp();

      const formattedHistoricResponse = response.map((historic) => ({
        id: historic._id,
        licensePlate: historic.license_plate,
        created: formateDate(historic.created_at),
        isSync: lastSync > historic.updated_at!.getTime(),
      }));

      setVehicleHistoric(formattedHistoricResponse);
    } catch (error) {
      console.error(error);
      Alert.alert('Histórico', 'Não foi possível carregar o histórico.');
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id });
  }

  async function progressNotification(
    transferred: number,
    transferable: number
  ) {
    const percentage = (transferred / transferable) * 100;

    if (percentage === 100) {
      await saveLastSyncTimestamp();
      await fetchHistoric();
      setPercentageToSync(null);

      Toast.show({
        type: 'info',
        text1: 'Todos os dados estão sincronizados',
      });
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`);
    }
  }

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', () => fetchVehicleInUse());
      }
    };
  }, []);

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = '${user!.id}'`);

      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' });
    });
  }, [realm]);

  useEffect(() => {
    const syncSession = realm.syncSession;

    if (!syncSession) return;

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    );

    return () => syncSession.removeProgressNotification(progressNotification);
  }, []);

  return (
    <Container>
      {percentageToSync && (
        <TopMessage title={percentageToSync} icon={CloudArrowUp} />
      )}

      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <LabelEmpty>Nenhum registro de utilização.</LabelEmpty>
          }
        />
      </Content>
    </Container>
  );
}

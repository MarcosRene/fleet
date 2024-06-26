import 'react-native-get-random-values';

import { StatusBar } from 'expo-status-bar';
import { AppProvider, UserProvider } from '@realm/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNetInfo } from '@react-native-community/netinfo';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { WifiSlash } from 'phosphor-react-native';

import { Loading } from './src/components/Loading';
import { TopMessage } from './src/components/TopMessage';

import { Routes } from './src/routes';
import { RealmProvider, syncConfig } from './src/libs/realm';

import { SignIn } from './src/screens/SignIn';

import theme from './src/theme';

import { REALM_APP_ID } from '@env';

export default function App() {
  const netInfo = useNetInfo();

  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!isFontsLoaded) {
    return <Loading />;
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          <StatusBar backgroundColor="transparent" style="light" translucent />

          {!netInfo.isConnected && (
            <TopMessage icon={WifiSlash} title="Você está off-line." />
          )}

          <UserProvider fallback={SignIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}


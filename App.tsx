import { StatusBar } from 'expo-status-bar';
import { AppProvider, UserProvider } from '@realm/react';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';

import { Home } from './src/screens/Home';
import { SignIn } from './src/screens/SignIn';

import theme from './src/theme';

import { REALM_APP_ID } from '@env';

export default function App() {
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
        <StatusBar backgroundColor="transparent" style="light" translucent />

        <UserProvider fallback={SignIn}>
          <Home />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}


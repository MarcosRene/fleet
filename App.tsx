import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components/native';

import { Loading } from './src/components/Loading';

import { SignIn } from './src/screens/SignIn';

import theme from './src/theme';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!isFontsLoaded) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="transparent" style="light" translucent />
      <SignIn />
    </ThemeProvider>
  );
}


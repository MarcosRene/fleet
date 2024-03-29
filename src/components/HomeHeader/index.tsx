import { TouchableOpacity } from 'react-native';
import { useApp, useUser } from '@realm/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Container,
  Greeting,
  Message,
  Name,
  Picture,
  PoweIcon,
} from './styles';

export function HomeHeader() {
  const app = useApp();
  const user = useUser();

  const insets = useSafeAreaInsets();

  function handleLogout() {
    app.currentUser?.logOut();
  }

  return (
    <Container paddingTop={insets.top}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9offQof00ayfQay~qj[fQj["
      />

      <Greeting>
        <Message>Olá,</Message>

        <Name>{user?.profile.name}</Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <PoweIcon />
      </TouchableOpacity>
    </Container>
  );
}

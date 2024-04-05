import { LocationObjectCoords, reverseGeocodeAsync } from 'expo-location';

type GetAddressLocationProps = Pick<
  LocationObjectCoords,
  'latitude' | 'longitude'
>;

export async function getAddressLocation({
  latitude,
  longitude,
}: GetAddressLocationProps) {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });

    return addressResponse[0]?.street;
  } catch (error) {
    console.log(error);
  }
}

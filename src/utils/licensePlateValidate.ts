const LICENSE_PLACE_VALIDATION = '^[A-Z]{3}[0-9][A-Z][0-9]{2}';

export function licensePlateValidate(licensePlate: string) {
  return licensePlate.match(LICENSE_PLACE_VALIDATION);
}

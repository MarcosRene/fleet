export function formateDate(date: Date) {
  return date
    .toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace('', 'Saída em ')
    .replace(',', ' às');
}

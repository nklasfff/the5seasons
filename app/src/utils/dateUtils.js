export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return 'God nat';
  if (hour < 10) return 'God morgen';
  if (hour < 13) return 'God formiddag';
  if (hour < 17) return 'God eftermiddag';
  if (hour < 21) return 'God aften';
  return 'God nat';
}

export function formatDate(date) {
  const months = ['januar','februar','marts','april','maj','juni','juli','august','september','oktober','november','december'];
  return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
}

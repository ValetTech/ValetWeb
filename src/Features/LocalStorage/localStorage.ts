export default function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return { user: null, accessToken: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { user: null, token: null };
  }
}

export default function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return { user: null, accessToken: null, token: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { user: null, accesstoken: null, token: null };
  }
}

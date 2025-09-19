const createRequest = async (options = {}) => {
  const {
    method = 'GET',
    url = '/',
    data = null,
    callback = () => {},
  } = options;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : null,
    });

    if (res.status === 204) {
      callback(null, null);
      return;
    }

    if (!res.ok) {
      const text = await res.text();
      callback(new Error(`HTTP ${res.status}: ${text}`), null);
      return;
    }

    const json = await res.json();
    callback(null, json);
  } catch (err) {
    callback(err, null);
  }
};

export default createRequest;
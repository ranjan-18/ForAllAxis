import { useState, useEffect } from 'react';
import api from '../services/api';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try { setLoading(true); const res = await api(url, options); setData(res.data); }
    catch (err) { setError(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [url]);
  return { data, loading, error, refetch: fetchData };
}

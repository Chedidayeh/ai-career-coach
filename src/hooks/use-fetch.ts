import { useState } from "react";
import { toast } from "sonner";

interface UseFetchReturn<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  fn: (...args: any[]) => Promise<void>;
  setData: (data: T | undefined) => void;
}

const useFetch = <T>(cb: (...args: any[]) => Promise<T>): UseFetchReturn<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error as Error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;

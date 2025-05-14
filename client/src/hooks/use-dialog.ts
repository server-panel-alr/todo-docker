import { useEffect, useReducer } from 'react';
import { dialog } from '../services';

const useDialog = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = dialog.subscribe(forceUpdate);
    return () => {
      unsubscribe();
    };
  }, []);

  return dialog;
};

export { useDialog };

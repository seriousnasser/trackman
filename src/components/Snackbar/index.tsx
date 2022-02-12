import { useSnackBarStore } from 'stores/snackbar';

import style from './styles.module.scss';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Snackbar() {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { message, alert } = useSnackBarStore();
  console.log(message);
  useEffect(() => {
    if (message) {
      timeoutRef.current = setTimeout(() => {
        alert('');
      }, 5000);
    }

    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, [alert, message]);

  if (!message) {
    return null;
  }

  return createPortal(
    <div className={style.snackbar}>
      <p className={style.message}>{message}</p>
    </div>,
    // @ts-ignore types are the same :/
    document.querySelector('body')
  );
}

export default Snackbar;

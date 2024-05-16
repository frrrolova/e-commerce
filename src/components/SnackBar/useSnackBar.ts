import { useContext } from 'react';
import { SnackBarContext } from './SnackBarProvider';

export default function useSnackBar() {
  const snackBarContext = useContext(SnackBarContext);
  return snackBarContext;
}

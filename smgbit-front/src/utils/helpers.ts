import moment from 'moment';
import { NavKeys } from '../components/Menu/Menu.types';

export const formatadorDeData = (data: Date): string => {
  return moment(data).format('MM/DD/YYYY HH:mm:ss');
};

export const VerrificarRota = (localização: string) => {
  let rota = localização.split('/').pop();
  if (!rota) return NavKeys.UPLOAD;
  else if (rota === NavKeys.FRETE) return NavKeys.FRETE;
  else {
    return NavKeys.VISUALIZAR;
  }
};

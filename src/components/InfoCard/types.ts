import { InfoDataCard } from '../../types';

export interface InfoCardBtn {
  label: string;
  url: string;
}
export interface InfoCardProps {
  data: InfoDataCard;
  button?: InfoCardBtn;
}

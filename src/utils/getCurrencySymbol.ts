import { ConvertCurrency } from '../components/home';
import CONSTANTS from './constants';

function getCurrencySymbol(currency: ConvertCurrency) {
  return currency === 'eur' ? CONSTANTS.EUR_SYMBOL : CONSTANTS.USD_SYMBOL;
}

export default getCurrencySymbol;

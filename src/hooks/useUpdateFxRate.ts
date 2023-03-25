import React from 'react';
import { ConvertCurrency } from '../components/home';
import CONSTANTS from '../utils/constants';
import getFxUpdateNumber from '../utils/getFxUpdateNumber';

const useUpdateFxRate = (
  convertCurrency: ConvertCurrency,
  setVal: (val: string) => void
) => {
  const handleInterval = React.useCallback(() => {
    const intervalRef = setInterval(() => {
      const fxUpdateNumber = getFxUpdateNumber(
        convertCurrency === 'usd'
          ? CONSTANTS.FX_RATE_USD
          : CONSTANTS.FX_RATE_EUR
      );
      setVal(fxUpdateNumber.toFixed(2));
    }, 3000);
    return intervalRef;
  }, []);

  React.useEffect(() => {
    const destroyRef = handleInterval();

    return () => {
      clearInterval(destroyRef);
    };
  }, [convertCurrency]);
};

export default useUpdateFxRate;

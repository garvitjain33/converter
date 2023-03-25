import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch
} from '@chakra-ui/react';
import React from 'react';
import useUpdateFxRate from '../hooks/useUpdateFxRate';
import CONSTANTS from '../utils/constants';
import isMoreThanTwoPercentDiff from '../utils/isMoreThanTwoPercentDiff';
import Input from './input';
import Table, { Data } from './table';

export type ConvertCurrency = 'eur' | 'usd';

const Home = () => {
  const [fxRate, setFxRate] = React.useState(CONSTANTS.FX_RATE_USD.toFixed(2));
  const [value, setValue] = React.useState('0.00');
  const [result, setResult] = React.useState('0.00');
  const [convertCurrency, setConvertCurrency] =
    React.useState<ConvertCurrency>('usd');
  const [allowOverride, setAllowOverride] = React.useState(false);
  const [override, setOverride] = React.useState(fxRate);
  const [dataList, setDataList] = React.useState<Data[]>([]);

  useUpdateFxRate(convertCurrency, setFxRate);

  const handleValueChange = (val: string) => {
    setValue(val);
  };

  const handleConvertCurrecyChange = (val: string) => {
    const newCurr = val as ConvertCurrency;
    const newFx =
      newCurr === 'usd'
        ? CONSTANTS.FX_RATE_USD.toFixed(2)
        : CONSTANTS.FX_RATE_EUR.toFixed(2);
    setFxRate(newFx);
    setValue(result);
    setConvertCurrency(newCurr);
  };

  const handleSubmitForm = React.useCallback(
    (ev: React.FormEvent<HTMLDivElement>) => {
      ev.preventDefault();

      setDataList((prev) => [
        ...prev.slice(-4),
        {
          value,
          valueCurrency: convertCurrency === 'eur' ? 'usd' : 'eur',
          result,
          resultCurrency: convertCurrency,
          fxRate,
          isOverriden: allowOverride,
          overridenby: override
        }
      ]);
    },
    [value, result, fxRate, convertCurrency, allowOverride, override]
  );

  React.useEffect(() => {
    if (
      allowOverride &&
      !isMoreThanTwoPercentDiff(
        convertCurrency === 'usd'
          ? CONSTANTS.FX_RATE_USD
          : CONSTANTS.FX_RATE_EUR,
        parseFloat(override)
      )
    ) {
      setResult((parseFloat(override) * parseFloat(value)).toFixed(2));
      return;
    }
    setResult((parseFloat(fxRate) * parseFloat(value)).toFixed(2));
  }, [override, allowOverride, value]);

  return (
    <Stack
      as="form"
      my="6"
      mx="auto"
      maxW="container.lg"
      direction="column"
      alignItems="center"
      onSubmit={handleSubmitForm}
    >
      {/* FX Rate Field */}
      <FormControl my="6" mx="auto" maxW="container.sm">
        <FormLabel>Foreign Exchange (FX) Rate</FormLabel>
        <Input isDisabled value={fxRate} />
      </FormControl>
      {/* Value Field */}
      <FormControl my="6" mx="auto" maxW="container.sm">
        <FormLabel>Value</FormLabel>
        <Input
          value={value}
          onChange={handleValueChange}
          prefix={
            convertCurrency === 'usd'
              ? CONSTANTS.EUR_SYMBOL
              : CONSTANTS.USD_SYMBOL
          }
        />
      </FormControl>
      {/* Result Field */}
      <FormControl my="6" mx="auto" maxW="container.sm">
        <FormLabel>Result</FormLabel>
        <Input
          isDisabled
          value={result}
          prefix={
            convertCurrency === 'usd'
              ? CONSTANTS.USD_SYMBOL
              : CONSTANTS.EUR_SYMBOL
          }
        />
      </FormControl>
      {/* Currency Field */}
      <FormControl my="6" mx="auto" maxW="container.sm">
        <FormLabel>Currency</FormLabel>
        <RadioGroup
          onChange={handleConvertCurrecyChange}
          value={convertCurrency}
        >
          <Stack direction="row">
            <Radio colorScheme="teal" value="usd">
              USD
            </Radio>
            <Radio colorScheme="teal" value="eur">
              EUR
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {/* Allow Override Field */}
      <FormControl
        my="6"
        mx="auto"
        maxW="container.sm"
        display="flex"
        alignItems="center"
      >
        <FormLabel htmlFor="allow-override" my="0">
          Allow Override?
        </FormLabel>
        <Switch
          colorScheme="teal"
          checked={allowOverride}
          onChange={(ev) => {
            setAllowOverride(ev.target.checked);
            setOverride(fxRate);
          }}
          id="allow-override"
        />
      </FormControl>
      {/* Override Field */}
      {allowOverride ? (
        <FormControl my="6" mx="auto" maxW="container.sm">
          <FormLabel>Override</FormLabel>
          <Input value={override} onChange={setOverride} />
        </FormControl>
      ) : null}
      {/* Submit Button */}
      <Button my={4} colorScheme="teal" type="submit">
        Submit
      </Button>

      <Box mt={6}>
        <Table dataList={dataList} />
      </Box>
    </Stack>
  );
};

export default Home;

import React from 'react';
import {
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  HStack,
  Button
} from '@chakra-ui/react';

type InputProps = {
  prefix?: string;
} & NumberInputProps;

const Input: React.FC<InputProps> = ({ prefix = '', ...props }) => {
  return (
    <HStack>
      {prefix ? <Button disabled>{prefix}</Button> : null}
      <NumberInput step={0.01} precision={2} minW="100%" {...props}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};

export default Input;

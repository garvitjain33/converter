import React from 'react';
import {
  TableContainer,
  Table as ChakraTable,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from '@chakra-ui/react';
import { ConvertCurrency } from './home';
import getCurrencySymbol from '../utils/getCurrencySymbol';

export type Data = {
  value: string;
  valueCurrency: ConvertCurrency;
  result: string;
  resultCurrency: ConvertCurrency;
  fxRate: string;
  isOverriden: boolean;
  overridenby?: string;
};

type TableProps = {
  dataList: Data[];
};

const Table: React.FC<TableProps> = ({ dataList }) => {
  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <TableCaption>5 of the latest entries</TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric>Value</Th>
            <Th isNumeric>Result</Th>
            <Th isNumeric>FX Rate</Th>
            <Th>Overriden?</Th>
            <Th isNumeric>Overriden by</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataList.map((data) => {
            return (
              <Tr>
                <Td isNumeric>
                  {getCurrencySymbol(data.valueCurrency)} {data.value}
                </Td>
                <Td isNumeric>
                  {getCurrencySymbol(data.resultCurrency)} {data.result}
                </Td>
                <Td isNumeric>{data.fxRate}</Td>
                <Td>{data.isOverriden ? 'Yes' : 'No'}</Td>
                <Td isNumeric>{data.isOverriden ? data.overridenby : '-'}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;

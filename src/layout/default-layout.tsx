import React from 'react';
import Navbar from '../components/navbar';
import { Box, Flex } from '@chakra-ui/react';

const DefaultLayout: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  return (
    <Flex minH="full" direction="column">
      <Navbar />
      <Box flexGrow={1}>{children}</Box>
    </Flex>
  );
};

export default DefaultLayout;

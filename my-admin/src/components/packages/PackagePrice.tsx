import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Typography } from '@mui/material';
import { AttachMoney as PriceIcon } from '@mui/icons-material';
import { Package } from './types';


const PriceField: React.FC = () => {
  const record = useRecordContext<Package>();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="body2" fontWeight="bold" color="primary">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(record?.price || 0)}
      </Typography>
    </Box>
  );
};

export default PriceField;
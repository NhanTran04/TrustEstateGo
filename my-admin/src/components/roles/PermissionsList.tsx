import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Typography, Chip } from '@mui/material';
import { Role } from './types';

const PermissionsList: React.FC = () => {
  const record = useRecordContext<Role>();
  const permissions = record?.permissions || [];

  if (permissions.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        Không có quyền
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 400 }}>
      {permissions.slice(0, 3).map((permission) => (
        <Chip key={permission.id} label={permission.name} size="small" variant="outlined" color="info" />
      ))}
      {permissions.length > 3 && (
        <Chip label={`+${permissions.length - 3}`} size="small" variant="outlined" color="default" />
      )}
    </Box>
  );
};

export default PermissionsList;

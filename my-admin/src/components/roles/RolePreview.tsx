// components/Roles/components/RolePreview.tsx
import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Avatar, Typography, Chip } from '@mui/material';
import { AdminPanelSettings as RoleIcon } from '@mui/icons-material';
import { Role } from './types';

const getRoleColor = (name?: string) => {
  switch (name?.toLowerCase()) {
    case 'admin': return 'error';
    case 'staff': return 'warning';
    case 'user': return 'primary';
    default: return 'secondary';
  }
};

const RolePreview: React.FC = () => {
  const record = useRecordContext<Role>();
  if (!record) return null;

  const permissionCount = record.permissions?.length || 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Avatar sx={{ bgcolor: `${getRoleColor(record.name)}.main`, width: 32, height: 32 }}>
        <RoleIcon fontSize="small" />
      </Avatar>
      <Box>
        <Typography variant="body2" fontWeight={600}>
          {record.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 150 }}>
            {record.description}
          </Typography>
          {permissionCount > 0 && (
            <Chip
              label={`${permissionCount} quyền`}
              size="small"
              variant="outlined"
              color="info"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RolePreview;

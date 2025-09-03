// components/Users/components/UserInfoCard.tsx
import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Stack, Typography } from '@mui/material';
import { Email, Phone, LocationOn, Cake } from '@mui/icons-material';
import { User } from './types';
import { UserAvatar } from './UserAvatar';

export const UserInfoCard: React.FC = () => {
    const record = useRecordContext<User>();

    return (
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Stack spacing={2}>
                {/* Avatar + tên */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <UserAvatar />
                    <Box>
                        <Typography variant="h6">
                            {`${record?.firstName || ''} ${record?.lastName || ''}`.trim()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            @{record?.username}
                        </Typography>
                    </Box>
                </Stack>

                {/* Thông tin liên hệ */}
                <Stack spacing={1}>
                    {record?.email && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Email fontSize="small" color="action" />
                            <Typography variant="body2">{record.email}</Typography>
                        </Stack>
                    )}

                    {record?.phone && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Phone fontSize="small" color="action" />
                            <Typography variant="body2">{record.phone}</Typography>
                        </Stack>
                    )}

                    {record?.address && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocationOn fontSize="small" color="action" />
                            <Typography variant="body2">{record.address}</Typography>
                        </Stack>
                    )}

                    {record?.birthday && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Cake fontSize="small" color="action" />
                            <Typography variant="body2">{record.birthday}</Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

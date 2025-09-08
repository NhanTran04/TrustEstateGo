// components/Roles/RoleShow.tsx
import React from 'react';
import { Show, useRecordContext } from 'react-admin';
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { AdminPanelSettings, Description } from '@mui/icons-material';
import PermissionsDisplay from './PermissionsDisplay';
import { Role } from './types';

const getRoleColor = (name?: string) => {
    switch (name?.toLowerCase()) {
        case 'admin': return 'error';
        case 'staff': return 'warning';
        case 'user': return 'primary';
        default: return 'secondary';
    }
};

const RoleShowContent: React.FC = () => {
    const record = useRecordContext<Role>();
    if (!record) return null;

    return (
        <Card sx={{ maxWidth: 800, mb: 2 }}>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            sx={{ bgcolor: `${getRoleColor(record.name)}.main`, width: 60, height: 60 }}
                        >
                            <AdminPanelSettings />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                {record.name}
                            </Typography>
                            <Typography variant="caption" color="text.primary" fontSize={12}>
                                ID : {record.id}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Description */}
                    {record.description && (
                        <Box>
                            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Description fontSize="small" />
                                Mô tả
                            </Typography>
                            <Box sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                borderRadius: 1,
                                borderLeft: '4px solid',
                                borderLeftColor: `${getRoleColor(record.name)}.main`
                            }}>
                                <Typography variant="body2">{record.description}</Typography>
                            </Box>
                        </Box>
                    )}

                    <Divider />
                    <PermissionsDisplay permissions={record.permissions} />
                </Stack>
            </CardContent>
        </Card>
    );
};

export const RoleShow: React.FC = () => (
    <Show>
        <RoleShowContent />
    </Show>
);

import React from 'react';
import { useRecordContext } from 'react-admin';
import { Avatar } from '@mui/material';
import { User } from './types';  // 👈 import interface dùng chung

export const UserAvatar: React.FC = () => {
    const record = useRecordContext<User>();

    if (record?.avatar) {
        return <Avatar src={record.avatar} sx={{ width: 40, height: 40 }} />;
    }

    return (
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
            {record?.firstName?.charAt(0)?.toUpperCase() || 'U'}
        </Avatar>
    );
};

import React, { useEffect } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    minLength,
    useRecordContext,
    useInput,
    useGetList,
} from 'react-admin';
import {
    Box,
    Typography,
    Stack,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
    Chip,
    Paper,
} from '@mui/material';
import { Security as SecurityIcon, VpnKey as PermissionIcon } from '@mui/icons-material';

// Debug nhỏ để in record
const DebugRole = () => {
    const record = useRecordContext();
    console.log('Record in Edit form:', record);
    return null;
};

// Kiểu permission
interface Permission {
    id: number;
    name: string;
    // nếu có description bạn có thể thêm vào đây
    description?: string;
}

// Component input tùy chỉnh (dùng useInput + useGetList)
const GroupedPermissionsInput: React.FC<{ source: string }> = ({ source }) => {
    // useInput giúp bind vào form (react-final-form)
    const { field } = useInput({ source });

    // chuẩn hóa giá trị hiện tại thành array id number
    const rawValue = field.value ?? [];
    const selectedIds: number[] = Array.isArray(rawValue)
        ? rawValue.map((v: any) => (typeof v === 'object' ? v.id : Number(v)))
        : [];

    // Nếu backend trả về permissions là object[] ban đầu, normalize một lần khi mount
    useEffect(() => {
        if (Array.isArray(rawValue) && rawValue.length > 0 && typeof rawValue[0] === 'object') {
            const ids = rawValue.map((p: any) => p.id);
            field.onChange(ids);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Lấy toàn bộ permissions từ API (1 request, perPage lớn)
    const { data, isLoading } = useGetList<Permission>('permissions', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'name', order: 'ASC' },
        filter: {},
    });

    const choices: Permission[] = data ? Object.values(data) as Permission[] : [];

    // nhóm theo prefix trước dấu "_"
    const grouped: Record<string, Permission[]> = choices.reduce((acc, perm) => {
        const [prefix] = (perm.name || '').split('_');
        if (!acc[prefix]) acc[prefix] = [];
        acc[prefix].push(perm);
        return acc;
    }, {} as Record<string, Permission[]>);

    const handleToggle = (id: number, checked: boolean) => {
        if (checked) {
            field.onChange(Array.from(new Set([...selectedIds, id])));
        } else {
            field.onChange(selectedIds.filter((i) => i !== id));
        }
    };

    if (isLoading) return <Typography>Đang tải quyền…</Typography>;

    if (!choices.length)
        return (
            <Typography variant="body2" color="text.secondary">
                Không có quyền nào.
            </Typography>
        );

    return (
        <Box sx={{ mt: 1 }}>
            {Object.entries(grouped).map(([group, items]) => (
                <Paper
                    key={group}
                    elevation={1}
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#fafafa',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                            mb: 1,
                            color: 'primary.main',
                        }}
                    >
                        <PermissionIcon fontSize="small" sx={{ mr: 1 }} />
                        {group}
                    </Typography>

                    <Divider sx={{ mb: 1 }} />

                    <FormGroup row sx={{ ml: 1 }}>
                        {items.map((perm) => (
                            <FormControlLabel
                                key={perm.id}
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={selectedIds.includes(perm.id)}
                                        onChange={(e) => handleToggle(perm.id, e.target.checked)}
                                    />
                                }
                                label={
                                    <Chip
                                        label={perm.name.replace(`${group}_`, '')}
                                        size="small"
                                        variant="outlined"
                                        color="info"
                                        sx={{ fontSize: 12 }}
                                    />
                                }
                            />
                        ))}
                    </FormGroup>
                </Paper>
            ))}
        </Box>
    );
};

// Form chỉnh sửa vai trò
export const RoleEdit: React.FC = () => (
    <Edit redirect="list">
        <SimpleForm>
            <DebugRole />
            <Stack direction="row" spacing={4} alignItems="flex-start">
                {/* Cột trái */}
                <Box sx={{ flex: 1, maxWidth: 500 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        color="primary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                    >
                        <SecurityIcon />
                        Chỉnh sửa vai trò
                    </Typography>

                    <TextInput
                        source="name"
                        label="Tên vai trò"
                        validate={[required(), minLength(2)]}
                        fullWidth
                        helperText="Tên vai trò (ví dụ: Admin, User, Moderator)"
                    />
                    <TextInput
                        source="description"
                        label="Mô tả"
                        validate={[minLength(5)]}
                        multiline
                        rows={4}
                        fullWidth
                        helperText="Mô tả về quyền hạn và trách nhiệm của vai trò này"
                    />
                </Box>

                {/* Cột phải - dùng input tùy chỉnh (không dùng ReferenceArrayInput) */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        Quyền hạn
                    </Typography>

                    {/* Gắn source="permissions" để useInput() bind đúng field */}
                    <GroupedPermissionsInput source="permissions" />
                </Box>
            </Stack>
        </SimpleForm>
    </Edit>
);

import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
    minLength,
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
import {
    Security as SecurityIcon,
    VpnKey as PermissionIcon,
} from '@mui/icons-material';

// 📦 Kiểu permission
interface Permission {
    id: number;
    name: string;
    description?: string;
}

// 🧩 Input hiển thị quyền theo nhóm prefix
const GroupedPermissionsInput: React.FC<{ source: string }> = ({ source }) => {
    const { field } = useInput({ source });
    const selectedIds: number[] = Array.isArray(field.value)
        ? field.value.map((v: any) => (typeof v === 'object' ? v.id : Number(v)))
        : [];

    const { data, isLoading } = useGetList<Permission>('permissions', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'name', order: 'ASC' },
    });

    if (isLoading) return <Typography>Đang tải quyền…</Typography>;
    const choices = data ? (Object.values(data) as Permission[]) : [];

    // Nhóm quyền theo prefix (vd: user_, category_)
    const grouped: Record<string, Permission[]> = choices.reduce(
        (acc, perm) => {
            const [prefix] = (perm.name || '').split('_');
            if (!acc[prefix]) acc[prefix] = [];
            acc[prefix].push(perm);
            return acc;
        },
        {} as Record<string, Permission[]>
    );

    const handleToggle = (id: number, checked: boolean) => {
        if (checked) field.onChange([...selectedIds, id]);
        else field.onChange(selectedIds.filter((i) => i !== id));
    };

    if (!choices.length)
        return <Typography variant="body2">Không có quyền nào.</Typography>;

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
                                        onChange={(e) =>
                                            handleToggle(perm.id, e.target.checked)
                                        }
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

// ✨ Form tạo mới vai trò
export const RoleCreate: React.FC = () => (
    <Create redirect="list">
        <SimpleForm>
            <Stack direction="row" spacing={4} alignItems="flex-start">
                {/* 🧩 Cột trái - Thông tin vai trò */}
                <Box sx={{ flex: 1, maxWidth: 500 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        color="primary"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <SecurityIcon />
                        Tạo vai trò mới
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

                {/* 🧩 Cột phải - Quyền hạn */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                    >
                        Quyền hạn
                    </Typography>
                    <GroupedPermissionsInput source="permissions" />
                </Box>
            </Stack>
        </SimpleForm>
    </Create>
);

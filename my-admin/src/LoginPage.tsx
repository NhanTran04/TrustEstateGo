// src/LoginPage.tsx
import React, { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

const LoginPage: React.FC = () => {
    const login = useLogin();
    const notify = useNotify();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ username, password }).catch(() =>
            notify("Đăng nhập thất bại", { type: "warning" })
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                bgcolor: "grey.100",
            }}
        >
            <Card sx={{ width: 400, p: 2 }}>
                <CardContent sx={{ margin: "15px" }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Đăng nhập hệ thống
                    </Typography>
                    <form onSubmit={submit}>
                        <TextField
                            label="Tên đăng nhập"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Mật khẩu"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Đăng nhập
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;

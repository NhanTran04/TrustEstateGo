import React, { useState, useEffect } from 'react';
import { User, Shield, Camera, CheckCircle, Star, MessageCircle, Bell, Award, Edit } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { authApi, endpoints } from '../services/api';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

const Profile = () => {
    const { user } = useAuth();

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: true,
        birthday: "",
        avatar: null,
        address: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone || '',
                gender: user.gender === true,
                birthday: user.birthday || '',
                avatar: user.avatar,
                address: user.address,
            });
            setPreview(user.avatar);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenderChange = (value) => {
        setFormData(prev => ({ ...prev, gender: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFormData(prev => ({ ...prev, avatar: file }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (let [key, value] of Object.entries(formData)) {
            if (key !== "avatar") {
                form.append(key, value);
            }
        }

        if (formData.avatar instanceof File) {
            form.append("avatar", formData.avatar);
        } else {
            try {
                const response = await fetch(user.avatar);
                const blob = await response.blob();
                const fileFromUrl = new File([blob], "avatar.jpg", { type: blob.type });
                form.append("file", fileFromUrl);
            } catch (error) {
                console.error("Lỗi khi tải ảnh từ URL:", error);
            }
        }

        try {
            setLoading(true);
            const res = await authApi().put(`${endpoints.users}`, form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            if (res.status === 200) {
                alert("Cập nhật thành công!");
            } else {
                alert("Có lỗi xảy ra khi cập nhật.");
            }
        } catch (err) {
            console.error("Lỗi update user", err);
        } finally {
            setLoading(false);
        }
    };

    // 🔒 Tránh lỗi khi user chưa load xong
    if (!user || !formData.username) return <p>Đang tải thông tin người dùng...</p>;

    return (
        <Container className="m-5 bg-white p-5 mx-auto" style={{ width: "80%" }}>
            <h4>Hồ Sơ Của Tôi</h4>
            <hr />
            <Row>
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Tên đăng nhập</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    plaintext
                                    value={formData.username}
                                    readOnly

                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Họ</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Tên</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control plaintext readOnly value={formData.email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Số điện thoại</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Giới tính</Form.Label>
                            <Col sm={9} className='mt-2'>
                                <Form.Check
                                    inline label="Nam"
                                    name="gender"
                                    type="radio"
                                    checked={formData.gender === true}
                                    onChange={() => handleGenderChange(true)}
                                />
                                <Form.Check
                                    inline label="Nữ"
                                    name="gender"
                                    type="radio"
                                    checked={formData.gender === false}
                                    onChange={() => handleGenderChange(false)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm={3}>Ngày sinh</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="link"
                            className="mb-2 text-white text-decoration-none"
                            style={{ width: "100px", background: "repeating-linear-gradient(25deg, black, cyan 95px)" }}
                            disabled={loading}
                        >
                            {loading ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </Form>
                </Col>

                <Col md={4} className="text-center">
                    <Image
                        src={preview}
                        roundedCircle
                        className="mb-3"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <Form.Group controlId="formFile" className="mb-2">
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    </Form.Group>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                        Dung lượng tối đa 1MB<br />
                        Định dạng: .JPEG, .PNG
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
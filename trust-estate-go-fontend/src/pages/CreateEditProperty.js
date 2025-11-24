import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authApi, endpoints, api } from '../services/api.js';
import useAuth from '../hooks/useAuth';
import AddressAutocomplete from '../components/AddressAutocomplete.js';

const CreateEditProperty = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);

    const isEditMode = Boolean(propertyId);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        categoryId: '',
        expireAt: '',
        // propertyType: '',
        area: '',
        bedroom: '',
        // interior: '',
        isActive: true
    });

    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [errors, setErrors] = useState({});

    // Load categories and property types
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [categoriesRes, propertyTypesRes] = await Promise.all([
                    api.get(endpoints.categories),
                    api.get(endpoints.propertyTypes)
                ]);

                setCategories(categoriesRes.data.result || []);
                setPropertyTypes(propertyTypesRes.data.result || []);
                console.log('property type: ', propertyTypesRes.data.result);
            } catch (error) {
                console.error('Error loading data:', error);
                alert('Không thể tải dữ liệu');
            }
        };

        loadInitialData();
    }, []);

    // Load property data for editing
    useEffect(() => {
        if (isEditMode) {
            const loadProperty = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`${endpoints.properties}/${propertyId}`);
                    const property = response.data.result;

                    setFormData({
                        title: property.title || '',
                        description: property.description || '',
                        price: property.price || '',
                        location: property.location || '',
                        categoryId: property.categoryId || '',
                        expireAt: property.expireAt || '',
                        propertyType: property.propertyType?.name || '',
                        area: property.area || '',
                        bedroom: property.bedroom || '',
                        // interior: property.interior || '',
                        isActive: property.isActive || true
                    });
                } catch (error) {
                    console.error('Error loading property:', error);
                    alert('Không thể tải thông tin bài đăng');
                    navigate('/my-properties');
                } finally {
                    setLoading(false);
                }
            };

            loadProperty();
        }
    }, [isEditMode, propertyId, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10) {
            alert('Tối đa 10 ảnh');
            return;
        }

        setSelectedImages(files);

        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreview(previews);
    };

    const removeImage = (index) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        const newPreviews = imagePreview.filter((_, i) => i !== index);

        setSelectedImages(newImages);
        setImagePreview(newPreviews);
    };

    const validateAddressOSM = async (address) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
            const data = await response.json();
            return data.length > 0;
        } catch (error) {
            console.error('Error validating address:', error);
            return false;
        }
    };

    const validateForm = async () => {
        const newErrors = {};

        if (!formData.title) newErrors.title = 'Tiêu đề là bắt buộc';
        if (!formData.description) newErrors.description = 'Mô tả là bắt buộc';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Giá phải lớn hơn 0';
        if (!formData.location) newErrors.location = 'Địa điểm là bắt buộc';
        if (!formData.categoryId) newErrors.categoryId = 'Vui lòng chọn danh mục';
        if (!formData.propertyType) newErrors.propertyType = 'Vui lòng chọn loại BDS';

        if (formData.location) {
            const isValidAddress = await validateAddressOSM(formData.location);
            if (!isValidAddress) newErrors.location = 'Địa chỉ không hợp lệ hoặc không tìm thấy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toBackendDateTime = (value) => {
        if (!value) return null;
        if (value.length === 16) value += ":00";
        return value.replace("T", " ");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        try {
            setLoading(true);

            const submitData = {
                ...formData,
                expireAt: toBackendDateTime(formData.expireAt)
            };
            let createdPropertyId = propertyId;


            if (isEditMode) {
                const res = await authApi().put(
                    `${endpoints.properties}/${propertyId}`,
                    submitData
                );

                // Nếu có hình ảnh -> upload
                if (selectedImages.length > 0) {
                    const imagesForm = new FormData();
                    selectedImages.forEach(img => imagesForm.append("images", img));

                    await authApi().post(
                        `${endpoints.properties}/${propertyId}/images`,
                        imagesForm,
                        { headers: { "Content-Type": "multipart/form-data" } }
                    );
                }

                alert("Cập nhật bài đăng thành công!");
            } else {
                const res = await authApi().post(endpoints.properties, submitData);

                createdPropertyId = res.data.result.id;

                if (selectedImages.length > 0) {
                    const imagesForm = new FormData();
                    selectedImages.forEach(img => imagesForm.append("images", img));

                    await authApi().post(
                        `${endpoints.properties}/${createdPropertyId}/images`,
                        imagesForm,
                        { headers: { "Content-Type": "multipart/form-data" } }
                    );
                }

                alert("Tạo bài đăng thành công!");
            }

            navigate('/my-properties');
        } catch (error) {
            console.error('Error saving property:', error);
            alert(error.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                        {/* Header */}
                        <div className="text-center mb-5">
                            <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle mb-3"
                                style={{ width: '80px', height: '80px' }}>
                                <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                                </svg>
                            </div>
                            <h1 className="h2 fw-bold text-dark mb-2">
                                {isEditMode ? 'Cập nhật bài đăng' : 'Tạo bài đăng mới'}
                            </h1>
                            <p className="text-muted">
                                {isEditMode ? 'Chỉnh sửa thông tin bất động sản của bạn' : 'Chia sẻ bất động sản với hàng ngàn khách hàng tiềm năng'}
                            </p>
                        </div>

                        <div className="card border-0 shadow-lg">
                            <div className="card-body p-4 p-md-5">
                                <form onSubmit={handleSubmit}>
                                    {/* Basic Information */}
                                    <div className="mb-5">
                                        <h5 className="text-primary mb-4 d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" >
                                                    <i class="fa fa-home" aria-hidden="true"></i>

                                                </svg>
                                            </div>
                                            Thông tin cơ bản
                                        </h5>

                                        {/* Tiêu đề */}
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Tiêu đề <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg ${errors.title ? 'is-invalid' : ''}`}
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                            />
                                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                        </div>

                                        {/* Mô tả */}
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Mô tả chi tiết <span className="text-danger">*</span></label>
                                            <textarea
                                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows="5"
                                                placeholder="Mô tả chi tiết về vị trí, thiết kế, tiện ích xung quanh..."
                                            />
                                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}

                                        </div>

                                        {/* Giá và Địa điểm */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Giá bán <span className="text-danger">*</span></label>
                                                    <div className="input-group input-group-lg">
                                                        <input
                                                            type="number"
                                                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                            name="price"
                                                            value={formData.price}
                                                            onChange={handleInputChange}

                                                            min={1000}
                                                        />
                                                        <span className="input-group-text bg-primary text-white">VNĐ</span>
                                                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Địa chỉ <span className="text-danger">*</span></label>
                                                    <AddressAutocomplete
                                                        value={formData.location}
                                                        onChange={(value) =>
                                                            setFormData((prev) => ({ ...prev, location: value }))
                                                        }
                                                    />
                                                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="mb-5">
                                        <h5 className="text-primary mb-4 d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                                </svg>
                                            </div>
                                            Thông tin bất động sản
                                        </h5>

                                        {/* Category & Property Type */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Danh mục <span className="text-danger">*</span></label>
                                                    <select
                                                        className={`form-select form-select-lg ${errors.categoryId ? 'is-invalid' : ''}`}
                                                        name="categoryId"
                                                        value={formData.categoryId}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">-- Chọn danh mục --</option>
                                                        {categories.map(category => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Loại hình bất động sản <span className="text-danger">*</span></label>
                                                    <select
                                                        className={`form-select form-select-lg ${errors.propertyType ? 'is-invalid' : ''}`}
                                                        name="propertyType"
                                                        value={formData.propertyType}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">-- Chọn loại hình --</option>
                                                        {propertyTypes.map(type => (
                                                            <option key={type.value} value={type.value}>
                                                                {type.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.propertyType && <div className="invalid-feedback">{errors.propertyType}</div>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Property Specs */}
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Diện tích (m²)</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="area"
                                                            value={formData.area}
                                                            onChange={handleInputChange}
                                                            placeholder="80"
                                                            min={1}
                                                        />
                                                        <span className="input-group-text">m²</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-4">
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Số phòng ngủ</label>
                                                    <select
                                                        className="form-select"
                                                        name="bedroom"
                                                        value={formData.bedroom}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Chọn số phòng</option>
                                                        <option value="1">1 phòng ngủ</option>
                                                        <option value="2">2 phòng ngủ</option>
                                                        <option value="3">3 phòng ngủ</option>
                                                        <option value="4">4 phòng ngủ</option>
                                                        <option value="5">5+ phòng ngủ</option>
                                                    </select>
                                                </div>
                                            </div> */}
                                            <div className="col-md-4">
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Ngày hết hạn</label>
                                                    <input
                                                        type="datetime-local"
                                                        className="form-control"
                                                        name="expireAt"
                                                        value={formData.expireAt}
                                                        min={new Date().toISOString().slice(0, 16)} // yyyy-MM-ddTHH:mm
                                                        step="1"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Images */}
                                    <div className="mb-5">
                                        <h5 className="text-primary mb-4 d-flex align-items-center">
                                            Hình ảnh bất động sản
                                        </h5>

                                        <div className="border border-2 border-dashed rounded-3 p-1 text-center mb-3"
                                            style={{ borderColor: '#e3f2fd' }}>
                                            <input
                                                type="file"
                                                className="form-control d-none"
                                                id="imageUpload"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                            <label htmlFor="imageUpload" className="d-block" style={{ cursor: 'pointer' }}>
                                                <div className="text-primary mb-3">
                                                    <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                                                    </svg>
                                                </div>
                                                <h6 className="fw-bold">Tải lên hình ảnh</h6>
                                                <p className="text-muted small mb-0">
                                                    Kéo thả hoặc click để chọn ảnh<br />
                                                    Tối đa 10 ảnh • JPG, PNG, GIF
                                                </p>
                                            </label>
                                        </div>

                                        {/* Image Preview */}
                                        {imagePreview.length > 0 && (
                                            <div className="row g-3">
                                                {imagePreview.map((url, index) => (
                                                    <div key={index} className="col-6 col-md-4 col-lg-3">
                                                        <div className="position-relative">
                                                            <img
                                                                src={url}
                                                                alt={`Preview ${index + 1}`}
                                                                className="img-fluid rounded-3 shadow-sm"
                                                                style={{ aspectRatio: '4/3', objectFit: 'cover' }}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
                                                                onClick={() => removeImage(index)}
                                                                style={{ width: '32px', height: '32px', padding: '0' }}
                                                            >
                                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Settings */}
                                    {/* <div className="mb-5">
                                        <h5 className="text-info mb-4 d-flex align-items-center">
                                            <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            </div>
                                            Cài đặt hiển thị
                                        </h5>

                                        <div className="card bg-light border-0">
                                            <div className="card-body">
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="isActive"
                                                        name="isActive"
                                                        checked={formData.isActive}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label className="form-check-label fw-semibold" htmlFor="isActive">
                                                        Kích hoạt bài đăng
                                                    </label>
                                                    <div className="form-text">
                                                        Bài đăng sẽ hiển thị công khai và có thể tìm kiếm được
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* Submit Buttons */}
                                    <div className="d-flex flex-column flex-sm-row gap-3 pt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg px-5 flex-grow-1"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" />
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="me-2">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                    </svg>
                                                    {isEditMode ? 'Cập nhật bài đăng' : 'Đăng tin'}
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg px-4"
                                            onClick={() => navigate('/my-properties')}
                                            disabled={loading}
                                        >
                                            Hủy bỏ
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEditProperty;
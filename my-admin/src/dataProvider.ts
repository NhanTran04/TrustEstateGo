// src/dataProvider.ts
import simpleRestProvider from "ra-data-simple-rest";

const apiUrl = import.meta.env.VITE_SIMPLE_REST_URL;
const defaultDataProvider = simpleRestProvider(apiUrl);

export const dataProvider = {
  ...defaultDataProvider,

  // CREATE
  create: async (resource: string, params: any) => {
    if (resource === "properties") {
      const formData = new FormData();

      Object.entries(params.data).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file: any) => {
            if (file.rawFile) {
              formData.append("images", file.rawFile);
            }
          });
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString().slice(0, 19).replace("T", " "));
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      console.log("Create FormData entries:", Array.from(formData.entries()));

      const response = await fetch(`${apiUrl}/properties`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Create error:", text);
        throw new Error(`Create property failed: ${text}`);
      }

      const data = await response.json();
      return { data };
    }

    ///của Create Review
    if (resource === "reviews") {
      // const sellerId = params.meta?.sellerId;
      const { sellerId } = params.meta || {};
      if (!sellerId) throw new Error("Missing sellerId in params.meta");

      const response = await fetch(`${apiUrl}/review-seller/sellers/${sellerId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Create review failed: ${text}`);
      }

      const data = await response.json();
      return { data };
    }


    return defaultDataProvider.create(resource, params);
  },

  update: async (resource: string, params: any) => {
    if (resource === "properties") {
      console.log("Update params received:", params);

      // Kiểm tra xem có file mới không
      const hasNewImages = params.data.images &&
        Array.isArray(params.data.images) &&
        params.data.images.some((file: any) => file.rawFile);

      if (hasNewImages) {
        // Có file mới -> dùng FormData và multipart
        const formData = new FormData();

        Object.entries(params.data).forEach(([key, value]) => {
          if (key === "images" && Array.isArray(value)) {
            value.forEach((file: any) => {
              if (file.rawFile) {
                formData.append("images", file.rawFile);
              }
            });
          } else if (value instanceof Date) {
            formData.append(key, value.toISOString().slice(0, 19).replace("T", " "));
          } else if (value !== null && value !== undefined) {
            formData.append(key, String(value));
          }
        });

        console.log("Update with FormData entries:", Array.from(formData.entries()));

        const response = await fetch(`${apiUrl}/properties/${params.id}`, {
          method: "PUT",
          body: formData,
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Update with FormData error:", text);
          throw new Error(`Update property failed: ${text}`);
        }

        const data = await response.json();
        return { data };
      } else {
        // Không có file mới -> dùng JSON
        const { images, ...dataWithoutImages } = params.data;

        // Xử lý date fields
        Object.keys(dataWithoutImages).forEach(key => {
          if (dataWithoutImages[key] instanceof Date) {
            dataWithoutImages[key] = dataWithoutImages[key].toISOString().slice(0, 19).replace("T", " ");
          }
        });

        console.log("Update without images:", dataWithoutImages);

        const response = await fetch(`${apiUrl}/properties/${params.id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataWithoutImages),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Update without images error:", text);
          throw new Error(`Update property failed: ${text}`);
        }

        const data = await response.json();
        return { data };
      }
    }

    return defaultDataProvider.update(resource, params);
  },

  getList: async (resource: string, params: any) => {
    // Sellers list
    if (resource === "sellers") {
      const query = new URLSearchParams();

      // keyword search (React-Admin filter gửi trong params.filter)
      if (params.filter?.q) {
        query.append("keyword", params.filter.q);
      }

      // phân trang
      const { page, perPage } = params.pagination;
      query.append("page", (page - 1).toString());  // Spring pageable: zero-based
      query.append("size", perPage.toString());

      // // sort

      // if (params.sort?.field) {
      //   query.append("sort", `${params.sort.field},${params.sort.order.toLowerCase()}`);
      // }

      const url = `${apiUrl}/review-seller/sellers?${query.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch sellers");

      const total = res.headers.get("Content-Range")?.split("/").pop() || "0";
      const data = await res.json();

      return {
        data,
        total: parseInt(total, 10),
      };
    }

    // Reviews of a seller
    if (resource === "reviews") {
      const sellerId = params.meta?.sellerId;
      if (!sellerId) throw new Error("Missing sellerId in params.meta");

      const { page, perPage } = params.pagination;
      const query = new URLSearchParams();
      query.append("page", (page - 1).toString());
      query.append("size", perPage.toString());

      const url = `${apiUrl}/review-seller/sellers/${sellerId}/reviews?${query.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch reviews");

      const total = res.headers.get("Content-Range")?.split("/").pop() || "0";
      const data = await res.json();

      return {
        data,
        total: parseInt(total, 10),
      };
    }

    if (resource === "users") {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;

      const kw = params.filter?.q || "";

      // ép mọi giá trị về string
      const query = new URLSearchParams({
        kw,
        page: String(page - 1), // Spring Data dùng 0-based page
        size: String(perPage),
        sort: `${field},${order.toLowerCase()}`,
      });

      const url = `${apiUrl}/${resource}?${query.toString()}`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const json = await res.json();
      const total = parseInt(res.headers.get("Content-Range")?.split("/")?.[1] || "0", 10);

      return {
        data: json,
        total,
      };
    }

    return defaultDataProvider.getList(resource, params);
  },

  getOne: async (resource: string, params: any) => {
    if (resource === "reviews") {
      const { id, meta } = params;
      const sellerId = meta?.sellerId;
      if (!sellerId) throw new Error("Missing sellerId in params.meta");

      const url = `${apiUrl}/review-seller/sellers/${sellerId}/reviews/${id}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch review");

      const data = await res.json();
      return { data };
    }

    return defaultDataProvider.getOne(resource, params);
  },
};
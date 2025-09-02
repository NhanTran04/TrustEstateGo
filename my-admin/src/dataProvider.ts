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
  }
};
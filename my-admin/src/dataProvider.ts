import simpleRestProvider from "ra-data-simple-rest";
import { httpClient } from "./HttpClient";

const apiUrl = import.meta.env.VITE_SIMPLE_REST_URL;
// const staffUrl = "http://localhost:8080/trustestatego/api/staff";
const staffUrl = "https://trustestatego.onrender.com/trustestatego/api/staff";
const defaultDataProvider = simpleRestProvider(apiUrl, httpClient);

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

      const response = await httpClient(`${apiUrl}/properties`, {
        method: "POST",
        body: formData,
      });

      return { data: response.json };
    }

    if (resource === "reviews") {
      const { sellerId } = params.meta || {};
      if (!sellerId) throw new Error("Missing sellerId in params.meta");

      const response = await httpClient(
        `${apiUrl}/review-seller/sellers/${sellerId}/reviews`,
        {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(params.data),
        }
      );

      return { data: response.json };
    }

    if (resource === "users") {
      const formData = new FormData();

      Object.entries(params.data).forEach(([key, value]) => {
        if (key === "avatar") {
          const file = (value as any)?.rawFile;
          if (file instanceof File) {
            formData.append("avatar", file);
          }
          return;
        }

        if (key === "birthday" && value instanceof Date) {
          formData.append(key, value.toISOString().slice(0, 10));
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString().slice(0, 19).replace("T", " "));
        } else if (value !== null && value !== undefined && value !== "") {
          formData.append(key, String(value));
        }
      });

      const response = await httpClient(`${apiUrl}/users`, {
        method: "POST",
        body: formData,
      });

      return { data: response.json };
    }

    return defaultDataProvider.create(resource, params);
  },

  // UPDATE
  update: async (resource: string, params: any) => {
    if (resource === "properties") {
      const hasNewImages =
        params.data.images &&
        Array.isArray(params.data.images) &&
        params.data.images.some((file: any) => file.rawFile);

      if (hasNewImages) {
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

        const response = await httpClient(`${apiUrl}/properties/${params.id}`, {
          method: "PUT",
          body: formData,
        });

        return { data: response.json };
      } else {
        const { images, ...dataWithoutImages } = params.data;

        Object.keys(dataWithoutImages).forEach((key) => {
          if (dataWithoutImages[key] instanceof Date) {
            dataWithoutImages[key] = dataWithoutImages[key]
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
          }
        });

        const response = await httpClient(`${apiUrl}/properties/${params.id}`, {
          method: "PUT",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(dataWithoutImages),
        });

        return { data: response.json };
      }
    }

    if (resource === "users") {
      const formData = new FormData();

      Object.entries(params.data).forEach(([key, value]) => {
        if (key === "avatar") {
          const file = (value as any)?.rawFile;
          if (file instanceof File) {
            formData.append("avatar", file);
          }
        } else if (key === "birthday" && value instanceof Date) {
          formData.append(key, value.toISOString().slice(0, 10)); // yyyy-MM-dd
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString().slice(0, 19).replace("T", " "));
        } else if (value !== null && value !== undefined && value !== "") {
          formData.append(key, String(value));
        }
      });

      const response = await httpClient(`${apiUrl}/users/${params.id}`, {
        method: "PATCH",
        body: formData,
      });

      return { data: response.json };
    }
    if (resource === "reports") {
      const url = `${staffUrl}/reports/${params.id}`;
      const response = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: response.json };
    }

    return defaultDataProvider.update(resource, params);

  },

  // GET LIST
  getList: async (resource: string, params: any) => {
    if (resource === "sellers") {
      const query = new URLSearchParams();

      if (params.filter?.q) {
        query.append("keyword", params.filter.q);
      }

      const { page, perPage } = params.pagination;
      query.append("page", (page - 1).toString());
      query.append("size", perPage.toString());

      const url = `${apiUrl}/review-seller/sellers?${query.toString()}`;

      const response = await httpClient(url);

      const total = response.headers
        .get("Content-Range")
        ?.split("/")
        .pop() || "0";

      return {
        data: response.json,
        total: parseInt(total, 10),
      };
    }

    if (resource === "reviews") {
      const sellerId = params.meta?.sellerId;
      if (!sellerId) throw new Error("Missing sellerId in params.meta");

      const { page, perPage } = params.pagination;
      const query = new URLSearchParams();
      query.append("page", (page - 1).toString());
      query.append("size", perPage.toString());

      const url = `${apiUrl}/review-seller/sellers/${sellerId}/reviews?${query.toString()}`;

      const response = await httpClient(url);

      const total = response.headers
        .get("Content-Range")
        ?.split("/")
        .pop() || "0";

      return {
        data: response.json,
        total: parseInt(total, 10),
      };
    }

    if (resource === "users" || resource === "permissions") {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;

      const kw = params.filter?.q || "";

      const query = new URLSearchParams({
        kw,
        page: String(page),
        size: String(perPage),
        sort: `${field},${order.toLowerCase()}`,
      });

      const url = `${apiUrl}/${resource}?${query.toString()}`;

      const response = await httpClient(url, {
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      const total = parseInt(
        response.headers.get("Content-Range")?.split("/")?.[1] || "0",
        10
      );

      return {
        data: response.json,
        total,
      };
    }

    if (resource === "reports") {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;

      const query = new URLSearchParams({
        page: String(page - 1),
        size: String(perPage),
        sort: `${field},${order.toLowerCase()}`,
      });

      const url = `${staffUrl}/reports?${query.toString()}`;
      const response = await httpClient(url);

      const total = parseInt(
        response.headers.get("Content-Range")?.split("/")?.[1] || "0",
        10
      );

      return {
        data: response.json,
        total,
      };
    }


    return defaultDataProvider.getList(resource, params);
  },

  // GET ONE
  getOne: async (resource: string, params: any) => {
    if (resource === "reviews") {
      const { id, meta } = params;
      const sellerId = meta?.sellerId;
      if (!sellerId) throw new Error("Missing sellerId in params.meta");

      const url = `${apiUrl}/review-seller/sellers/${sellerId}/reviews/${id}`;
      const response = await httpClient(url);

      return { data: response.json };
    }

    if (resource === "roles") {
      const response = await httpClient(`${apiUrl}/roles/${params.id}`);

      let data = response.json;
      if (Array.isArray(data.permissions)) {
        data.permissions = data.permissions.map((p: any) =>
          typeof p === "object" ? p.id : p
        );
      }
      return { data };
    }
    if (resource === "reports") {
      const url = `${staffUrl}/reports/${params.id}`;
      const response = await httpClient(url);
      return { data: response.json };
    }

    return defaultDataProvider.getOne(resource, params);
  },

  delete: async (resource: string, params: any) => {
    if (resource === "reports") {
      const url = `${staffUrl}/reports/${params.id}`;
      await httpClient(url, { method: "DELETE" });
      return { data: { id: params.id } };
    }
    return defaultDataProvider.delete(resource, params);
  },
};

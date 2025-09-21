import api from "./api";

export const fetchCategories = async () => {
  const { data } = await api.get("/categories/");
  return data;
};

export const createCategory = async (category: any) => {
  const { data } = await api.post("/categories/", category);
  return data;
};

export const updateCategory = async (id: number, category: any) => {
  const { data } = await api.put(`/categories/${id}/`, category);
  return data;
};

export const deleteCategory = async (id: number) => {
  await api.delete(`/categories/${id}/`);
};

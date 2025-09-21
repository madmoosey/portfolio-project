import api from "./api";

export const fetchTransactions = async () => {
  const { data } = await api.get("/transactions/");
  return data;
};

export const createTransaction = async (transaction: any) => {
  const { data } = await api.post("/transactions/", transaction);
  return data;
};

export const updateTransaction = async (id: number, transaction: any) => {
  const { data } = await api.put(`/transactions/${id}/`, transaction);
  return data;
};

export const deleteTransaction = async (id: number) => {
  await api.delete(`/transactions/${id}/`);
};

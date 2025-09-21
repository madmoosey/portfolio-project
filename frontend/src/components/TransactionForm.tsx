import { useState } from "react";

interface TransactionFormProps {
  onSubmit: (tx: any) => void;
  initialData?: any;
}

export default function TransactionForm({ onSubmit, initialData }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: initialData?.amount || "",
    type: initialData?.type || "EXPENSE",
    category: initialData?.category || "",
    description: initialData?.description || "",
    date: initialData?.date || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ amount: "", type: "EXPENSE", category: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded">
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2">
        <option value="EXPENSE">Expense</option>
        <option value="INCOME">Income</option>
      </select>
      <input
        name="category"
        placeholder="Category ID"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border p-2"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Save</button>
    </form>
  );
}

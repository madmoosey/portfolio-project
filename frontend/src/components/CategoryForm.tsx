import { useState } from "react";

interface CategoryFormProps {
  onSubmit: (cat: any) => void;
  initialData?: any;
}

export default function CategoryForm({ onSubmit, initialData }: CategoryFormProps) {
  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded">
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Save</button>
    </form>
  );
}

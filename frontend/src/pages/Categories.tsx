import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../services/categories";
import CategoryForm from "../components/CategoryForm";

export default function Categories() {
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery(["categories"], fetchCategories);

  const createMutation = useMutation(createCategory, {
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const updateMutation = useMutation(({ id, ...cat }: any) => updateCategory(id, cat), {
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const deleteMutation = useMutation(deleteCategory, {
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <CategoryForm onSubmit={(cat) => createMutation.mutate(cat)} />
      <ul className="mt-4 space-y-2">
        {categories?.map((cat: any) => (
          <li key={cat.id} className="border p-2 flex justify-between items-center">
            <span>{cat.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => updateMutation.mutate({ id: cat.id, name: cat.name })}
                className="bg-yellow-500 px-2 py-1 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(cat.id)}
                className="bg-red-600 px-2 py-1 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

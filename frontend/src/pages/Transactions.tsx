import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions, createTransaction, updateTransaction, deleteTransaction } from "../services/transactions";
import TransactionForm from "../components/TransactionForm";

export default function Transactions() {
  const queryClient = useQueryClient();

  const { data: transactions, isLoading } = useQuery(["transactions"], fetchTransactions);

  const createMutation = useMutation(createTransaction, {
    onSuccess: () => queryClient.invalidateQueries(["transactions"]),
  });

  const updateMutation = useMutation(({ id, ...tx }: any) => updateTransaction(id, tx), {
    onSuccess: () => queryClient.invalidateQueries(["transactions"]),
  });

  const deleteMutation = useMutation(deleteTransaction, {
    onSuccess: () => queryClient.invalidateQueries(["transactions"]),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <TransactionForm onSubmit={(tx) => createMutation.mutate(tx)} />
      <ul className="mt-4 space-y-2">
        {transactions?.map((tx: any) => (
          <li key={tx.id} className="border p-2 flex justify-between items-center">
            <span>
              {tx.type} - ${tx.amount} ({tx.category}) on {tx.date}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => updateMutation.mutate({ id: tx.id, ...tx })}
                className="bg-yellow-500 px-2 py-1 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(tx.id)}
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

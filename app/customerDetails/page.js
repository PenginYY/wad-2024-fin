import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CustomerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id]);

  async function fetchCustomer() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`);
    const data = await response.json();
    setCustomer(data);
  }

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Customer Details</h1>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Date of Birth:</strong> {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Member Number:</strong> {customer.memberNumber}</p>
      <p><strong>Interests:</strong> {customer.interests}</p>
    </main>
  );
}

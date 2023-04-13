import { Card, Title, Text } from '@tremor/react';
import Search from '../search';
import UsersTable from '../table';
import { Pagination } from '@mui/material';
export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {

  const search = searchParams.q ?? '';
  const users = [
    { id: 1, email: 'john.doe@example.com', name: 'John Doe', username: 'johndoe' },
    { id: 2, email: 'jane.doe@example.com', name: 'Jane Doe', username: 'janedoe' },
    { id: 3, email: 'bob.smith@example.com', name: 'Bob Smith', username: 'bobsmith' },
    { id: 4, email: 'john.doe@example.com', name: 'John Doe', username: 'johndoe' },
    { id: 5, email: 'jane.doe@example.com', name: 'Jane Doe', username: 'janedoe' },
    { id: 6, email: 'bob.smith@example.com', name: 'Bob Smith', username: 'bobsmith' },
    { id: 7, email: 'john.doe@example.com', name: 'John Doe', username: 'johndoe' },
    { id: 8, email: 'jane.doe@example.com', name: 'Jane Doe', username: 'janedoe' },
    { id: 9, email: 'bob.smith@example.com', name: 'Bob Smith', username: 'bobsmith' },
    { id: 10, email: 'john.doe@example.com', name: 'John Doe', username: 'johndoe' },
    { id: 11, email: 'jane.doe@example.com', name: 'Jane Doe', username: 'janedoe' },
    { id: 12, email: 'bob.smith@example.com', name: 'Bob Smith', username: 'bobsmith' }
  ];
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6 overflow-y-auto h-80">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}

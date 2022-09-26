import { useEffect, useState } from 'react';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload((current) => !current);
  };

  const fetchUsers = async () => {
    const req = await fetch('/users');
    const loadedUsers = await req.json();
    setUsers(loadedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  return [users, triggerReload];
}

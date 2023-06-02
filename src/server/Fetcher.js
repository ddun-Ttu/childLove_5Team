const url = "http://localhost:3000/user/:6477e996a90e409f1a487221";

export const fetchList = async (token) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

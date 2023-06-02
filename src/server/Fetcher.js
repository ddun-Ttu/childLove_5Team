const url = "http://localhost:9999/list";

export const fetchList = async (token) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const list = await res.json();

  return list;
};

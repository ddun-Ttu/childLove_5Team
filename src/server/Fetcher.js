// export const fetchList = async (token, pageNum) => {
//   const res = await fetch(
//     `http://localhost:9999/list?_limit=10&_page=${pageNum}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   const list = await res.json();

//   return list;
// };

export const fetchList = async (token) => {
  const res = await fetch(`http://localhost:9999/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const list = await res.json();

  return list;
};

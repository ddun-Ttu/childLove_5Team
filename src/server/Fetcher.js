import axios from "axios";

// export const fetchList = async () => {
//   const res = await fetch(`http://34.64.69.226:3000/admin/get/generelclient`, {
//     headers: {
//       Accept: "application / json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGUubWFpbCIsInN1YiI6MSwiaWF0IjoxNjg2MjM0NjUxLCJleHAiOjE3MTc3OTIyNTF9.QORp6FfVmnROH3A-OCvHzYKjzZVAXjADpKcwmCwGeAAd",
//     },
//   });

//   const list = await res.json();
//   console.log(list);
//   return list;
// };

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwic3ViIjoyLCJpYXQiOjE2ODYyOTAxOTUsImV4cCI6MTcxNzg0Nzc5NX0._vIRMzSEE7L4iXeRabto1_51k0D_7XVNaU1Rmxj4Dak";

export const fetchList = axios
  .get("http://34.64.69.226:3000/admin/get/generelclient", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
  .then((res) => console.log(res));

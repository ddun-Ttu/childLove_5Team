import axios from "axios";

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwic3ViIjoyLCJpYXQiOjE2ODYyOTAxOTUsImV4cCI6MTcxNzg0Nzc5NX0._vIRMzSEE7L4iXeRabto1_51k0D_7XVNaU1Rmxj4Dak";

export const instance = axios.create({
  baseURL: "http://34.64.69.226:3000/admin/get/generelclient",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

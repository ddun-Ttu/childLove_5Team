import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Card from "./TestCard";

const SearchPageTest = () => {
  const fetchUsers = async (page, size) => {
    const response = await fetch(
      `http://localhost:9999/user?page=${page}&size=${size}`
    );
    const data = await response.json();
    console.log("page:", page, ", size:", size);
    return data;
  };

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(["users", 1, 10], () => fetchUsers(1, 10));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <>
      {users.map((user, index) => (
        <Card key={`${user}-${index}`} user={user} index={index} />
      ))}
    </>
  );
};

export default SearchPageTest;

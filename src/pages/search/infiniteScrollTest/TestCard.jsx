import React from "react";

const Card = ({ user, index }) => {
  return (
    <>
      <div
        style={{
          height: "300px",
          margin: "10px",
          backgroundColor: "yellow",
        }}
      >
        <p>
          {index + 1}번째 카드: {JSON.stringify(index + 1)}
        </p>
        <p>{JSON.stringify(user.email)}</p>
      </div>
    </>
  );
};

export default Card;

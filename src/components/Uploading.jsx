import React from "react";

const Uploading = () => {
  return (
    <div className="card w-96 mx-10 my-5 bg-base-100 text-neutral-content shadow-2xl">
      <div className="card-body items-center text-center">
        <p className="card-title text-black mb-5">Uploading...</p>
        <progress className="progress w-56"></progress>
      </div>
    </div>
  );
};

export default Uploading;

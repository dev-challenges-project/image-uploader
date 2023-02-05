import React from "react";
import check from "../assets/check.png";

function ResultCard(props) {
  return (
    <div>
      <div className="card mx-10 my-5 w-96 bg-base-100 shadow-xl">
        <div>
          <img src={check} alt="check" className="w-10 h-10 mx-auto mt-10" />
        </div>
        <p className="text-center mx-5 mt-5 text-lg font-semibold">
          Uploaded Successfully!
        </p>
        <p className="text-center my-2 text-sm text-gray-500">
          Click on copy link button to get the URL
        </p>
        <div className="mx-10 mt-5">
          <div className="box-border border-2 border-dotted rounded-lg bg-[#e8fadc] border-green-600">
            <figure className="">
              <img src={props.imageLink} alt="image" className="rounded-lg" />
            </figure>
          </div>
        </div>
        <div className="card-body items-center text-center">
          <div className="card-actions">
            <div className="flex">
              <p className="bg-white p-3 mr-2 w-60 scrollbar-none text-left rounded-md overflow-x-scroll">
                {props.imageLink}
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  navigator.clipboard.writeText(props.imageLink);
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;

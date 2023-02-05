import React, { useEffect, useState } from "react";
import image from "../assets/image.svg";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];
const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Card = (props) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  let fileInput;

  const handleChange = (file) => {
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  const selectFile = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const uploadHandler = () => {
    if (fileDataURL) {
      props.setLoading(true);
      axios
        .post("http://localhost:8080/api/v1/upload/", {
          image: fileDataURL,
        })
        .then((res) => {
          props.setImageLink(res.data.url);
          props.setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert("Cannot upload the image at this moment.");
          props.setLoading(false);
        });
    } else {
      console.log("no image found");
    }
  };

  return (
    <div className="card mx-10 my-5 w-96 bg-base-100 shadow-xl">
      <p className="text-center mx-5 mt-10 text-lg font-semibold">
        Upload your image.
      </p>
      <p className="text-center my-2 text-sm text-gray-500">
        File should be JPG, PNG or GIF
      </p>
      <div className="mx-10 mt-5">
        {fileDataURL ? (
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          >
            <div className="box-border border-2 border-dotted rounded-lg bg-[#e8fadc] border-green-600">
              <figure className="">
                <img src={fileDataURL} alt="Shoes" className="rounded-lg" />
              </figure>
            </div>
          </FileUploader>
        ) : (
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          >
            <div className="box-border border-2 border-dotted rounded-lg bg-[#e8fadc] border-green-600">
              <figure className="mt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="text-sm text-center mt-10 mb-10">
                Drag & Drop your image here
              </div>
            </div>
          </FileUploader>
        )}
      </div>
      <div className="card-body items-center text-center">
        {!fileDataURL && <p className="text-gray-500">or</p>}
        <div className="card-actions">
          <input
            ref={(refParam) => (fileInput = refParam)}
            type="file"
            accept="image/*"
            onChange={selectFile}
            style={{ display: "none" }}
          />
          {fileDataURL ? (
            <button className="btn btn-primary" onClick={() => uploadHandler()}>
              Upload Image
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => fileInput.click()}
            >
              Choose a file
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

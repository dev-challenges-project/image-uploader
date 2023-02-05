import React, { useState } from "react";
import ResultCard from "./components/ResultCard";
import UploadCard from "./components/UploadCard";
import Uploading from "./components/Uploading";

function App() {
  const [loading, setLoading] = useState(false);
  const [imageLink, setImageLink] = useState(null);

  return (
    <div className="h-screen bg-white flex justify-center items-center">
      {/* <ResultCard imageLink={imageLink}/> */}
      {imageLink ? <ResultCard imageLink={imageLink}/> :
      loading ? <Uploading /> : <UploadCard setLoading={setLoading} setImageLink={setImageLink}/>}
    </div>
  );
}

export default App;

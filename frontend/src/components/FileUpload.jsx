import { useState } from "react";
import { uploadFile } from "../api/file";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const response = await uploadFile(file);
    setMessage(`File uploaded: ${response.fileUrl}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-2">Upload a File</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full mb-2" />
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" onClick={handleUpload}>Upload</button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default FileUpload;
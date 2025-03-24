import axios from "axios";

// Upload File
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post("/api/files/upload", formData);
  return res.data;
};

// Download File
export const downloadFile = async (fileKey, encryptedKey, iv) => {
  const res = await axios.get(`/api/files/download?fileKey=${fileKey}&encryptedKey=${encryptedKey}&iv=${iv}`, {
    responseType: "blob",
  });
  return res.data;
};

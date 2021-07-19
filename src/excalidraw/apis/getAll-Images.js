import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});
// get all uploaded images' endpoints from the server
const getAllImages = async () => {
  const data = await api.get('/all-images');
  return data.data;
};

export default getAllImages;

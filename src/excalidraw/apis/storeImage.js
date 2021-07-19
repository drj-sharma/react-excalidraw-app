import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});
const saveToServer = async (image, imageUrl) => {
  console.log(`${image}, ${imageUrl}`);
  const data = new FormData();
  data.append('blob', image);
  const config = {
    header: {
      'Content-Type': 'multipart/form-data'
    }
  };
  await api.post('/store-image', data, config)
    .then((res) => console.log(res));
};

export default saveToServer;

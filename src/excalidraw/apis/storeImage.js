import axios from 'axios';

const saveToServer = async (image, imageUrl) => {
  console.log(`${image}, ${imageUrl}`);
  const data = new FormData();
  data.append('blob', image);
  const config = {
    header: {
      'Content-Type': 'multipart/form-data'
    }
  };
  await axios.post('http://localhost:4242/store-image', data, config)
    .then((res) => console.log(res));
};

export default saveToServer;

/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, { useRef, useState } from 'react';
import Excalidraw, { exportToBlob } from '@excalidraw/excalidraw';
import saveToServer from './apis/storeImage';
import getAllImages from './apis/getAll-Images';

let prevBlob;
const mystyle = {
  height: window.screen.height - 30,
};

const index = () => {
  const excalidrawRef = useRef(null);
  const [data, setData] = useState([]);

  // not using noChange event because it gives bumch of queue of data
  // that is not optimized way to store
  const onChange = (elements) => console.log(elements.length);

  /**
   * saving image every 10s of interval but only for those images
   * that has been changed from previous state
   * exporting current scene to the image blog of type [image/png]
   * ensuring that saving is only valid for new changes only,
   * maintaining previous blob to compare size with new image
   * if size of prev and new is same, no saving even after 10s rule
   * else save
   */
  const exportBlob = async () => {
    try {
      const image = await exportToBlob({
        elements: excalidrawRef.current.getSceneElements(),
        mimeType: 'image/png'
      });
      if ((prevBlob !== undefined && prevBlob.size === image.size) || image.size < 1000) {
        return;
      }
      const imageUrl = window.URL.createObjectURL(image);
      console.log(image.size);
      prevBlob = image;
      saveToServer(image, imageUrl);
    } catch {
      console.log();
    }
  };

  /**
   * a@async function to get all images endpoints
   */
  const getImages = async () => {
    try {
      const links = await getAllImages();
      setData(links);
      console.log(`data ${JSON.parse(data)}`);
    } catch {
      console.log('parsing json');
    }
  };

  /**
   * crux of auto-save,
   * goto exportBlob for complete implementation
   */
  window.setInterval(exportBlob, 10000);

  return (
    <>
      <div className="App">
        <div className="buttons">
          <button
            type="button"
            className="reset-scene"
            onClick={() => {
              excalidrawRef.current.resetScene();
            }}
          >
            Reset Scene
          </button>
          <button
            onClick={getImages}
          >
            Get All Images
          </button>
          <div>
            <div>
              {data.map((ele, idx) => (
                <li>
                  <a href={ele}>
                    {idx}
                    {' '}
                    {ele}
                  </a>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div
          className="excalidraw-wrapper"
          style={mystyle}
        >
          <Excalidraw
            ref={excalidrawRef}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default index;

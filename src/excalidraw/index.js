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

  const onChange = (elements) => console.log(elements.length);

  // const [viewModeEnabled, setViewModeEnabled] = useState(false);
  // const [zenModeEnabled, setZenModeEnabled] = useState(false);
  // const [gridModeEnabled, setGridModeEnabled] = useState(false);

  // const updateScene = () => {
  //   const sceneData = {
  //     elements: [
  //       {
  //         type: 'rectangle',
  //         version: 141,
  //         versionNonce: 361174001,
  //         isDeleted: false,
  //         id: 'oDVXy8D6rom3H1-LLH2-f',
  //         fillStyle: 'hachure',
  //         strokeWidth: 1,
  //         strokeStyle: 'solid',
  //         roughness: 1,
  //         opacity: 100,
  //         angle: 0,
  //         x: 100.50390625,
  //         y: 93.67578125,
  //         strokeColor: '#c92a2a',
  //         backgroundColor: 'transparent',
  //         width: 186.47265625,
  //         height: 141.9765625,
  //         seed: 1968410350,
  //         groupIds: [],
  //       },
  //     ],
  //     appState: {
  //       viewBackgroundColor: '#edf2ff',
  //     },
  //   };
  //   excalidrawRef.current.updateScene(sceneData);
  // };

  // const saveLocal = ($data) => {
  //   console.log($data);
  // };

  const exportBlob = async () => {
    try {
      const image = await exportToBlob({
        elements: excalidrawRef.current.getSceneElements(),
        mimeType: 'image/png',
      });
      if ((prevBlob !== undefined && prevBlob.size === image.size) || image.size < 500) {
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

  const getImages = async () => {
    try {
      const links = await getAllImages();
      setData(links);
      console.log(`data ${JSON.parse(data)}`);
    } catch {
      console.log('parsing json');
    }
  };

  // const listOfLinks = () => {
  //   if (this.data !== undefined) {
  //     this.data.map((ln) => (
  //       <p>{ln}</p>
  //     ));
  //   }
  // };
  window.setInterval(exportBlob, 10000);

  return (
    <>
      <div className="App">
        {/* <div>
        <button type="button" className="update-scene" onClick={updateScene}>
          Update Scene
        </button>
        <button
          type="button"
          className="reset-scene"
          onClick={() => {
            excalidrawRef.current.resetScene();
          }}
        >
          Reset Scene
        </button>
        <label>
          <input
            type="checkbox"
            checked={viewModeEnabled}
            onChange={() => setViewModeEnabled(!viewModeEnabled)}
          />
          View mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={zenModeEnabled}
            onChange={() => setZenModeEnabled(!zenModeEnabled)}
          />
          Zen mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={gridModeEnabled}
            onChange={() => setGridModeEnabled(!gridModeEnabled)}
          />
          Grid mode
        </label>
      </div> */}
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
    </>
  );
};

export default index;

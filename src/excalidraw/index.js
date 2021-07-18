/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, { useState, useRef } from 'react';
import Excalidraw, { exportToBlob } from '@excalidraw/excalidraw';
import saveToServer from './apis/storeImage';

const mystyle = {
  height: window.screen.height - 30,
};
const index = () => {
  const excalidrawRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState(null);

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

  return (
    <>
      <div className="App">
        <img src={blobUrl} alt="" />
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
          />
        </div>
      </div>
      <button
        onClick={async () => {
          const image = await exportToBlob({
            elements: excalidrawRef.current.getSceneElements(),
            mimeType: 'image/png',
          });
          const imageUrl = window.URL.createObjectURL(image);
          setBlobUrl(imageUrl);
          saveToServer(image, imageUrl);
        }}
      >
        Get Image
      </button>
    </>
  );
};

export default index;

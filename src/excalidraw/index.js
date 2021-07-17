/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useState, useRef } from 'react';
import Excalidraw from '@excalidraw/excalidraw';

const mystyle = {
  height: window.screen.height - 30,
};
const index = () => {
  const excalidrawRef = useRef(null);

  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);

  const updateScene = () => {
    const sceneData = {
      elements: [
        {
          type: 'rectangle',
          version: 141,
          versionNonce: 361174001,
          isDeleted: false,
          id: 'oDVXy8D6rom3H1-LLH2-f',
          fillStyle: 'hachure',
          strokeWidth: 1,
          strokeStyle: 'solid',
          roughness: 1,
          opacity: 100,
          angle: 0,
          x: 100.50390625,
          y: 93.67578125,
          strokeColor: '#c92a2a',
          backgroundColor: 'transparent',
          width: 186.47265625,
          height: 141.9765625,
          seed: 1968410350,
          groupIds: [],
        },
      ],
      appState: {
        viewBackgroundColor: '#edf2ff',
      },
    };
    excalidrawRef.current.updateScene(sceneData);
  };

  return (
    <div className="App">
      <div>
        <button className="update-scene" onClick={updateScene}>
          Update Scene
        </button>
        <button
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
      </div>
      <div
        className="excalidraw-wrapper"
        style={mystyle}
      >
        <Excalidraw
          ref={excalidrawRef}
          onChange={(elements) => console.log(elements)}
          onPointerUpdate={(payload) => console.log(payload)}
          onCollabButtonClick={() => console.log('You clicked on collab button')}
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
        />
      </div>
    </div>
  );
};

export default index;

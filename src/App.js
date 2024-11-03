import React from 'react';
import { MapProvider } from './context/MapContext';
import MrMap from './components/MrMap';

const App = () => {
  return (
    <div className="h-full w-full">
      <MapProvider>
        <MrMap />
      </MapProvider>
    </div>
  );
};

export default App;
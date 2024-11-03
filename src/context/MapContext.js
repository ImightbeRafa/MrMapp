import React, { createContext, useContext, useState, useCallback } from 'react';

const MapContext = createContext({});

export const MapProvider = ({ children }) => {
  const [drawnItems, setDrawnItems] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null);

  const addDrawnItem = useCallback((item) => {
    setDrawnItems(prev => [...prev, item]);
  }, []);

  return (
    <MapContext.Provider value={{
      drawnItems,
      activeLayer,
      setActiveLayer,
      addDrawnItem
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

    
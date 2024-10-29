import React, { createContext, useContext, useState } from 'react';

const DrawingContext = createContext();

export const DrawingProvider = ({ children }) => {
    const [drawings, setDrawings] = useState([]);

    const addDrawing = (drawing) => {
        setDrawings((prev) => [...prev, drawing]);
    };

    return (
        <DrawingContext.Provider value={{ drawings, addDrawing }}>
            {children}
        </DrawingContext.Provider>
    );
};

export const useDrawing = () => {
    return useContext(DrawingContext);
};

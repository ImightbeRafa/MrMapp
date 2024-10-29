import React from 'react';
import { DrawingProvider } from './DrawingContext';
import MapComponent from './components/MapComponent';
import CanvasComponent from './components/CanvasComponent';

const App = () => {
    return (
        <DrawingProvider>
            <div style={{ position: 'relative', height: '100vh' }}>
                <MapComponent />
                <CanvasComponent />
            </div>
        </DrawingProvider>
    );
};

export default App;

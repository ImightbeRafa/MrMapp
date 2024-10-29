import React from 'react';
import MapComponent from './components/MapComponent';
import CanvasComponent from './components/CanvasComponent';

// Then your App component
const App = () => {
    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <MapComponent />
            <CanvasComponent />
        </div>
    );
};

export default App;
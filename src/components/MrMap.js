import React, { useState, useCallback, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { COSTA_RICA_BOUNDS, INITIAL_CENTER, INITIAL_ZOOM } from '../utils/constants';
import { useLocationComments } from './comments/useLocationComment';
import { MapBoundsControl } from './map/MapBoundControl';
import { LocationMarker } from './map/LocationMarker';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { CommentSection } from './comments/CommentSection';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix Leaflet default marker icons
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Lazy load modal component with proper error boundary
const SafetyLevelModal = React.lazy(() => 
  import('./modals/SafetyLevelModal')
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.error('Error loading SafetyLevelModal:', error);
      return { default: () => <div>Error loading modal</div> };
    })
);

const createPopupContent = (safetyLevel, message, locationId, comments, onAddComment) => {
  const container = document.createElement('div');
  container.className = 'p-4';
  
  ReactDOM.render(
    <div>
      <div className="mb-4" role="alert">
        <strong className="block mb-2">Safety Level: {safetyLevel}</strong>
        <p className="text-gray-600">{message}</p>
      </div>
      <CommentSection
        locationId={locationId}
        comments={comments}
        onAddComment={onAddComment}
      />
    </div>,
    container
  );

  return container;
};

const MrMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);
  const [drawnItems, setDrawnItems] = useState([]);
  const { locationComments, addComment } = useLocationComments();

  const handleDrawCreated = useCallback((e) => {
    try {
      const layer = e.layer;
      const locationId = Date.now().toString();
      
      layer.locationId = locationId;
      setActiveLayer(layer);
      setModalOpen(true);
      
      setDrawnItems(prev => [...prev, { layer, locationId }]);
    } catch (error) {
      console.error('Error creating drawing:', error);
      alert('Failed to create drawing. Please try again.');
    }
  }, []);

  const handleSafetySubmit = useCallback(({ safetyLevel, message }) => {
    try {
      if (!activeLayer) {
        throw new Error('No active layer found');
      }

      const styles = {
        green: { color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.2 },
        yellow: { color: '#eab308', fillColor: '#eab308', fillOpacity: 0.2 },
        red: { color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 }
      };

      activeLayer.setStyle(styles[safetyLevel]);

      const popupContent = createPopupContent(
        safetyLevel,
        message,
        activeLayer.locationId,
        locationComments[activeLayer.locationId] || [],
        addComment
      );

      activeLayer.bindPopup(popupContent).openPopup();
    } catch (error) {
      console.error('Error submitting safety level:', error);
      alert('Failed to save safety information. Please try again.');
    } finally {
      setModalOpen(false);
      setActiveLayer(null);
    }
  }, [activeLayer, locationComments, addComment]);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setActiveLayer(null);
  }, []);

  return (
    <div className="h-screen w-full relative">
      <MapContainer
        center={INITIAL_CENTER}
        zoom={INITIAL_ZOOM}
        className="h-full w-full"
        maxBounds={COSTA_RICA_BOUNDS}
        minZoom={7}
        maxZoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleDrawCreated}
            draw={{
              rectangle: {
                shapeOptions: {
                  color: '#666',
                  weight: 2
                }
              },
              polygon: {
                shapeOptions: {
                  color: '#666',
                  weight: 2
                }
              },
              circle: {
                shapeOptions: {
                  color: '#666',
                  weight: 2
                }
              },
              circlemarker: false,
              marker: false,
              polyline: false,
            }}
            edit={{
              edit: false,
              remove: true
            }}
          />
        </FeatureGroup>

        <MapBoundsControl />
        <LocationMarker />
      </MapContainer>

      <Suspense fallback={<LoadingSpinner />}>
        {modalOpen && (
          <SafetyLevelModal
            isOpen={modalOpen}
            onClose={handleModalClose}
            onSubmit={handleSafetySubmit}
          />
        )}
      </Suspense>
    </div>
  );
};

export default React.memo(MrMap);
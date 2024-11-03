import { useState, useEffect, useCallback } from 'react';

export const useLocationComments = () => {
  const [locationComments, setLocationComments] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('locationComments');
      if (saved) {
        setLocationComments(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }, []);

  const saveComments = useCallback((newComments) => {
    try {
      localStorage.setItem('locationComments', JSON.stringify(newComments));
      setLocationComments(newComments);
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  }, []);

  const addComment = useCallback((locationId, text) => {
    const newComments = {
      ...locationComments,
      [locationId]: [
        ...(locationComments[locationId] || []),
        {
          text,
          timestamp: new Date().toLocaleString(),
          author: 'Anonymous'
        }
      ]
    };
    saveComments(newComments);
  }, [locationComments, saveComments]);

  return { locationComments, addComment };
};
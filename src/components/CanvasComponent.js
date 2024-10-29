import React, { useRef, useEffect } from 'react';
import { useDrawing } from '../DrawingContext';

const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const tileSize = 20; // Size of each tile
    const { addDrawing } = useDrawing();

    const startDrawing = (e) => {
        isDrawingRef.current = true;
        const rect = canvasRef.current.getBoundingClientRect();
        lastX.current = Math.floor((e.clientX - rect.left) / tileSize) * tileSize;
        lastY.current = Math.floor((e.clientY - rect.top) / tileSize) * tileSize;
    };

    const draw = (e) => {
        if (!isDrawingRef.current) return;

        const context = canvasRef.current.getContext('2d');
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / tileSize) * tileSize;
        const y = Math.floor((e.clientY - rect.top) / tileSize) * tileSize;

        context.strokeStyle = 'red';
        context.lineWidth = 5;
        context.lineJoin = 'round'; // For smoother brush effects
        context.beginPath();
        context.moveTo(lastX.current, lastY.current);
        context.lineTo(x, y);
        context.stroke();

        // Save the drawing data
        addDrawing({ x1: lastX.current, y1: lastY.current, x2: x, y2: y });

        lastX.current = x;
        lastY.current = y;
    };

    const stopDrawing = () => {
        isDrawingRef.current = false;
        const context = canvasRef.current.getContext('2d');
        context.closePath();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}
        />
    );
};

export default CanvasComponent;

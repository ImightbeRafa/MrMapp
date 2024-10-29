// CanvasComponent.js
import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastX = useRef(0);
    const lastY = useRef(0);

    const startDrawing = (e) => {
        isDrawing.current = true;
        const rect = canvasRef.current.getBoundingClientRect();
        lastX.current = e.clientX - rect.left;
        lastY.current = e.clientY - rect.top;
    };

    const draw = (e) => {
        if (!isDrawing.current) return;

        const context = canvasRef.current.getContext('2d');
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        context.strokeStyle = 'red';
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(lastX.current, lastY.current);
        context.lineTo(x, y);
        context.stroke();
        lastX.current = x;
        lastY.current = y;
    };

    const stopDrawing = () => {
        isDrawing.current = false;
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

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }} />;
};

export default CanvasComponent;

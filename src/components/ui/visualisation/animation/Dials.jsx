import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import dialsSketch from './DialsSketch';

export default function Dials({ data, variables }) {
  const p5Instance = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Resize observer for container width
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Initialize p5 sketch once
  useEffect(() => {
    if (!p5Instance.current && containerRef.current) {
      p5Instance.current = new p5((p) => dialsSketch(p, containerRef.current));
    }
  }, []);

  // Update data and size on data or containerWidth change
  useEffect(() => {
    if (p5Instance.current) {
      p5Instance.current.updateData?.(data);
      p5Instance.current.setSize?.(containerWidth);
    }
  }, [data, containerWidth]);

  // Update variables in the p5 sketch when variables prop changes
  useEffect(() => {
    if (p5Instance.current) {
      p5Instance.current.updateVariables?.(variables);
    }
  }, [variables]);

  return (
    <div
      ref={containerRef}
      id="p5-container"
      className="w-100"
      style={{ width: '90%', paddingRight: '4rem', height: 'auto' }}
    />
  );
}

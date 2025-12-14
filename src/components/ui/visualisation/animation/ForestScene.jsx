// // TreeVisualization.js
// import React, { useRef, useEffect } from 'react';
// import p5 from 'p5';

// const ForestScene = ({ displacement = 10, soilMoisture = 100, temperature = 100, humidity = 100 }) => {
//   const sketchRef = useRef();

//   useEffect(() => {
//     let p5Instance;

//     const sketch = (p) => {
//       const canvasWidth = 800;
//       const canvasHeight = 600;

//       p.setup = () => {
//         p.createCanvas(canvasWidth, canvasHeight).parent(sketchRef.current);
//         p.noLoop();
//       };

//       p.draw = () => {
//         // Map inputs
//         const treeSize = p.map(displacement, 0, 100, 80, 200);
//         const soilColor = p.lerpColor(p.color('#d2b48c'), p.color('#4b2e1e'), soilMoisture / 100); // light to dark brown
//         const sunColor = p.lerpColor(p.color('#f5f5f5'), p.color('#ff9900'), p.constrain((temperature - 10) / 40, 0, 1));
//         const skyColor = p.lerpColor(p.color('#7ecfff'), p.color('#ff6666'), p.constrain((temperature - 10) / 40, 0, 1));
//         const cloudCount = p.floor(p.map(humidity, 0, 100, 1, 6));
//         const cloudSize = p.map(humidity, 0, 100, 30, 100);

//         // Sky
//         p.background(skyColor);

//         // Sun
//         p.noStroke();
//         p.fill(sunColor);
//         p.ellipse(canvasWidth - 100, 100, 80, 80);

//         // Clouds
//         p.fill(255, 240);
//         for (let i = 0; i < cloudCount; i++) {
//           const x = 100 + i * 120 + p.random(-20, 20);
//           const y = 80 + p.random(-10, 10);
//           p.ellipse(x, y, cloudSize, cloudSize * 0.6);
//           p.ellipse(x + 30, y + 10, cloudSize * 0.8, cloudSize * 0.5);
//           p.ellipse(x - 30, y + 10, cloudSize * 0.8, cloudSize * 0.5);
//         }

//         // Ground
//         p.fill(soilColor);
//         p.rect(0, canvasHeight - 100, canvasWidth, 100);

//         // Tree
//         p.push();
//         p.translate(canvasWidth / 2, canvasHeight - 100);
//         p.fill('#8B4513'); // trunk
//         p.rect(-10, 0, 20, -treeSize / 2);

//         p.fill('#228B22'); // leaves
//         p.ellipse(0, -treeSize / 2, treeSize, treeSize);
//         p.pop();
//       };
//     };

//     p5Instance = new p5(sketch);

//     return () => {
//       p5Instance.remove();
//     };
//   }, [displacement, soilMoisture, temperature, humidity]);

//   return <div ref={sketchRef} />;
// };

// export default ForestScene;




// import { useEffect, useRef, useState } from 'react';
// import p5 from 'p5';
// import ForestSceneSketch from './ForestSceneSketch';

// export default function ForestScene({ variables }) {
//   const p5Instance = useRef(null);
//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   useEffect(() => {
//     const observer = new ResizeObserver(entries => {
//       for (let entry of entries) {
//         setContainerWidth(entry.contentRect.width);
//       }
//     });
//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => {
//       if (containerRef.current) observer.unobserve(containerRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     if (!p5Instance.current && containerRef.current) {
//       p5Instance.current = new p5(p => ForestSceneSketch(p, containerRef.current));
//     }
//   }, []);

//   useEffect(() => {
//     if (p5Instance.current) {
//       p5Instance.current.updateVariables?.(variables);
//       p5Instance.current.setSize?.(containerWidth);
//     }
//   }, [variables, containerWidth]);

//   return <div ref={containerRef} style={{ width: '90%', height: 'auto' }} />;
// }


import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import ForestSceneSketch from './ForestSceneSketch';

export default function ForestScene({ data, variables }) {
  const p5Instance = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

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

  useEffect(() => {
    if (!p5Instance.current && containerRef.current) {
      p5Instance.current = new p5(p => ForestSceneSketch(p, containerRef.current));
    }
  }, []);

  useEffect(() => {
    if (p5Instance.current) {
      p5Instance.current.updateVariables?.(variables);
      p5Instance.current.updateData?.(data);
      p5Instance.current.setSize?.(containerWidth);
    }
  }, [variables, data, containerWidth]);

  return <div className='' ref={containerRef} style={{ width: '90%', maxWidth: '595px', height: 'auto', margin: '0 auto' }} />;
}

// Import React and the useRef hook to create a mutable reference for the globe object
import React, { useRef } from 'react';
// Import the GLTF loader hook for loading .glb models with caching and preloading support
import { useGLTF } from '@react-three/drei';
// Import the render-loop hook to run logic on every animation frame
import { useFrame } from '@react-three/fiber';

// Functional React component that displays a rotating globe model and forwards any extra props
export default function GlobeModel(props) {
  // Create a ref to access and mutate the three.js object (rotation, position, etc.)
  const globeRef = useRef();
  // Load the GLB file and extract its root 'scene' object; path resolved from the public directory
  const { scene } = useGLTF('/blender/globe/globe2.glb');

  // Rotate the globe slightly on each rendered frame for a smooth, continuous spin
  useFrame(() => {
    // Guard in case the model hasn't mounted or loaded yet
    if (globeRef.current) {
      // Increment the Y-axis rotation (radians per frame) to achieve a gentle spin
      globeRef.current.rotation.y += 0.002;
    }
  });

  // Render the loaded GLTF scene as a primitive; attach the ref, set scale/position, and spread incoming props
  return (
    <primitive
      ref={globeRef}
      object={scene}
      scale={0.015}
      position={[0, 0.175, 0]}
      {...props}
    />
  );
}
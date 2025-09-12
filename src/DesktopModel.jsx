// Import React to define the component and enable JSX syntax
import React from 'react';
// Import the GLTF loader hook from @react-three/drei for loading .glb models
import { useGLTF } from '@react-three/drei';

// Functional component that loads and displays a desktop 3D model
export default function DesktopModel() {
  // Load the GLB file relative to the public root; destructure 'scene' from the returned GLTF object
  // useGLTF caches by URL; ensure '/blender/pc/pc2.glb' exists and is served by your app
  const { scene } = useGLTF('/blender/pc/pc2.glb');

  // Render the loaded three.js scene as a <primitive>; scale enlarges the model, position offsets it [x, y, z]
  return (
    <primitive object={scene} scale={3} position={[0, -3, 0]} />
  );
}
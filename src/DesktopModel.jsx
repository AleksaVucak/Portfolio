import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function DesktopModel() {
  const { scene } = useGLTF('/blender/pc/pc2.glb');

  return (
    <primitive object={scene} scale={3} position={[0, -3, 0]} />
  );
}

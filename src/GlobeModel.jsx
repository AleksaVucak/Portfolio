import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function GlobeModel(props) {
  const globeRef = useRef();
  const { scene } = useGLTF('/blender/globe/globe2.glb');

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

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
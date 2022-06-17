import React, { useRef } from 'react';

import { TextureLoader } from 'three';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import {
  softShadows,
  OrbitControls,
  MeshWobbleMaterial,
} from '@react-three/drei';
import './App.scss';

import colorMapi from './textures/mat-albedo.png';
import displacementMapi from "./textures/mat-height.png";
import normalMapi from "./textures/mat-normal-ogl.png";



softShadows();

function Box({ position, args, color }) {
  const colorMap = useLoader(TextureLoader, colorMapi);
  const displacementMap = useLoader(TextureLoader, displacementMapi);
  const normalMap = useLoader(TextureLoader, normalMapi);
  const mesh = useRef(null);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh castShadow ref={mesh} position={position}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        displacementScale={0}
        map={colorMap}
         displacementMap={displacementMap}
          normalMap={normalMap}
        geometry={[20, 20, 20]}
        attach='material'

          speed={3}
        factor={1.2}
      />
    </mesh>
  );
}

function App() {
  return (
    <>
      <Canvas
        shadows
        linear
        // shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>

          <mesh
            castShadow
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach='geometry' args={[1000, 100]} />
            <meshPhongMaterial attach='material' opacity={0.5} />
          </mesh>

          <Box
            boxGeometry={[100, 20, 10]}
            position={[0, 1, 0]}
            args={[3, 2, 2, 20, 20]}
            color={'pink'}
          />
          <Box position={[-2, 1, -5]} />
          <Box position={[5, 2, -2]} />
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;

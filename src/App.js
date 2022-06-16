import React, { useRef } from 'react';
import './App.scss';

import { Canvas, useFrame } from 'react-three-fiber';

const Box = ({ position }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh} position={position}>
      <boxBufferGeometry attach='geometry' args={[2, 2, 2]} />
      <meshStandardMaterial attach='material' color='#F0D4ff' />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas colorManagement camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 0, -20]} intensity={0.5}/>
        <pointLight position={[0, -10, 0]} intensity={0.5}/>

<group>
    <mesh>
      
    </mesh>

</group>

        <Box position={[-2, 4, 0]} />
        <Box position={[1, -2, 3]} />
        <Box position={[5, 5, -5]} />
      </Canvas>
    </>
  );
}

export default App;

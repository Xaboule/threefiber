import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const GROUND_HEIGHT = -10;
const SPEED = 50
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export function Terrain() {

    const keys = {
        ArrowUp: 'forward',
        ArrowDown: 'backward',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        KeyA: 'left',
        KeyD: 'right',
        KeyW: 'forward',
        KeyS: 'backward'
      }
      
      const moveFieldByKey = (key) => keys[key]
      
      const usePlayerControls = () => {
        const [movement, setMovement] = useState({ 
            forward: false, 
            backward: false, 
            left: false, 
            right: false, 
            up: false, 
            down: false })
            const handleMouseMove = (e) => {}
            useEffect(() => {
                const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
                const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
                document.addEventListener('keydown', handleKeyDown)
                document.addEventListener('keyup', handleKeyUp)
                document.addEventListener('pointermove', handleMouseMove)
            
                return () => {
                  document.removeEventListener('keydown', handleKeyDown)
                  document.removeEventListener('keyup', handleKeyUp)
                  document.removeEventListener('pointermove', handleMouseMove)
                }
              }, [])
              return movement
            }
            let { forward, backward, left, right } = usePlayerControls()

//   useFrame(() => {
//     frontVector.set(0, 0, Number(backward) - Number(forward))
//     sideVector.set(Number(left) - Number(right), 0, 0)
//     direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED)
// //   terrain.setLinearVelocity(direction)
//   })
    const terrain = useRef();
  
    useFrame(() => {
      terrain.current.position.z += 0.4;
    });
    // Returns a mesh at GROUND_HEIGHT below the player. Scaled to 5000, 5000 with 128 segments.
    // X Rotation is -Math.PI / 2 which is 90 degrees in radians.
    return (
      <mesh
        visible
        position={[0, GROUND_HEIGHT, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={terrain}
      >
        <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={1}
          metalness={0}
          wireframe
        />
      </mesh>
    );
  }
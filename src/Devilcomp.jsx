/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 devilcomp.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Devilcomp(props) {
  const { nodes, materials } = useGLTF('./models/devilcomp.glb')
  return (
    <group {...props} dispose={null} castShadow >
      <mesh castShadow geometry={nodes.Sphere002.geometry} material={materials.Material} position={[-3.041, 21.407, -2.748]} rotation={[0.835, 0, 0]} scale={6.256} />
      <mesh castShadow geometry={nodes.Plane.geometry} material={materials['Material.001']} position={[11.982, 10.55, -24.722]} rotation={[0.152, 0.132, -1.068]} scale={6.002} />
      <mesh castShadow geometry={nodes.Icosphere004.geometry} material={materials.Material} position={[-2.667, -32.117, -9.917]} scale={3.554} />
      <mesh castShadow geometry={nodes.Icosphere001.geometry} material={materials.Material} position={[-2.667, 0.171, -9.917]} scale={3.554} />
      <group position={[-2.667, -15.423, -9.917]} scale={3.554}>
        <mesh castShadow geometry={nodes.Icosphere_1.geometry} material={materials.Material} />
        <mesh castShadow geometry={nodes.Icosphere_2.geometry} material={materials['Material.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/devilcomp.glb')

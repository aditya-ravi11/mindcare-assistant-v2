"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Cylinder } from "@react-three/drei"
import type * as THREE from "three"

function Plant() {
  const groupRef = useRef<THREE.Group>(null)
  const leavesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
    if (leavesRef.current) {
      leavesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.7) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Pot */}
      <Cylinder args={[1, 0.8, 1, 8]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Cylinder>

      {/* Soil */}
      <Cylinder args={[0.9, 0.9, 0.2, 8]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#4A4A4A" />
      </Cylinder>

      {/* Stem */}
      <Cylinder args={[0.1, 0.15, 2, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#228B22" />
      </Cylinder>

      {/* Leaves */}
      <group ref={leavesRef}>
        {/* Leaf 1 */}
        <Sphere args={[0.8, 8, 6]} position={[-0.8, 1.2, 0]} scale={[1, 0.6, 0.3]}>
          <meshStandardMaterial color="#32CD32" />
        </Sphere>

        {/* Leaf 2 */}
        <Sphere args={[0.7, 8, 6]} position={[0.7, 1.5, 0.3]} scale={[1, 0.5, 0.3]}>
          <meshStandardMaterial color="#228B22" />
        </Sphere>

        {/* Leaf 3 */}
        <Sphere args={[0.6, 8, 6]} position={[0, 2, -0.5]} scale={[1, 0.4, 0.3]}>
          <meshStandardMaterial color="#90EE90" />
        </Sphere>

        {/* Small leaves */}
        <Sphere args={[0.4, 8, 6]} position={[-0.3, 0.8, 0.4]} scale={[1, 0.3, 0.2]}>
          <meshStandardMaterial color="#32CD32" />
        </Sphere>

        <Sphere args={[0.3, 8, 6]} position={[0.4, 0.6, -0.3]} scale={[1, 0.3, 0.2]}>
          <meshStandardMaterial color="#228B22" />
        </Sphere>
      </group>
    </group>
  )
}

export function FloatingPlant() {
  return (
    <div className="w-full h-96 md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B5CF6" />
        <Plant />
      </Canvas>
    </div>
  )
}

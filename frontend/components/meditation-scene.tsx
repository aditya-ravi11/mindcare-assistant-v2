"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Torus } from "@react-three/drei"
import type * as THREE from "three"

// Meditation Character Component
function MeditationCharacter() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Body */}
      <Sphere args={[0.8, 16, 16]} position={[0, 0.5, 0]} scale={[1, 1.2, 0.8]}>
        <meshStandardMaterial color="#E8D5C4" />
      </Sphere>

      {/* Head */}
      <Sphere args={[0.5, 16, 16]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#F4E4D6" />
      </Sphere>

      {/* Arms in meditation pose */}
      <Sphere args={[0.2, 8, 8]} position={[-0.6, 0.8, 0.3]} scale={[2, 0.8, 0.8]}>
        <meshStandardMaterial color="#E8D5C4" />
      </Sphere>
      <Sphere args={[0.2, 8, 8]} position={[0.6, 0.8, 0.3]} scale={[2, 0.8, 0.8]}>
        <meshStandardMaterial color="#E8D5C4" />
      </Sphere>

      {/* Legs crossed */}
      <Sphere args={[0.3, 8, 8]} position={[-0.4, -0.2, 0.2]} scale={[1.5, 0.6, 1]}>
        <meshStandardMaterial color="#6B73FF" />
      </Sphere>
      <Sphere args={[0.3, 8, 8]} position={[0.4, -0.2, 0.2]} scale={[1.5, 0.6, 1]}>
        <meshStandardMaterial color="#6B73FF" />
      </Sphere>
    </group>
  )
}

// Floating Particles Component
function FloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 10] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.02 + 0.01,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i]
        child.position.y += particle.speed
        child.rotation.z += 0.01

        if (child.position.y > 4) {
          child.position.y = -4
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[particle.scale, 8, 8]} position={particle.position}>
          <meshStandardMaterial color="#B8E6B8" transparent opacity={0.6} emissive="#B8E6B8" emissiveIntensity={0.2} />
        </Sphere>
      ))}
    </group>
  )
}

// Ambient Orbs Component
function AmbientOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)
  const orb3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2
      orb1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 1 + 2
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 2.5
      orb2Ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.6) * 1.5
    }
    if (orb3Ref.current) {
      orb3Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.5 + 1.5
      orb3Ref.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 2
    }
  })

  return (
    <>
      <Sphere ref={orb1Ref} args={[0.3, 16, 16]} position={[2, 2, -1]}>
        <meshStandardMaterial color="#FFB6C1" transparent opacity={0.4} emissive="#FFB6C1" emissiveIntensity={0.3} />
      </Sphere>

      <Sphere ref={orb2Ref} args={[0.25, 16, 16]} position={[-2, 1, 1]}>
        <meshStandardMaterial color="#B8E6B8" transparent opacity={0.4} emissive="#B8E6B8" emissiveIntensity={0.3} />
      </Sphere>

      <Sphere ref={orb3Ref} args={[0.2, 16, 16]} position={[1, 1.5, 2]}>
        <meshStandardMaterial color="#DDA0DD" transparent opacity={0.4} emissive="#DDA0DD" emissiveIntensity={0.3} />
      </Sphere>
    </>
  )
}

// Energy Rings Component
function EnergyRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.5
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.3
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = state.clock.elapsedTime * 0.4
      ring3Ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.3
    }
  })

  return (
    <>
      <Torus ref={ring1Ref} args={[2, 0.05, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} emissive="#87CEEB" emissiveIntensity={0.2} />
      </Torus>

      <Torus ref={ring2Ref} args={[2.5, 0.03, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#DDA0DD" transparent opacity={0.2} emissive="#DDA0DD" emissiveIntensity={0.1} />
      </Torus>

      <Torus ref={ring3Ref} args={[3, 0.02, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F0E68C" transparent opacity={0.15} emissive="#F0E68C" emissiveIntensity={0.1} />
      </Torus>
    </>
  )
}

export function MeditationScene() {
  return (
    <div className="w-full h-96 md:h-[600px] relative overflow-hidden rounded-3xl">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }} style={{ background: "transparent" }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} color="#FFF8DC" />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#FFE4B5" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#E6E6FA" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#F0F8FF" angle={Math.PI / 4} penumbra={0.5} />

        {/* Scene Components */}
        <MeditationCharacter />
        <FloatingParticles />
        <AmbientOrbs />
        <EnergyRings />
      </Canvas>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 via-transparent to-purple-50/20 dark:from-slate-900/20 dark:to-purple-900/20 pointer-events-none" />
    </div>
  )
}

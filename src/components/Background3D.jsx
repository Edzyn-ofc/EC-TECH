import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, MeshDistortMaterial, Sphere, Float } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[2.2, 64, 64]} position={[3, 1, -4]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.5}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.5}
        />
      </Sphere>
    </Float>
  )
}

function SecondSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.08
    }
  })
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[-4, -2, -5]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.6}
          speed={1.2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </Float>
  )
}

function FloatingParticles({ count = 2000 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 25
      pos[i + 1] = (Math.random() - 0.5) * 25
      pos[i + 2] = (Math.random() - 0.5) * 25
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.015
      points.current.rotation.x = state.clock.elapsedTime * 0.005
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#8b5cf6"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#06b6d4" />
        <Stars radius={100} depth={60} count={4000} factor={4} saturation={0} fade speed={0.8} />
        <AnimatedSphere />
        <SecondSphere />
        <FloatingParticles count={1500} />
      </Canvas>
    </div>
  )
}
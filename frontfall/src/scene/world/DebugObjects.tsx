import type { JSX } from 'react'

type DebugShape = {
  id: string
  position: [number, number, number]
  geometry: JSX.Element
  color: string
}

const debugShapes: DebugShape[] = [
  {
    id: 'command-node',
    position: [-3, 0.6, -2],
    geometry: <boxGeometry args={[1.4, 1.2, 1.4]} />,
    color: '#5b8cff',
  },
  {
    id: 'relay-tower',
    position: [0, 0.9, 2.5],
    geometry: <cylinderGeometry args={[0.45, 0.45, 1.8, 24]} />,
    color: '#45c4a1',
  },
  {
    id: 'cargo-core',
    position: [3.5, 0.75, -0.5],
    geometry: <sphereGeometry args={[0.75, 32, 32]} />,
    color: '#ff8f6b',
  },
]

export function DebugObjects() {
  return (
    <group name="debug-objects">
      {debugShapes.map((shape) => (
        <mesh key={shape.id} position={shape.position} castShadow receiveShadow>
          {shape.geometry}
          <meshStandardMaterial color={shape.color} />
        </mesh>
      ))}
    </group>
  )
}

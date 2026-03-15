import { mapConfig } from '../../shared/config/mapConfig'

export function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      position={[0, 0, 0]}
      name="ground"
    >
      <planeGeometry args={[mapConfig.size.width, mapConfig.size.depth]} />
      <meshStandardMaterial color={mapConfig.colors.surface} />
    </mesh>
  )
}

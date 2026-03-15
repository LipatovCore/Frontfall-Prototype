export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#95a4c6" />
      <directionalLight
        castShadow
        intensity={1.35}
        color="#ffffff"
        position={[8, 18, 6]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  )
}

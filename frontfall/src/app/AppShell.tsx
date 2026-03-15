import { Canvas } from '@react-three/fiber'
import { GameScene } from '../scene/GameScene'

export function AppShell() {
  return (
    <main className="app-shell">
      <section className="scene-shell" aria-label="Frontfall tactical prototype">
        <Canvas shadows dpr={[1, 1.5]}>
          <GameScene />
        </Canvas>
      </section>
    </main>
  )
}

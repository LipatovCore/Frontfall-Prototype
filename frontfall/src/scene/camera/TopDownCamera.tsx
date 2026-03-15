import { OrthographicCamera } from '@react-three/drei'
import { useLayoutEffect, useRef } from 'react'
import type { OrthographicCamera as OrthographicCameraType } from 'three'
import { tacticalView } from '../../shared/config/tacticalView'

export function TopDownCamera() {
  const cameraRef = useRef<OrthographicCameraType>(null)

  useLayoutEffect(() => {
    const camera = cameraRef.current

    if (!camera) {
      return
    }

    camera.position.set(
      tacticalView.position[0],
      tacticalView.position[1],
      tacticalView.position[2],
    )
    camera.up.set(tacticalView.up[0], tacticalView.up[1], tacticalView.up[2])
    camera.lookAt(
      tacticalView.target[0],
      tacticalView.target[1],
      tacticalView.target[2],
    )
    camera.updateProjectionMatrix()
  }, [])

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      zoom={tacticalView.zoom}
      near={0.1}
      far={100}
    />
  )
}

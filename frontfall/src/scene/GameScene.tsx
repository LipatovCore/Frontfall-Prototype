import { useEffect, useState } from 'react'
import type { MapPosition } from '../shared/types/map'
import { initialPlayerUnits } from '../shared/config/playerUnits'
import { TopDownCamera } from './camera/TopDownCamera'
import { PlayerUnit } from './entities/PlayerUnit'
import { assignGroupTargetPositions } from './systems/groupTargetPositions'
import { SceneLights } from './world/SceneLights'
import { Ground } from './world/Ground'
import { MapLayout } from './world/MapLayout'

export function GameScene() {
  const [selectedUnitIds, setSelectedUnitIds] = useState<string[]>([])
  const [unitTargets, setUnitTargets] = useState<Record<string, MapPosition | null>>(() =>
    Object.fromEntries(initialPlayerUnits.map((unit) => [unit.id, null])),
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.code !== 'Escape') {
        return
      }

      setSelectedUnitIds([])
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function handleGroundClick(position: MapPosition) {
    if (selectedUnitIds.length === 0) {
      return
    }

    const targetAssignments = assignGroupTargetPositions(selectedUnitIds, position)

    setUnitTargets((currentTargets) => {
      const nextTargets = { ...currentTargets }

      for (const [unitId, targetPosition] of Object.entries(targetAssignments)) {
        nextTargets[unitId] = targetPosition
      }

      return nextTargets
    })
  }

  function handleUnitSelect(unitId: string, shouldToggleSelection: boolean) {
    setSelectedUnitIds((currentSelectedUnitIds) => {
      if (!shouldToggleSelection) {
        return [unitId]
      }

      if (currentSelectedUnitIds.includes(unitId)) {
        return currentSelectedUnitIds.filter((selectedUnitId) => selectedUnitId !== unitId)
      }

      return [...currentSelectedUnitIds, unitId]
    })
  }

  function handleTargetReached(unitId: string) {
    setUnitTargets((currentTargets) => {
      if (!currentTargets[unitId]) {
        return currentTargets
      }

      return {
        ...currentTargets,
        [unitId]: null,
      }
    })
  }

  return (
    <>
      <color attach="background" args={['#06080d']} />
      <fog attach="fog" args={['#06080d', 18, 36]} />
      <TopDownCamera />
      <SceneLights />
      <Ground onGroundClick={handleGroundClick} />
      <MapLayout />
      {initialPlayerUnits.map((unit) => (
        <PlayerUnit
          key={unit.id}
          unit={unit}
          isSelected={selectedUnitIds.includes(unit.id)}
          targetPosition={unitTargets[unit.id]}
          onSelect={handleUnitSelect}
          onTargetReached={handleTargetReached}
        />
      ))}
    </>
  )
}

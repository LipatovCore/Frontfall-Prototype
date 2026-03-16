import { initiallyUnlockedPlayerUnitDefinitionIds, playerUnitUnlocks } from '../../shared/config/playerUnlocks'
import type { ControlPointState } from '../../shared/types/map'
import type { PlayerUnlockState } from '../../shared/types/unlocks'

export function createInitialPlayerUnlockState(): PlayerUnlockState {
  return {
    unlockedUnitDefinitionIds: Object.fromEntries(
      initiallyUnlockedPlayerUnitDefinitionIds.map((unitDefinitionId) => [unitDefinitionId, true]),
    ),
  }
}

export function isPlayerUnitDefinitionUnlocked(
  unlockState: PlayerUnlockState,
  unitDefinitionId: string,
) {
  return unlockState.unlockedUnitDefinitionIds[unitDefinitionId] === true
}

export function syncPlayerUnlockState(
  unlockState: PlayerUnlockState,
  controlPoints: ControlPointState[],
): PlayerUnlockState {
  const unlockedUnitDefinitionIds = { ...unlockState.unlockedUnitDefinitionIds }
  let changed = false

  for (const unlock of playerUnitUnlocks) {
    const controlPoint = controlPoints.find((point) => point.id === unlock.pointId)

    if (!controlPoint || controlPoint.owner !== 'player') {
      continue
    }

    if (unlockedUnitDefinitionIds[unlock.unitDefinitionId]) {
      continue
    }

    unlockedUnitDefinitionIds[unlock.unitDefinitionId] = true
    changed = true
  }

  if (!changed) {
    return unlockState
  }

  return {
    unlockedUnitDefinitionIds,
  }
}

import type { MapPosition } from '../../shared/types/map'

const GROUP_SPACING = 1.1

export function assignGroupTargetPositions(
  unitIds: readonly string[],
  targetPosition: MapPosition,
): Record<string, MapPosition> {
  if (unitIds.length === 0) {
    return {}
  }

  if (unitIds.length === 1) {
    return {
      [unitIds[0]]: targetPosition,
    }
  }

  const columns = Math.ceil(Math.sqrt(unitIds.length))
  const rows = Math.ceil(unitIds.length / columns)
  const xCenterOffset = (columns - 1) / 2
  const zCenterOffset = (rows - 1) / 2

  return Object.fromEntries(
    unitIds.map((unitId, index) => {
      const column = index % columns
      const row = Math.floor(index / columns)
      const offsetX = (column - xCenterOffset) * GROUP_SPACING
      const offsetZ = (row - zCenterOffset) * GROUP_SPACING

      return [
        unitId,
        [targetPosition[0] + offsetX, targetPosition[1], targetPosition[2] + offsetZ] as MapPosition,
      ]
    }),
  )
}

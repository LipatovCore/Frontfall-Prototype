import type { UnitData } from '../types/unit'
import { playerUnitDefinitions } from './playerUnitDefinitions'

const rifleUnitTemplate = playerUnitDefinitions.find((definition) => definition.id === 'player-rifle-unit')?.template

if (!rifleUnitTemplate) {
  throw new Error('Missing player rifle unit definition.')
}

export const initialPlayerUnits: UnitData[] = [
  {
    id: 'player-unit-alpha',
    team: 'player',
    position: [-1.8, 0, 6.9],
    ...rifleUnitTemplate,
  },
  {
    id: 'player-unit-bravo',
    team: 'player',
    position: [0, 0, 6.3],
    ...rifleUnitTemplate,
  },
  {
    id: 'player-unit-charlie',
    team: 'player',
    position: [1.8, 0, 6.9],
    ...rifleUnitTemplate,
  },
]

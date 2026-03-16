export const initiallyUnlockedPlayerUnitDefinitionIds = ['player-rifle-unit'] as const

export const playerUnitUnlocks = [
  {
    pointId: 'unlock-spire',
    unitDefinitionId: 'player-heavy-unit',
  },
  {
    pointId: 'unlock-vault',
    unitDefinitionId: 'player-scout-unit',
  },
] as const

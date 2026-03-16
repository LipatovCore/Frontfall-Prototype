import type { ReinforcementConfig } from '../types/reinforcements'
import { playerUnitDefinitions } from './playerUnitDefinitions'

export const reinforcementConfig = {
  waveIntervalSeconds: 30,
  playerSpawnOffsets: [
    [-1.8, 0, -1.4],
    [0, 0, -1.4],
    [1.8, 0, -1.4],
    [-2.6, 0, -2.3],
    [-0.9, 0, -2.3],
    [0.9, 0, -2.3],
    [2.6, 0, -2.3],
    [-1.8, 0, -3.2],
    [0, 0, -3.2],
    [1.8, 0, -3.2],
  ],
  playerUnitDefinitions,
} satisfies ReinforcementConfig

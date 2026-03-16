import type { ReinforcementUnitDefinition } from '../types/reinforcements'

export const playerUnitDefinitions: ReinforcementUnitDefinition[] = [
  {
    id: 'player-rifle-unit',
    label: 'Rifle Unit',
    cost: 20,
    team: 'player',
    template: {
      moveSpeed: 4.6,
      stopDistance: 0.12,
      maxHealth: 100,
      currentHealth: 100,
      attackRange: 2.35,
      attackDamage: 12,
      attackCooldown: 0.75,
      attackCooldownRemaining: 0,
    },
  },
  {
    id: 'player-heavy-unit',
    label: 'Heavy Unit',
    cost: 35,
    team: 'player',
    template: {
      moveSpeed: 3.6,
      stopDistance: 0.14,
      maxHealth: 160,
      currentHealth: 160,
      attackRange: 2.8,
      attackDamage: 24,
      attackCooldown: 1.1,
      attackCooldownRemaining: 0,
    },
  },
  {
    id: 'player-scout-unit',
    label: 'Scout Unit',
    cost: 28,
    team: 'player',
    template: {
      moveSpeed: 5.8,
      stopDistance: 0.12,
      maxHealth: 75,
      currentHealth: 75,
      attackRange: 3.2,
      attackDamage: 10,
      attackCooldown: 0.45,
      attackCooldownRemaining: 0,
    },
  },
]

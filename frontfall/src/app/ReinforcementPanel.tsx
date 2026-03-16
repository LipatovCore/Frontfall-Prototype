import { mapConfig } from '../shared/config/mapConfig'
import { playerUnitUnlocks } from '../shared/config/playerUnlocks'
import { reinforcementConfig } from '../shared/config/reinforcements'
import { isPlayerUnitDefinitionUnlocked } from '../scene/systems/playerUnlocks'
import type { EconomyState } from '../shared/types/economy'
import type { WaveQueueItem } from '../shared/types/reinforcements'
import type { PlayerUnlockState } from '../shared/types/unlocks'

type ReinforcementPanelProps = {
  deploymentCycle: number
  economyState: EconomyState
  playerUnlockState: PlayerUnlockState
  waveQueue: WaveQueueItem[]
  waveTimerSeconds: number
  onQueueUnit: (definitionId: string) => void
}

function formatWaveTimer(timeRemainingSeconds: number) {
  const clampedSeconds = Math.max(0, Math.ceil(timeRemainingSeconds))
  const minutes = Math.floor(clampedSeconds / 60)
  const seconds = clampedSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function ReinforcementPanel({
  deploymentCycle,
  economyState,
  playerUnlockState,
  waveQueue,
  waveTimerSeconds,
  onQueueUnit,
}: ReinforcementPanelProps) {
  const queuedCounts = waveQueue.reduce<Record<string, number>>((counts, item) => {
    counts[item.definitionId] = (counts[item.definitionId] ?? 0) + 1
    return counts
  }, {})

  return (
    <aside className="reinforcement-panel" aria-label="Reinforcement controls">
      <div className="reinforcement-card">
        <span className="reinforcement-label">Next Wave</span>
        <strong className="reinforcement-timer">{formatWaveTimer(waveTimerSeconds)}</strong>
        <span className="reinforcement-cycle">Cycle {deploymentCycle}</span>
      </div>

      <div className="reinforcement-card">
        <span className="reinforcement-label">Available Units</span>
        <div className="reinforcement-actions">
          {reinforcementConfig.playerUnitDefinitions.map((definition) => {
            const isUnlocked = isPlayerUnitDefinitionUnlocked(playerUnlockState, definition.id)
            const canAfford = economyState.player.manpower >= definition.cost
            const unlock = playerUnitUnlocks.find((entry) => entry.unitDefinitionId === definition.id)
            const requiredPoint = unlock
              ? mapConfig.controlPoints.find((point) => point.id === unlock.pointId)
              : null
            const buttonLabel = !isUnlocked
              ? `Locked: capture ${requiredPoint?.label ?? 'unlock point'}`
              : canAfford
                ? 'Unlocked'
                : 'Unlocked, insufficient manpower'

            return (
              <button
                key={definition.id}
                type="button"
                className={`reinforcement-button ${isUnlocked ? '' : 'reinforcement-button-locked'}`.trim()}
                onClick={() => onQueueUnit(definition.id)}
                disabled={!isUnlocked || !canAfford}
              >
                <span className="reinforcement-button-copy">
                  <span className="reinforcement-button-title">
                    <span>{definition.label}</span>
                    <span>{definition.cost} MP</span>
                  </span>
                  <span className="reinforcement-button-state">{buttonLabel}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="reinforcement-card">
        <span className="reinforcement-label">Wave Queue</span>
        {waveQueue.length === 0 ? (
          <p className="reinforcement-empty">Queue is empty for the next deployment.</p>
        ) : (
          <ul className="reinforcement-queue" aria-label="Queued units">
            {reinforcementConfig.playerUnitDefinitions
              .filter((definition) => queuedCounts[definition.id])
              .map((definition) => (
                <li key={definition.id}>
                  <span>{definition.label}</span>
                  <strong>x{queuedCounts[definition.id]}</strong>
                </li>
              ))}
          </ul>
        )}
      </div>
    </aside>
  )
}

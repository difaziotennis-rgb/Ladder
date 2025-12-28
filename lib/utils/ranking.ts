import { Player } from '@/lib/types/database'

/**
 * Leapfrog ranking logic:
 * If a lower-ranked player beats a higher-ranked player,
 * they swap positions (or gain significant points)
 */
export function calculateRankingUpdate(
  winner: Player,
  loser: Player,
  currentPlayers: Player[]
): { winnerPoints: number; loserPoints: number } {
  const winnerRank = currentPlayers.findIndex(p => p.id === winner.id)
  const loserRank = currentPlayers.findIndex(p => p.id === loser.id)

  // If winner is already ranked higher, small point adjustment
  if (winnerRank < loserRank) {
    return {
      winnerPoints: winner.ranking_points + 10,
      loserPoints: Math.max(0, loser.ranking_points - 5),
    }
  }

  // If lower-ranked player beats higher-ranked player: LEAPFROG
  // Winner takes loser's position (points), loser drops down
  const pointsDifference = loser.ranking_points - winner.ranking_points
  const leapfrogBonus = Math.max(20, pointsDifference * 0.5)

  return {
    winnerPoints: loser.ranking_points + leapfrogBonus,
    loserPoints: Math.max(0, winner.ranking_points - 10),
  }
}

/**
 * Sort players by ranking points (descending)
 */
export function sortPlayersByRanking(players: Player[]): Player[] {
  return [...players].sort((a, b) => b.ranking_points - a.ranking_points)
}


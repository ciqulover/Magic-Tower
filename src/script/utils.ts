const gridCount = 11

export function indexToCoordinate(index: number): [number, number] {
  const x = index % gridCount
  const y = Math.floor(index / gridCount)
  return [x, y]
}

export function assign(target: any, varArgs: any) {
  const to = Object(target)
  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index]
    if (nextSource != null) {
      for (let nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey]
        }
      }
    }
  }
  return to
}

export function calcDamage(player: any, monster: any) {
  const damageToMonsterPerTurn = player.attack - monster.defence
  const damageToPlayerPerTurn = monster.attack - player.defence

  if (damageToMonsterPerTurn < 1) return false
  if (damageToPlayerPerTurn < 1) return 0

  const killMonsterTurns = Math.ceil(monster.life / damageToMonsterPerTurn)
  return killMonsterTurns * damageToPlayerPerTurn
}

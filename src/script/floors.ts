import {Creature} from './player'

class Floors {
  node: any
  creatures: any = {}
  level: number
  floorNodes: any

  showFloor(level: number) {
    this.node.childNodes[this.level].style.display = 'none'
    this.node.childNodes[level].style.display = 'block'
    this.level = level
  }

  removeCreature(level: number, index: number) {
    const creature = this.creatures[level][index].node
    creature.parentNode.removeChild(creature)
  }

  constructor(data: {floors: any, level: number}) {
    const createFloor = (floorData: any, level: number) => {
      const floorNode = document.createElement('div')
      floorNode.className = 'floor floor-' + level
      this.creatures[level] = {}
      floorData.background.forEach((className: string, j: number) => {
        const grid = document.createElement('div')
        // grid.textContent = j.toString()
        grid.className = 'base ' + className
        floorNode.appendChild(grid)
      })
      floorData.creatures.forEach((creatureData: any) => {
        const index = creatureData.ind
        const creatureEl = document.createElement('div')
        creatureEl.className = 'creature ' + creatureData.className
        const creature = new Creature({
          index,
          type: 'creature',
          size: 40,
          node: creatureEl,
        })
        floorNode.appendChild(creature.node)
        this.creatures[level][index] = creature
      })
      return floorNode
    }

    const fragment = document.createElement('div')
    this.floorNodes = data.floors.map((floorData: any, level: number) => createFloor(floorData, level))
    this.floorNodes.forEach((floorNode: any) => fragment.appendChild(floorNode))
    this.node = fragment
    this.level = data.level
  }
}

export default Floors

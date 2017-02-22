import * as utils from './utils'

const mapping: any = {
  0: 'up',
  1: 'right',
  2: 'down',
  3: 'left'
}

export class Creature {
  type: string
  size: number
  node: any
  x: number
  y: number
  timer: any
  gridCount: number = 11
  direction: number
  [props: string]: any


  get index(): number {
    return this.y * this.gridCount + this.x
  }

  set index(val: number) {
    const x = val % this.gridCount
    const y = Math.floor(val / this.gridCount)

    if (this.direction != null) {
      const deltaX = this.x - x
      const deltaY = this.y - y
      if (deltaX == -1) this.dir = 1
      else if (deltaX == 1) this.dir = 3
      else if (deltaY == -1) this.dir = 2
      else if (deltaY == 1) this.dir = 0
    }

    this.x = x
    this.y = y
    if (this.node) this.setPosition()
  }

  set dir(val: number) {
    if (this.node) {
      this.node.classList.remove(mapping[this.direction])
      this.node.classList.remove(mapping[this.direction] + 'Walking')
      this.node.classList.add(mapping[val])
      this.node.classList.add(mapping[val] + 'Walking')
      this.direction = val
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.node.classList.remove(mapping[val] + 'Walking')
      }, 300)
    }
  }

  constructor(humanProps: any) {
    utils.assign(this, humanProps)
    if (humanProps.index != undefined) this.setPosition()
  }

  setPosition() {
    this.node.style.left = this.x * this.size + 'px'
    this.node.style.top = this.y * this.size + (this.type === 'player' ? -20 : 0) + 'px'
  }

  remove() {
    this.node.parentNode.removeChild(this.node)
  }

}

export class Player extends Creature {
  //todo
  direction: number
  attack: number
  defence: number
  life: number
  exp: number
  money: number
  yellowKeys: number
  blueKeys: number
  redKeys: number
  playerLevel: number
  level: number
  monsters: any
  floors: any
  [propName: string]: any

  constructor(playerProps: any) {
    const player = document.createElement('div')
    player.className = 'player'
    super({
      node: player,
      type: 'player',
      size: playerProps.size,
      index: playerProps.index,
      direction: playerProps.direction
    })
    utils.assign(this, playerProps)
    this.node.classList.add(mapping[this.direction])
  }
}



import compile from './mvvm'

class Fight {
  name: string = 'default'
  life: number = 0
  money: number = 0
  attack: number = 0
  exp: number = 0
  defence: number = 0
  prepareFight: any
  pattern: any

  constructor() {
    this.prepareFight = document.querySelector('.prepareFight')
    this.pattern = this.prepareFight.querySelector('.left')
    compile(this.prepareFight, this)
  }

  setMonster(monsterData: any, node: any) {
    this.pattern.innerHTML = ''
    this.name = monsterData.name
    this.life = monsterData.life
    this.money = monsterData.money
    this.attack = monsterData.attack
    this.exp = monsterData.exp
    this.defence = monsterData.defence
    this.pattern.appendChild(node)
  }

  isShowing() {
    return this.prepareFight.style.display === 'block'
  }

  show() {
    this.prepareFight.style.display = 'block'
  }

  hide() {
    this.prepareFight.style.display = 'none'
  }
}

export default Fight

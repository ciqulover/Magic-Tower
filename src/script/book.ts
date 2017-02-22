import {calcDamage} from './utils'
import {Creature} from './player'
class Book {

  node: any
  isShowing: boolean

  constructor() {
    this.node = document.querySelector('.book')

  }

  show(player: any, monsters: any) {
    // this.node.innerHTML = ''
    const damages = monsters.map((monster: any) => calcDamage(player, monster))
    console.log(damages)

    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'


    const monsterPatterns = monsters.map((monster: any) => {
      const creatureEl = document.createElement('div')
      creatureEl.className = 'creature ' + monster.className
      return creatureEl
    })

    monsters.forEach((monster: any, index: number) => {
      const monsterEl = document.createElement('div')
      const name = document.createElement('div')
      name.className = 'monster-name'
      name.innerHTML = monster.name
      monsterEl.appendChild(monsterPatterns[index])
      monsterEl.appendChild(name)
      const text = document.createElement('div')
      const d = damages[index]
      text.className = 'text'
      text.innerHTML = `
        <span>生命: ${monster.life}</span><span>攻击: ${monster.attack}</span> <br>
        <span>金钱: ${monster.money}</span><span>防御: ${monster.defence} </span> <br>
        <span>经验: ${monster.exp}</span><span>损失: ${d === false ? '-' : d}</span>
          `
      monsterEl.appendChild(text)
      wrapper.appendChild(monsterEl)


    })
    this.node.appendChild(wrapper)
    this.isShowing = true
  }

  hide() {
    this.node.innerHTML = ''
    this.isShowing = false
  }


}


export default Book

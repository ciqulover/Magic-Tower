import Data from './script/data'
import Floors from './script/floors'
import DashBoard from './script/dashboard'
import Fight from './script/fight'
import Book from './script/book'
import Fly from './script/fly'
import PopUp from './script/popUp'
import {Player} from './script/player'
import {calcDamage} from './script/utils'

import './style/index.scss'

const home: any = document.querySelector('.home')
const gameBox = document.querySelector('main')
const goFloor = document.querySelector('.goFloor')
const book = new Book()
const popUp = new PopUp()
const fight = new Fight()

let dataObj: any
let dashboard: any
let floors: any
let player: any
let data: any
let fly: any
let handler: any

function init(archive?: any) {
  gameBox.innerHTML = ''
  dataObj = archive ? new Data(archive) : new Data()
  data = dataObj._data
  if (dashboard) dashboard.update(data)
  else dashboard = new DashBoard(data)
  floors = new Floors(data)
  player = new Player(data)
  fly = new Fly(floors.floorNodes)
  gameBox.appendChild(floors.node)
  gameBox.appendChild(player.node)
  floors.showFloor(data.level)
  home.style.display = 'none'
}


function checkNext(index: number, level: number) {

  const dataOfFloor = data.floors[level]
  if (dataOfFloor.paths.indexOf(index) > -1) return Promise.resolve(true)

  let type = -1
  let length = dataOfFloor.creatures.length
  // todo
  while (length--) {
    const creature = dataOfFloor.creatures[length]
    if (creature.ind === index) {
      type = creature.type
      break
    }
  }

  // downstairs & upstairs
  if (type === 11 || type === 12) {
    const newLevel = level + (type == 11 ? -1 : 1)
    const newIndex = data.floors[newLevel][type == 11 ? 'endIndex' : 'startIndex']
    player.node.classList.add('noTransition')
    if (newLevel > data.highestLevelEverBeen) data.highestLevelEverBeen = newLevel
    update('level', newLevel)
    update('index', newIndex)
    setTimeout(() => player.node.classList.remove('noTransition'), 100)
    floors.showFloor(newLevel)
    return Promise.resolve(false)
  }

  // encounter item
  if (type > 0 && type < 20) {
    if (type === 1) update('yellowKeys', player.yellowKeys + 1)
    else if (type === 2) update('blueKeys', player.blueKeys + 1)
    else if (type === 3) update('redKeys', player.redKeys + 1)
    else if (type === 4) {
      if (player.yellowKeys === 0) return Promise.resolve(false)
      update('yellowKeys', player.yellowKeys - 1)
    } else if (type === 5) {
      if (player.blueKeys === 0) return Promise.resolve(false)
      update('blueKeys', player.blueKeys - 1)
    } else if (type === 6) {
      if (player.redKeys === 0) return Promise.resolve(false)
      update('redKeys', player.redKeys - 1)
    } else if (type === 7) update('life', player.life + 200)
    else if (type === 8) update('life', player.life + 500)
    else if (type === 9) update('attack', player.attack + 3)
    else if (type === 10) update('defence', player.defence + 3)
    else if (type === 13) update('attack', player.attack + 10)
    else if (type === 14) update('defence', player.defence + 20)
    else if (type === 15) update('defence', player.money + 10)
    else if (type === 16) {
      popUp.setMessage(['得到十字架，所有属性提升40%!'], () => {
        update('life', Math.floor(data.life * 1.4))
        update('attack', Math.floor(data.attack * 1.4))
        update('defence', Math.floor(data.defence * 1.4))
      })
    } else if (type === 18) return Promise.resolve(false)
    else if (type === 19) {
      popUp.setMessage(data.humans[19].messages, () => {
        update('redKeys', data.redKeys + 1)
        update('blueKeys', data.blueKeys + 1)
        update('yellowKeys', data.yellowKeys + 1)
      })
    }

    const obj = floors.creatures[level][index]
    obj.remove()
    dataObj.removeCreature(level, index)
    return Promise.resolve(true)
  }

  // encounter monster
  if (type > 30 && type < 50) {
    const monster = data.monsters[type]
    const monsterEl = document.createElement('div')
    monsterEl.className = 'creature ' + monster.className
    fight.setMonster(monster, monsterEl)
    fight.show()

    return new Promise(function (resolve) {
      handler = resolve
    }).then((isConfirmed) => {
      fight.hide()
      if (!isConfirmed) return false
      if (win(type, player)) {
        const monster = floors.creatures[level][index]
        monster.remove()
        dataObj.removeCreature(level, index)
        if (type == 48) popUp.setMessage(['你赢了'], () => home.style.display = 'block')
        return true
      }
      return false
    })
  }

  if (type === 21) {
    const humanData = data.humans[21]
    if (!humanData.talked) {
      popUp.setMessage(humanData.messages1, () => {
        update('yellowKeys', player.yellowKeys + 1)
        update('blueKeys', player.blueKeys + 1)
        update('redKeys', player.redKeys + 1)
      })
      humanData.talked = true
      return Promise.resolve(false)
    }
    popUp.setMessage(humanData.messages2)
    return Promise.resolve(false)
  }

  if (type === 22) {
    const humanData = data.humans[22]
    if (humanData.talked) return Promise.resolve(false)
    popUp.setMessage(humanData.messages, () => {
      const wall = floors.creatures[2][56]
      wall.remove()
      dataObj.removeCreature(2, 56)
      humanData.talked = true
    })
    return Promise.resolve(false)
  }

  if (type === 26) {
    if (data.money < 20) {
      popUp.setMessage(data.humans.smallMoneyShop.messages)
      return Promise.resolve(false)
    }
    popUp.setShop('money', (prop: string, num: number) => {
      update(prop, data[prop] + num)
      update('money', data.money - 20)
    })
    return Promise.resolve(false)
  }

  if (type === 28) {
    if (data.exp < 20) {
      popUp.setMessage(data.humans.smallExpShop.messages)
      return Promise.resolve(false)
    }
    popUp.setShop('exp', (prop: string, num: number) => {
      update(prop, data[prop] + num)
      update('exp', data.exp - 20)
    })
    return Promise.resolve(false)
  }
  return Promise.resolve(false)
}


function win(type: number, player: any) {
  const monster = data.monsters[type]
  const damage = calcDamage(player, monster)
  if (damage === false || player.life <= damage) return false
  update('life', player.life - damage)
  update('exp', player.exp + monster.exp)
  update('money', player.money + monster.money)
  return true
}

function update(property: string, value: any) {
  const type = typeof data[property]
  data[property] = value
  if (type != 'object') {
    player[property] = value
    dashboard[property] = value
  }

}

document.addEventListener('keyup', function (e) {
  if (fight.isShowing() || !player) return
  const code = e.keyCode
  const index = player.index
  const gridCount = data.gridCount
  if ((code == 37 || code == 65) && index % gridCount !== 0) walk(37)
  else if ((code === 38 || code == 87) && index > gridCount - 1) walk(38)
  else if ((code === 39 || code == 68) && index % gridCount !== gridCount - 1) walk(39)
  else if ((code === 40 || code == 83) && index < gridCount * (gridCount - 1)) walk(40)
})


function walk(code: number) {
  const gridCount = data.gridCount
  const mapping: any = {
    37: -1,
    38: -gridCount,
    39: 1,
    40: gridCount,
  }
  const newIndex = player.index + mapping[code.toString()]
  checkNext(newIndex, data.level).then((allowToGo) => {
    if (allowToGo === true) update('index', newIndex)
  })
}

goFloor.addEventListener('click', function () {
  const selected = fly.lastSelected
  update('level', selected)
  update('index', data.floors[selected].startIndex)
  floors.showFloor(selected)
  fly.hide()
})

document.querySelector('.bookIcon').addEventListener('click', function () {
  if (book.isShowing) book.hide()
  else book.show(player, dataObj.getMonsterData(data.level))
})

document.querySelector('.flyIcon').addEventListener('click', function () {
  if (fly.isShowing) fly.hide()
  else fly.show(data.highestLevelEverBeen)
})

document.querySelector('.newGame').addEventListener('click', function () {
  init()
})

document.querySelector('.continue').addEventListener('click', function () {
  init(JSON.parse(localStorage.getItem('mt')))
})

document.querySelector('.homeIcon').addEventListener('click', function () {
  home.style.display = 'block'
})

document.querySelector('.save').addEventListener('click', function () {
  localStorage.setItem('mt', JSON.stringify(data))
  popUp.setMessage(['保存成功'])
})

document.querySelector('.goFighting').addEventListener('click', () => handler && handler(true))
document.querySelector('.stopFighting').addEventListener('click', () => handler && handler(false))

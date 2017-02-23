import compile from './mvvm'
import {assign} from './utils'

class DashBoard {
  node: any
  life: number
  money: number
  attack: number
  exp: number
  defence: number
  playerLevel: number
  level: number
  yellowKeys: number
  blueKeys: number
  redKeys: number

  [propName: string]: any

  constructor(dashBoardData: any) {

    assign(this, dashBoardData)

    this.node = document.querySelector('header')

    compile(this.node, this)
  }

  update(dashBoardData:any){

    this.life = dashBoardData.life
    this.money = dashBoardData.money
    this.attack = dashBoardData.attack
    this.exp = dashBoardData.exp
    this.defence = dashBoardData.defence
    this.playerLevel = dashBoardData.playerLevel
    this.level = dashBoardData.level
  }
}

export default DashBoard

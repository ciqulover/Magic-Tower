class Fly {

  fly: any
  levelNode: any
  thumbnailNode: any
  isShowing: boolean
  floorNodes: any
  goFloorNode: any
  levels: any
  lastSelected: number = 0

  constructor(floorNodes: any) {
    this.floorNodes = floorNodes
    this.fly = document.querySelector('.fly')
    this.levelNode = this.fly.querySelector('.levels')
    this.thumbnailNode = this.fly.querySelector('.thumbnail')
    this.goFloorNode = this.fly.querySelector('.goFloor')
    this.hide()

    const fragment = document.createDocumentFragment()

    this.levels = Array.apply(null, Array(22))
      .map((i: any, j: number) => {
        const div: any = document.createElement('div')
        div.textContent = '第' + j + '层'
        div['data-level'] = j.toString()
        fragment.appendChild(div)
        return div
      })
    this.levelNode.innerHTML = ''
    this.levelNode.appendChild(fragment)
    this.fly.addEventListener('click', (e: any) => {
      const target = e.target
      //todo
      const level = Number(target['data-level'])
      if (level || level === 0) this.showFloor(level, this.floorNodes[level].cloneNode(true))
    })
    this.showFloor(0, this.floorNodes[0].cloneNode(true))

  }

  showFloor(level: number = 0, node: any) {
    if (this.lastSelected == level && this.lastSelected != 0) return
    this.levels[this.lastSelected].classList.remove('focus')
    node.style.display = 'block'
    this.thumbnailNode.innerHTML = ''
    this.thumbnailNode.appendChild(node)
    this.levels[level].classList.add('focus')
    this.lastSelected = level
  }

  show(highestLevelEverBeen: number) {
    this.isShowing = true
    this.fly.style.display = 'block'
    this.levels.forEach((levelNode: any, level: number) => {
      levelNode.style.display = level <= highestLevelEverBeen ? 'block' : 'none'
    })
  }

  hide() {
    this.isShowing = false
    this.fly.style.display = 'none'
  }
}

export default Fly

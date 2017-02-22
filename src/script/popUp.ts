class popUp {
  node: any
  messages: any
  isShopping: boolean = false
  messageNode: any
  index: number
  cb: any

  constructor() {
    this.node = document.querySelector('.popUp')
    this.messageNode = this.node.querySelector('.message')

    this.node.addEventListener('click', () => {
      this.isShopping || this.next()
    })
  }

  setMessage(messages: any, cb?: any) {
    this.messages = messages
    this.index = 0
    if (typeof cb == 'function') this.cb = cb
    this.next()
    this.show()
  }

  next() {
    const message = this.messages[this.index++]
    if (!message) {
      this.hide()
      this.cb && this.cb()
      this.cb = null
      return
    }
    this.messageNode.textContent = message
  }

  show() {
    this.node.style.display = 'block'
  }

  hide() {
    this.node.style.display = 'none'
  }

  setShop(type: string, cb: any) {
    this.isShopping = true
    this.messageNode.innerHTML = ''
    const fragment = document.createDocumentFragment()

    const title = document.createElement('div')
    title.className = 'title'
    title.textContent = type == 'money'
      ? '给我20金币，你可以'
      : '给我20经验，你可以'
    const life = document.createElement('div')
    const attack = document.createElement('div')
    const defence = document.createElement('div')
    life.textContent = ' 增加100点生命'
    attack.textContent = ' 增加3点攻击'
    defence.textContent = ' 增加3点防御'

    fragment.appendChild(title)
    fragment.appendChild(attack)
    fragment.appendChild(defence)
    fragment.appendChild(life)

    this.messageNode.appendChild(fragment)

    this.node.addEventListener('click', (e: any) => {
      const target = e.target
      if (target == life) cb('life', 100)
      else if (target == attack) cb('attack', 3)
      else if (target == defence) cb('defence', 3)
      this.hide()
      this.isShopping = false
    })
    this.show()
  }
}

export default popUp

const defineReactive = (node: any, match: string, obj: any) => {
  let value = obj[match]
  node.nodeValue = node.nodeValue.replace('{{' + match + '}}', obj[match])
  Object.defineProperty(obj, match, {
    get: () => value,
    set: (val) => {
      if (value === val) return
      node.nodeValue = node.nodeValue.replace(value, val)
      value = val
    }
  })
}

function compile(nodes: any, obj: any) {
  const reg = /\{\{(.+)}}/
  Array.prototype.slice.call(nodes.childNodes).forEach((node: any) => {
    if (node.nodeType === 1) return compile(node, obj)
    if (node.nodeType === 3) {
      const matches = reg.exec(node.nodeValue)
      if (matches && matches[1]) defineReactive(node, matches[1], obj)
    }
  })
}

export default compile

function getNestedObject (root, [...keys]) {
  if (!root || !Array.isArray(keys)) {
    return null
  }
  const key = keys.shift()
  if (key && (root instanceof Object)) {
    return getNestedObject(root[key], keys)
  }
  return root
}

function updateNestedObject (root, [...keys], value) {
  // TODO: Return a clone of root instead of modifying the original one
  if (!keys.length) {
    return value
  }
  if (!root || !Array.isArray(keys)) {
    return null
  }
  const key = keys.shift()
  if (key && (root instanceof Object)) {
    return Object.assign(root, {
      [key]: updateNestedObject(root[key], keys, value)
    })
  }
  return root
}

export {
  getNestedObject,
  updateNestedObject
}
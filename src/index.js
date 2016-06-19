if (typeof $$code_block_info === 'undefined') {
  global.$$code_block_info = {}
}

const defaultCategory = '@@code_block_info/defaultCategory'

function pushInfo(category, info) {
  if (typeof info === 'undefined') {
    info = category
    category = defaultCategory
  }
  if ($$code_block_info.hasOwnProperty(category)) {
    $$code_block_info[category].push(info)
  } else {
    $$code_block_info[category] = [info]
  }
}

function popInfo(category) {
  if (typeof category === 'undefined') {
    category = defaultCategory
  }
  if ($$code_block_info.hasOwnProperty(category)) {
    $$code_block_info[category].pop()
  }
}

function getInfo(category) {
  if (typeof category === 'undefined') {
    category = defaultCategory
  }
  return $$code_block_info[category] || []
}

function block(category, info, callback) {
  if (typeof callback === 'undefined') {
    callback = info
    info = category
    category = defaultCategory
  }
  pushInfo(category, info)
  callback()
  popInfo(category)
}

function begin(category, info) {
  if (typeof info === 'undefined') {
    info = category
    category = defaultCategory
  }
  pushInfo(category, info)
}

function end(category) {
  if (typeof category === 'undefined') {
    category = defaultCategory
  }
  popInfo(category)
}

export { getInfo, block, begin, end }

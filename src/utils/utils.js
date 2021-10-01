import pickBy from 'lodash/pickBy'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const notEmpty = val => val === false || val === 0 || !!val

const filterNil = obj => pickBy(obj, notEmpty)


export {
  uuidv4,
  filterNil,
  notEmpty,
}

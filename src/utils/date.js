const date = new Date()
exports.now = `Às ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} in ${date.getDate()}/${
  date.getMonth() + 1
}/${date.getFullYear()}`

const date = new Date()
exports.now = `às ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} in ${date.getDate()}/${
  date.getMonth() + 1
}/${date.getFullYear()}`

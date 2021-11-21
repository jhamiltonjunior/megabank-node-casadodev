exports.paymentKey = (min = 1000, max = 9999) => {
  const number = []

  let index = 0

  for (index; index < 2; index++) {
    const randNumber = Math.floor(Math.random() * max + min)

    number.push(randNumber)
  }

  const numberCreated = number.join('-')

  return numberCreated
}

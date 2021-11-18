const fs = require('fs')
const path = require('path')

module.exports = app => {
  fs
    .readdirSync(__dirname)

    // vou procurar por todos os meus arquivos dentro desse diretorio
    // que não começam com dot (ponto, ".")
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.js')))

    // agora vou pegar todos os arquivos que sobraram dessa filtragem
    // e repassar o app nele
    .forEach(file => require(path.resolve(__dirname, file))(app))
}

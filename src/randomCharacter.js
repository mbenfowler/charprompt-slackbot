const characterJson = require("./character.json")
const { generator } = require("./generator")

function randomCharacter() {
    return generator(characterJson).template(characterJson.template)
}
module.exports = randomCharacter;
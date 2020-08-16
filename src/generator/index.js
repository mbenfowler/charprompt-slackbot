function generator(json) {
    return {
        template: function(template) {
            const split_template = template.split(' ')
            return split_template.map(word => {
                if (needsTemplateReplacement(word)) {
                    return pickRandom(json[getLookupKey(word)])
                }
                return word
            }).join(' ')
        }
    }
}

function needsTemplateReplacement(word) {
    return word.charAt(0) === '@'
}

function getLookupKey(key) {
    return key.substring(1)
}

function pickRandom(list) {
    var item = list[Math.floor(Math.random() * list.length)];
    return item
}

module.exports = {
    generator,
    needsTemplateReplacement,
    getLookupKey,
    pickRandom
}
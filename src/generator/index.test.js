const {generator, needsTemplateReplacement, getLookupKey, pickRandom} = require('./index');

function createRandomArray(length) {
    const arr = [];
    for (i=0; i < length; i++){
        arr.push(Math.random())
    }
    return arr;
}

test('picks a random item in an array', () => {
    const arr = createRandomArray(10000);
    const random1 = pickRandom(arr)
    const random2 = pickRandom(arr)
    expect(random1).not.toEqual(random2)
})

test('fills out a template', () => {
    const json = {location: ['kitchen'], animal: ['snake']}
    const templateStr = 'I like to play in the @location with my @animal'
    const replaced = generator(json).template(templateStr)
    expect(replaced).toBe('I like to play in the kitchen with my snake')

    const json2 = {location: ['kitchen', 'park'], animal: ['snake', 'cat']}
    const replaced2 = generator(json2).template(templateStr)
    const locations = json2['location']

    locations.forEach((word, index) => {
        const otherItemIndex = index === 0 ? 1 : 0;
        if (replaced2.includes(word)) {
            expect(replaced2).not.toContain(locations[otherItemIndex])
        }
    })    
});

test('detects words needing replacement', () => {
  expect(needsTemplateReplacement('@location')).toBe(true)
  expect(needsTemplateReplacement('location')).toBe(false)
})

test('finds lookup key', () => {
    expect(getLookupKey('@location')).toBe('location')
    expect(getLookupKey('@animal')).toBe('animal')
})
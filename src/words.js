import fs from 'fs'
import readline from 'readline'

const readWords = async () => {
    const words = []
    const stream = fs.createReadStream('..\\words_list.txt')
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })
    const pattern = /^[a-z]{5,5}$/
    for await (const line of rl) {
        if (pattern.test(line)) {
            words.push(line)
        }
    }
    return words
}

const calculateLetterProbabilities = (list) => {
    const probs = new Map()
    list.forEach(w => {
        for (let i = 0; i < w.length; i++) {
            let x = probs.get(w[i]) || 0
            probs.set(w[i], x+1)
        }
    })
    // Some letters should be more popular than other
    const bonus = ['t', 'n', 'r', 'h', 'd', 'l']
    bonus.forEach(l => {
        probs.set(l, probs.get(l) * 10)
    })
    return probs
}

const wordScore = (w, probs, candidates) => {
    let s = 0
    const used = new Map()
    for (let i = 0; i < w.length; i++) {
        if (candidates[i].indexOf(w[i]) > 0) {
            if (candidates[i].length == 0) {
                // when it's an only option for this position - make sure we use it
                s += 1000000
            } else {
                // give more priority for letters that are somewhere in the word
                s += 100000
            }
        }
        if (candidates[i].indexOf(w[i]) < 0) {
            // make sure that we don't use words where we know that this letter is not present
            s -= 10000000
        }
        if (used.has(w[i])) {
            continue
        }
        let x = probs.get(w[i]) || 0
        used.set(w[i], true)
        s += x
    }
    return s
}

const findBestWord = (words, probs, candidates) => {
    let best = '', score = 0
    words.forEach(w => {
        const s = wordScore(w, probs, candidates)
        if (s > score) {
            score = s
            best = w
        }
    })
    return best
}

export { readWords, calculateLetterProbabilities, findBestWord }
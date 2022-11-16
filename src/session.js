import { calculateLetterProbabilities, findBestWord } from './words.js'
import {feedback} from './feedback.js'

const initializeCandidates = () => {
    const candidates = []
    for (let i = 0; i < 5; i++) {
        const allLetters = []
        for (let ch = 'a'.charCodeAt(0); ch <= 'z'.charCodeAt(0); ch++) {
            allLetters.push(String.fromCharCode(ch))
        }
        candidates.push(allLetters)
    }
    return candidates
}

const filterWords = (words, candidates) => {
    const isCandidate = w => {
        for (let i = 0; i < 5; i++) {
            const ch = w[i]
            if (candidates[i].indexOf(ch) < 0) {
                return false
            }
        }
        return true
    }
    return words.filter(w => isCandidate(w))
}

class Session {
    constructor(words) {
        this.words = words
        this.candidates = initializeCandidates() // letter candidates for each position
        this.probs = calculateLetterProbabilities(this.words)
    }

    getWord = () => {
        this.words = filterWords(this.words, this.candidates)
        console.log(`Has ${this.words.length} words`)
        const word = findBestWord(this.words, this.probs, this.candidates)
        this.words = this.words.filter(w => w != word)
        return word
    }

    giveFeedback = (word, statuses) => {
        for (let i = 0; i < 5; i++) {
            const s = statuses[i]
            const ch = word[i]
            if (s == feedback.CORRECT_SPOT) {
                // for correct spot make sure that this position has only one option
                this.candidates[i] = [ch]
            } else if (s == feedback.DIFFERENT_SPOT) {
                // don't use this letter for current position any more
                this.candidates[i] = this.candidates[i].filter(e => e != ch)
            } else if (s == feedback.WRONG) {
                // exclude this letter from all positions
                for (let j = 0; j < 5; j++) {
                    this.candidates[j] = this.candidates[j].filter(e => e != ch)
                }
            }
        }
        
    }

    delay = (time) => {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }
}

export { Session }
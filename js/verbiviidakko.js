'use strict'

let corrAnswers = 0;

const verbs = ['Maata', 'Juoda', 'Karjua', 'Kiivetä', 'Roikkua', 'Nukkua', 'Haukotella', 'Lentää', 'Syödä', 'Nuolla', 'Kävellä', 'Kaivaa', 'Juosta', 'Lyödä', 'Hypätä']

const questions = [
    {
        img: '0.png',
        verb: 'Maata',
        sentence: 'Tiikeri <strong>makaa</strong> maassa.',
        conjsPos: ['makaan', 'makaat', 'makaa', 'makaamme', 'makaatte', 'makaavat', 'maataan'],
        conjsNeg: ['en makaa', 'et makaa', 'ei makaa', 'emme makaa', 'ette makaa', 'eivät makaa', 'ei maata']
    },
    {
        img: '1.png',
        verb: 'Juoda',
        sentence: 'Tiikeri <strong>juo</strong> vettä.',
        conjsPos: ['juon', 'juot', 'juo', 'juomme', 'juotte', 'juovat', 'juodaan'],
        conjsNeg: ['en juo', 'et juo', 'ei juo', 'emme juo', 'ette juo', 'eivät juo', 'ei juoda']
    }
]
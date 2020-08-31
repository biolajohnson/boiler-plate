
// const multiplier = {
//     numbers: [3, 5, 6, 9],
//     multiplyBy: 3,
//     multiply(){
//         return this.numbers.map((number) => number * this.multiplyBy)
//     }
// }
// console.log(multiplier.multiply())

//es6 classes 

class Person {
    constructor(name = 'Anonymous', age = 0){
        this.name = name,
        this.age = age
    }
    getGreeting() {
        return `Hi. I am ${this.name}`
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old`
    }
}
class Student extends Person {
    constructor(name, age, major = undefined) {
        super(name, age)
        this.major = major
    }

    getMajor() {
        return !!this.major
    }

    getDescription(){
        let description = super.getDescription()
        return description
    }
    
}

class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age)
        this.homeLocation = homeLocation
    }

    getGreeting(){
        let greeting = super.getGreeting()
        if(this.homeLocation){
            greeting += `. I am from ${this.homeLocation}, Where are you from?`
        }
        return greeting
    }
    
   
}


const abiola = new Traveler('Abiola', 23, 'Lagos')
const other = new  Traveler()
console.log(other.getDescription())
console.log(abiola.getGreeting())


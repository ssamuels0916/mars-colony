// Create classes we'll use in Mars Colony; encounter, job, alien, colonists
// For my benefit, allows me to think about what types of data are being passed around the application
// use classes as types to make sure that we get errors in code editor if we miss information in our data.
// think about data  (data model) in application before building UI

export class Encounter {
    constructor(
        public id: number,
        public date: string,
        public colonist_id: number,
        public atype: string,
        public action: string
    ) {}

}
export class Colonist {
    constructor(
        public name: string,
        public job: Job,
        public id: number,
        public age: number
    ) {}

}
export class Job {
    constructor(
        public name: string,
        public id: number,
        public description: string
        ) {}

}
export class Alien {
    constructor(
        public type: string,
        public submitted_by: string,
        public id: number,
        public description: string
        ) {}

}


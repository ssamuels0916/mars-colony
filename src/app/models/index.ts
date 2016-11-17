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
export interface Encounter {
        id: number;
        date: string;
        colonist_id: number;
        atype: string;
        action: string;

}
export class NewEncounter {
    constructor(
       public atype: string,
        public date: string,
        public action: string,
        public colonist_id: number
    ) {}

}

export class NewColonist {
    constructor(
        public name: string,
        public job_id: string,
        public age: number
    ) {}

}
export interface Colonist {
        name: string;
         job: Job;
         id: number;
         age: number;

}
export interface Job {
        name: string;
        id: number;
        description: string;

}
export interface Alien {
        type: string;
         submitted_by: string;
         id: number;
         description: string;

}



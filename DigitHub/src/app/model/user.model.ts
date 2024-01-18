export class User {
    constructor(
        public first_name : string,
        public last_name : string,
        public mail : string,
        public password : string,
        public birthdate : string,
        public role : number,
        public user_id?: number,
        public token?: string,
        public code?: string,
        public authdata?: string
    ){}
}

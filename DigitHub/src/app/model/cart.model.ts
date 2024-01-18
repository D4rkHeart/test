export class Cart {
    constructor(
        public user_fk : number,
        public product_fk : number,
        public quantity : number,
        ){}
}

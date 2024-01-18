import { DecimalPipe } from "@angular/common";

export class Order {
    constructor(
        public cart_fk: number,
        public amount: number,
        public status: string,
        public created_at: Date,
        public upated_at: Date,
        public order_id?: number
    ){}
}

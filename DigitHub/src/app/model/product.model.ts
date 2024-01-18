import { SafeUrl } from "@angular/platform-browser";

export class Product {
    constructor(
        public category_fk: number,
        public name: string,
        public description: string,
        public price: number,
        public image_path?: string,
        public image? : string,
        public imageURL? : SafeUrl,
        public quantity?: number,
        public product_id?: number
    ){}
}

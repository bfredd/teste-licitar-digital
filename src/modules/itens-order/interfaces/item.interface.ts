export interface ItemInterface {
    calculateTotalWithTax(totalPrice: number, type:string): Promise<number>;
}
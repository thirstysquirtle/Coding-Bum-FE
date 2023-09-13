import { writable } from "svelte/store";

export enum paymentFlowStep {
    SetPrice,
    Checkout,
    SetPassword,
    Fail
}



export const paymentFlowStore = writable(paymentFlowStep.SetPrice) 
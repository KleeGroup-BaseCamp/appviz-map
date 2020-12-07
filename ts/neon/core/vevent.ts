import { Component } from "."

export interface VEvent {
    readonly sourceComponent: Component
    readonly action: string
    readonly payload? : any
}
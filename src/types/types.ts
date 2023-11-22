import { ErrorResponse } from "@remix-run/router";
import { FormEvent, ReactInstance, ReactNode } from "react";

export type ImagesStrictTypes = {

}

export type VanTypes = {
    id:  ReactNode | ReactInstance  ,
    name: string,
    imageUrl: string,
    description: string,
    price: number, 
    type: string,
    hostId?: string | number,
    vans : {
       vans: VanTypes[]
    }
    all: VanTypes[]
}

export type StyleTypes = {
    fontWeight?: string,
    textDecoration?: string,
    color?: string,
    isActive?: boolean,
}

export type ContextType = { currentVan: VanTypes | null }

export type TypeParamsVan =  "simple" | "luxury" | "rugged" | null

export type TypeLiteral = 'type'

export interface RouteError extends ErrorResponse {
    message: string
  }

  export interface EventAuth extends FormEvent<HTMLFormElement> {
    target: HTMLFormElement & {
      email: HTMLInputElement
      password: HTMLInputElement
    }
  }

  export type ParamTypes = {
    params: {
      id?: string | null
    },
    request: Request
  }

  export type LoginStrictType = boolean

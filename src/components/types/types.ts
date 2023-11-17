import { ReactInstance, ReactNode } from "react";

export type VanTypes = {
    id:  ReactNode | ReactInstance,
    name: string,
    imageUrl: string,
    description: string,
    price: number, 
    type: string,
    hostId?: string | number,
}

export type StyleTypes = {
    fontWeight?: string,
    textDecoration?: string,
    color?: string,
    isActive?: boolean,
}

export type ContextType = { currentVan: VanTypes | null };

export type TypeParamsVan =  "simple" | "luxury" | "rugged" | null

export type TypeLiteral = 'type'



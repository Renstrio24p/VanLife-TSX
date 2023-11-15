export type VanTypes = {
    id: number | string,
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
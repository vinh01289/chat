export interface ProductByShopDto{
    totalCount:number;
    items:Array<ProductDto>
}

export interface ProductDto {
    id: string,
    code: string,
    name: string,
    status: number,
    keyword: string,
    description: string,
    productContent: string,
    ratingAverage:number,
    likeCount: number,
    followCount: number,
    buyCount: number,
    priority: number
}
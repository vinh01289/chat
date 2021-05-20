import { orderDetailDto } from "./orderDetailDto";

export interface orderDto{
    id: string;
    shopId: string;

    code: string;
    paymentAmount: number;

    status: number;
    creationTime: Date;
    hadReviewForShop: boolean;
    orderDetails: orderDetailDto[];
  }

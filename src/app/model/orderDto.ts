import { orderDetailDto } from "./orderDetailDto";

export interface orderDto{
    id: string;
    code: string;
    paymentAmount: string;
    hadReviewForShop: boolean;
    orderDetails: orderDetailDto[];
  }

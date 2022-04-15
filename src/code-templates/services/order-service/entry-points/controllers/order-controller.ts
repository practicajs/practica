import { Route, Get, Post, Delete, Body, Path, Tags } from "tsoa";
import { getOrder, addOrder, deleteOrder } from "../../business-logic/order-service";

@Route("orders")
@Tags("Order")
export default class OrderController {

  @Get("/:id")
  public async getOrder(@Path() id: string) {
    return await getOrder(Number(id))
  }

  @Post("/")
  public async addOrder(@Body() body) {
    return await addOrder(body)
  }

  @Delete("/:id")
  public async deleteOrder(@Path() id: string) {
    return await deleteOrder(Number(id))
  }
  
}

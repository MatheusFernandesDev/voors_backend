import { Request, Response } from 'express';
import listAllOrderService from './services/list-all-order.service';
import createOrderService from './services/create-order.service';

class OrderController {
  async listAllOrder(req: Request, res: Response) {
    try {
      const orders = await listAllOrderService();
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: 'Pedidos não encontrados' });
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const order = await createOrderService(req.body);
      return res.status(200).json(order);
    } catch (error) {
      if (error instanceof Error) {
        const messageError = error.message;
        const formartMessage = messageError.replace(
          /^Erro de validação:\s*/,
          '',
        );

        return res.status(400).json({ error: formartMessage });
      } else {
        return res.status(500).json({ error: 'Erro interno do servidor.' });
      }
    }
  }
}

export const orderController = new OrderController();

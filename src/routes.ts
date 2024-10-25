import express, { Request, Response } from 'express';
import { sizeController } from './app/web/sizes/size.controller';
import { flavorController } from './app/web/flavors/flavor.controller';
import { customizationController } from './app/web/customization/customization.controller';
import { orderController } from './app/web/orders/order.controller';
const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('running....');
});

//TAMANHOS
routes.get('/sizes', (req: Request, res: Response) => {
  sizeController.listAllSizes(req, res);
});

//SABORES

routes.get('/flavors', (req: Request, res: Response) => {
  flavorController.listAllFlavors(req, res);
});

//PERSONALIZACOES

routes.get('/customizations', (req: Request, res: Response) => {
  customizationController.listAllCustomization(req, res);
});

//PEDIDOS

routes.get('/orders', (req: Request, res: Response) => {
  orderController.listAllOrder(req, res);
});

routes.post('/order', (req: Request, res: Response) => {
  orderController.createOrder(req, res);
});

export default routes;

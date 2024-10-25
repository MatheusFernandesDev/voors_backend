import { Request, Response } from 'express';
import listAllFlavorsService from './services/list-all-flavors.service';

class FlavorController {
  async listAllFlavors(req: Request, res: Response) {
    try {
      const flavors = await listAllFlavorsService();
      return res.status(200).json(flavors);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: 'Sabores de Pizzas não encontrados' });
    }
  }
}

export const flavorController = new FlavorController();

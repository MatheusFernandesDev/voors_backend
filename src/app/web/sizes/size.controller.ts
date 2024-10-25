import { Request, Response } from 'express';
import listAllSizesService from './services/list-all-sizes.service';

class SizeController {
  async listAllSizes(req: Request, res: Response) {
    try {
      const sizes = await listAllSizesService();
      return res.status(200).json(sizes);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ msg: 'Tamanhos de Pizzas não encontrados' });
    }
  }
}

export const sizeController = new SizeController();

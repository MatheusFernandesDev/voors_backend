import { Request, Response } from 'express';
import listAllCustomizationService from './services/list-all-customization.service';

class CustomizationController {
  async listAllCustomization(req: Request, res: Response) {
    try {
      const customization = await listAllCustomizationService();
      return res.status(200).json(customization);
    } catch (error) {
      return res.status(400).json({ msg: 'Personalização não encontrada' });
    }
  }
}

export const customizationController = new CustomizationController();

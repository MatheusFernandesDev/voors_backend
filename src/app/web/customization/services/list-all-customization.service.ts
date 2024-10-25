import { Customizes } from '../../../models/Customize';

export default async function listAllCustomizationService() {
  const customization = await Customizes.findAll();
  return customization;
}

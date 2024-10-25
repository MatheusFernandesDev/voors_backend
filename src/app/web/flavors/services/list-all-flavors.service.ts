import { Flavors } from '../../../models/Flavor';

export default async function listAllFlavorsService() {
  const flavors = await Flavors.findAll();
  return flavors;
}

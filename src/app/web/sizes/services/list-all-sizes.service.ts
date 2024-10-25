import { Sizes } from '../../../models/Size';

export default async function listAllSizesService() {
  const sizes = await Sizes.findAll();

  return sizes;
}

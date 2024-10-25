import { Orders, OrderItems } from '../../../models/';

import listAllSizesService from '../../sizes/services/list-all-sizes.service';
import listAllFlavorsService from '../../flavors/services/list-all-flavors.service';
import listAllCustomizationService from '../../customization/services/list-all-customization.service';
import { createOrderSchema } from '../validation/create-order-schema';
import core from '../../../../database/connection';
import { OrderDTO } from '../dto/index';
import { calculateTotal } from '../../../../helper/calculeTotal';

export default async function createOrderService(dto: OrderDTO) {
  const { error, value } = createOrderSchema.validate(dto);

  if (error) {
    console.error('Erro de validação:', error);
    throw new Error(`Erro de validação: ${error.message}`);
  }

  const sizes = await listAllSizesService();
  const flavors = await listAllFlavorsService();
  const extras = await listAllCustomizationService();

  const sizeOrder = sizes.find((element) => element.id === value.size);
  const flavorOrder = flavors.find((element) => element.id === value.flavor);

  const uniqueCustomizations = [...new Set(value.customizations)];
  const extrasOrder = extras.filter((extra) =>
    uniqueCustomizations.includes(extra.id),
  );

  if (!sizeOrder) {
    throw new Error(`Tamanho da pizza '${value.size}' não encontrado.`);
  }

  if (!flavorOrder) {
    throw new Error(`Sabor da pizza '${value.flavor}' não encontrado.`);
  }

  const { totalPrice, preparationTime } = calculateTotal(
    sizeOrder,
    flavorOrder,
    extrasOrder,
  );

  const transaction = await core.connection?.transaction();
  try {
    const newOrder = await Orders.create(
      {
        total_price: totalPrice,
        total_time: preparationTime,
      },
      { transaction },
    );

    const orderDetails = {
      order_id: newOrder.id,
      size_id: sizeOrder.id,
      flavor_id: flavorOrder.id,
      customization_ids: extrasOrder.map((extra) => extra.id) || [],
    };

    await OrderItems.create(orderDetails as any, { transaction });

    await transaction?.commit();

    return {
      orderId: newOrder.id,
      totalPrice,
      preparationTime,
      size: sizeOrder.name,
      flavor: flavorOrder.name,
      customizations: extrasOrder.map((extra) => extra.name) || [],
    };
  } catch (error: any) {
    await transaction?.rollback();
    throw new Error(`Falha ao criar pedido: ${error.message}`);
  }
}

import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Orders } from './Order';
import { Sizes } from './Size';
import { Flavors } from './Flavor';

@Table({
  timestamps: false,
  tableName: 'orders_items',
})
export class OrderItems extends Model<OrderItems> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Orders)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  order_id!: string;

  @ForeignKey(() => Sizes)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  size_id!: string;

  @ForeignKey(() => Flavors)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  flavor_id!: string;

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    allowNull: true,
  })
  customization_ids!: string[] | null;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  created_at!: Date;
}

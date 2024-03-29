import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

/**
 * Measure entity
 */
@Entity('measures')
export class Measure {
  /**
   * Id of the measure
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
   * Product that has this measure
   */
  @ManyToOne(type => Product, product => product.measures)
  product: Promise<Product>;
  /**
   * Measure type
   */
  @Column()
  measure: string;
  /**
   * Amount for the measure
   */
  @Column()
  amount: number;
  /**
   * Grams per measure
   */
  @Column()
  gramsPerMeasure: number;
}

import { Entity, PrimaryKey, Property } from '@mikro-orm/core/decorators';

@Entity()
export class Example {
    @PrimaryKey()
      id!: number;

    @Property()
      title!: string;

    @Property()
      createdAt = new Date();

    @Property({
      onUpdate: () => new Date(),
    })
      updatedAt = new Date();
}

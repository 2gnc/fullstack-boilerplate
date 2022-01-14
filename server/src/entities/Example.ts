import { Entity, PrimaryKey, Property } from '@mikro-orm/core/decorators';

@Entity()
export class Example {
    @PrimaryKey()
        id!: number;

    @Property({
        type: 'text',
    })
        title!: string;

    @Property({
        type: 'date',
    })
        createdAt = new Date();

    @Property({
        onUpdate: () => new Date(),
        type: 'date',
    })
        updatedAt = new Date();
}

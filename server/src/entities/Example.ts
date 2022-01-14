import { Entity, PrimaryKey, Property } from '@mikro-orm/core/decorators';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Example {
    @Field()
    @PrimaryKey()
        id!: number;

    @Field()
    @Property({
        type: 'text',
    })
        title!: string;

    @Field(() => String)
    @Property({
        type: 'date',
    })
        createdAt = new Date();

    @Field(() => String)
    @Property({
        onUpdate: () => new Date(),
        type: 'date',
    })
        updatedAt = new Date();
}

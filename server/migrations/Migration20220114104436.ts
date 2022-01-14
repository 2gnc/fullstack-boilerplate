import { Migration } from '@mikro-orm/migrations';

export class Migration20220114104436 extends Migration {
    async up(): Promise<void> {
        this.addSql('create table "example" ("id" serial primary key, "title" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    }
}

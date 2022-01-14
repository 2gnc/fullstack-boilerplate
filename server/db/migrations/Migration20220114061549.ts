import { Migration } from '@mikro-orm/migrations';

export class Migration20220114061549 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "example" ("id" serial primary key, "title" varchar(255) not null, "created_at" jsonb not null, "updated_at" jsonb not null);');
  }

}

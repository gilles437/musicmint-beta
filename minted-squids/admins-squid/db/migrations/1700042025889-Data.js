module.exports = class Data1700042025889 {
    name = 'Data1700042025889'

    async up(db) {
        await db.query(`CREATE TABLE "owner" ("id" character varying NOT NULL, "balance" numeric NOT NULL, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "role" text, "amount" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block" integer NOT NULL, "contract" character varying NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_be54ea276e0f665ffc38630fc0" ON "transfer" ("from") `)
        await db.query(`CREATE INDEX "IDX_4cbc37e8c3b47ded161f44c24f" ON "transfer" ("to") `)
        await db.query(`CREATE INDEX "IDX_8d46ef064e80b54dcc21ba8de9" ON "transfer" ("role") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transfers_from_id" character varying, "transfers_to_id" character varying, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ab8a6c61c6b2b5fc1f88656549" ON "account" ("transfers_from_id") `)
        await db.query(`CREATE INDEX "IDX_d45e59fa2ec1aede407e5f14d6" ON "account" ("transfers_to_id") `)
        await db.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_ab8a6c61c6b2b5fc1f88656549a" FOREIGN KEY ("transfers_from_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_d45e59fa2ec1aede407e5f14d6d" FOREIGN KEY ("transfers_to_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "owner"`)
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_be54ea276e0f665ffc38630fc0"`)
        await db.query(`DROP INDEX "public"."IDX_4cbc37e8c3b47ded161f44c24f"`)
        await db.query(`DROP INDEX "public"."IDX_8d46ef064e80b54dcc21ba8de9"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP INDEX "public"."IDX_ab8a6c61c6b2b5fc1f88656549"`)
        await db.query(`DROP INDEX "public"."IDX_d45e59fa2ec1aede407e5f14d6"`)
        await db.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_ab8a6c61c6b2b5fc1f88656549a"`)
        await db.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_d45e59fa2ec1aede407e5f14d6d"`)
    }
}

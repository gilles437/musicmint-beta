import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class MintItems {
    constructor(props?: Partial<MintItems>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    block!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("text", {nullable: true})
    extrinsicHash!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: false})
    from!: string

    @Index_()
    @Column_("text", {nullable: false})
    to!: string

    @Index_()
    @Column_("text", {nullable: true})
    uri!: string | undefined | null

    @Index_()
    @Column_("int4", {nullable: false})
    albumid!: number

    @Index_()
    @Column_("int4", {nullable: false})
    songid!: number

    @Index_()
    @Column_("int4", {nullable: false})
    maxsupply!: number

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price!: bigint

    @Column_("text", {nullable: false})
    contract!: string

    @Column_("timestamp with time zone", {nullable: true})
    updatedAt!: Date | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    deletedAt!: Date | undefined | null
}

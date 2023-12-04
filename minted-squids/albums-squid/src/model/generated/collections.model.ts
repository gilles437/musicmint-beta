import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Collections {
    constructor(props?: Partial<Collections>) {
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
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    albumid!: bigint

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    songid!: bigint

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    maxsupply!: bigint

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price!: bigint

    @Column_("text", {nullable: false})
    contract!: string
}
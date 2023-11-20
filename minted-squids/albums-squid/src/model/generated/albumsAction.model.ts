import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class AlbumsAction {
    constructor(props?: Partial<AlbumsAction>) {
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
    @Column_("text", {nullable: true})
    albumid!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    songid!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    maxsupply!: string | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    fee!: bigint

    @Column_("text", {nullable: false})
    contract!: string
}

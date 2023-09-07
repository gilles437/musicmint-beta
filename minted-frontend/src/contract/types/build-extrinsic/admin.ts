/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/admin';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * addSuperAdmin
	 *
	 * @param { ArgumentTypes.AccountId } newAdmin,
	*/
	"addSuperAdmin" (
		newAdmin: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "addSuperAdmin", [newAdmin], __options);
	}

	/**
	 * removeSuperAdmin
	 *
	 * @param { ArgumentTypes.AccountId } admin,
	*/
	"removeSuperAdmin" (
		admin: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "removeSuperAdmin", [admin], __options);
	}

	/**
	 * addAdmin
	 *
	 * @param { ArgumentTypes.AccountId } newAdmin,
	*/
	"addAdmin" (
		newAdmin: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "addAdmin", [newAdmin], __options);
	}

	/**
	 * removeAdmin
	 *
	 * @param { ArgumentTypes.AccountId } admin,
	*/
	"removeAdmin" (
		admin: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "removeAdmin", [admin], __options);
	}

	/**
	 * getRole
	 *
	 * @param { ArgumentTypes.AccountId } admin,
	*/
	"getRole" (
		admin: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getRole", [admin], __options);
	}

	/**
	 * getAllAdmins
	 *
	*/
	"getAllAdmins" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getAllAdmins", [], __options);
	}

	/**
	 * getAllSuperAdmins
	 *
	*/
	"getAllSuperAdmins" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getAllSuperAdmins", [], __options);
	}

}
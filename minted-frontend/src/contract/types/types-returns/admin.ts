import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	notOwner = 'NotOwner',
	notSuperAdmin = 'NotSuperAdmin',
	adminAlreadyExist = 'AdminAlreadyExist',
	superAdminAlreadyExist = 'SuperAdminAlreadyExist'
}

export enum Role {
	none = 'None',
	admin = 'Admin',
	superAdmin = 'SuperAdmin'
}


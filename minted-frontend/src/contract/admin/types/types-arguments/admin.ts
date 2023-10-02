import type BN from 'bn.js';

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


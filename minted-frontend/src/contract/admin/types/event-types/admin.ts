import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/admin';

export interface Granted {
	from: ReturnTypes.AccountId;
	to: ReturnTypes.AccountId;
	role: ReturnTypes.Role;
}


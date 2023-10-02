import dotenv from 'dotenv'

dotenv.config()

let currentEnv: Env

export interface EnvironmentParameter {
  rpc: string
}

export const ENV = {
  shibuya: 'shibuya',
  local: 'local',
} as const

export type Env = (typeof ENV)[keyof typeof ENV]

export const getCurrentEnv = (): Env => currentEnv

export const valueOf = (env: Env): EnvironmentParameter =>
  ENV_PARAMS[env] || ENV_PARAMS[ENV.local]

const ENV_PARAMS: Record<Env, EnvironmentParameter> = {
  [ENV.shibuya]: {
    rpc: 'wss://shibuya-rpc.dwellir.com',
  },
  [ENV.local]: {
    rpc: 'ws://127.0.0.1:9944',
  },
}


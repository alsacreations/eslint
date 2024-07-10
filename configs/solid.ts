import tseslint, { type ConfigWithExtends } from 'typescript-eslint'
import solid from 'eslint-plugin-solid/configs/recommended'

const config = tseslint.config(solid as unknown as ConfigWithExtends)
export default config as unknown[]

import tseslint, { type ConfigWithExtends } from 'typescript-eslint'
import solid from 'eslint-plugin-solid/configs/recommended'

export default tseslint.config(solid as unknown as ConfigWithExtends)

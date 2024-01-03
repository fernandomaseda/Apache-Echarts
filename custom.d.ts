/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXAMPLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg' {
  import React = require('react')

  export const ReactComponent: React.FC<React.HTMLAttributes<HTMLOrSVGElement>>
  const src: string
  export default src
}

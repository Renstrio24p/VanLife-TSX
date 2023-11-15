import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as path from 'path';
import { Root } from 'react-dom/client';

// Declare the exports of the 'react' and 'react-dom' modules
declare global {
  const React: typeof React;
  const ReactDOM: typeof ReactDOM;

  const createRoot: (container: Element | DocumentFragment | null) => Root;

  declare module "*";

  declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }

  declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
  }

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {
  React,
  ReactDOM,
  createRoot,
  path,
};

declare module 'require-context' {
  function requireContext(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ): {
    keys(): string[];
    <T>(id: string): T;
  }

  export = requireContext;
}

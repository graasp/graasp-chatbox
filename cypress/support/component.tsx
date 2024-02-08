// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import buildI18n from '@graasp/translations';

import { mount } from 'cypress/react';

import './commands';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', (component) => {
  const i18n = buildI18n().use(initReactI18next);
  const theme = createTheme();
  const wrapped = (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {component}
      </ThemeProvider>
    </I18nextProvider>
  );
  return mount(wrapped);
});

// Example use:
// cy.mount(<MyComponent />)

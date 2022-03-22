export const mockUseAvatar = (name: string): Cypress.Agent<sinon.SinonSpy> =>
  cy
    .spy(() => {
      return {
        data: new Blob(['someText']),
        isLoading: false,
        isFetching: false,
      };
    })
    .as(name);

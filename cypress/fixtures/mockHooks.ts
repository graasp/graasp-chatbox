type SpyHookType = {
  hook: Cypress.Agent<sinon.SinonSpy>;
  name: string;
};

const USE_AVATAR_HOOK_NAME = 'useAvatarHook';

export const mockUseAvatar = (): SpyHookType => ({
  hook: cy
    .spy(() => {
      return {
        data: new Blob(['someText']),
        isLoading: false,
        isFetching: false,
      };
    })
    .as(USE_AVATAR_HOOK_NAME),
  name: USE_AVATAR_HOOK_NAME,
});

// todo
// export const mockUseMentions = (): QueryObserverResult<List<MemberRecord>> => ({
//   id: '123',
//   mentions: [
//     {
//       id: '1234',
//     },
//   ],
// });

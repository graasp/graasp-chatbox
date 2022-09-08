export const getMention = (textContent: string): RegExpMatchArray | null =>
  textContent.match(
    /<!@(?<name>[\s\w]+)>\[(?<id>[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12})]/i,
  );

export const normalizeMentions = (message: string): string => {
  const regexMentions =
    /`<!@([\s\w]+)>\[([\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12})]`/gi;
  return message.replace(regexMentions, '@$1');
};

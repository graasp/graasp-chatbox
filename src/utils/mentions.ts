const mentionRegEx =
  /<!@(?<name>[\s\w]+)>\[(?<id>[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12})]/i;

const mentionCodeRegEx =
  /`<!@(?<name>[\s\w]+)>\[(?<id>[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12})]`/gi;
export const getMention = (textContent: string): RegExpMatchArray | null =>
  textContent.match(mentionRegEx);

export const getAllMentions = (
  textContent: string,
): { id: string; name: string }[] => {
  const arr = Array.from(
    textContent.matchAll(new RegExp(mentionRegEx, 'g')),
  ).map((match) => ({
    id: match.groups?.id || '',
    name: match.groups?.name || '',
  }));
  return arr.filter(({ id, name }) => id && name);
};

export const normalizeMentions = (message: string): string =>
  message.replaceAll(mentionCodeRegEx, '@$<name>');

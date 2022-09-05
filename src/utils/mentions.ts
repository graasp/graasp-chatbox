const mentionRegEx =
  /<!@(?<name>[\s\w]+)>\[(?<id>[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12})]/i;

const mentionCodeRegEx =
  /`<!@(?<name>[\s\w]+)>\[(?<id>[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12})]`/i;
export const getMention = (textContent: string): RegExpMatchArray | null =>
  textContent.match(mentionRegEx);

export const getAllMentions = (
  textContent: string,
): { id: string; name: string }[] => {
  console.log('Message to analyze', textContent);
  const tempArr = Array.from(
    textContent.matchAll(new RegExp(mentionRegEx, 'g')),
  );
  console.log('found matches', tempArr);
  const arr = tempArr.map((match) => ({
    id: match.groups?.id || '',
    name: match.groups?.name || '',
  }));
  console.log('found mentions', arr);
  return arr.filter(({ id, name }) => id && name);
};

export const normalizeMentions = (message: string): string =>
  message.replaceAll(new RegExp(mentionCodeRegEx, 'g'), '@$<name>');

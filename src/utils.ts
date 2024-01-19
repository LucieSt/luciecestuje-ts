export const formatTitleToURL = (title: string) => {

  // czech special characters
  const accentsMap: { [key: string]: string } = { á: 'a', č: 'c', ď: 'd', é: 'e', ě: 'e', í: 'i', ň: 'n', ó: 'o', ř: 'r', š: 's', ť: 't', ú: 'u', ů: 'u', ý: 'y', ž: 'z' };
  
  return title
    .toLowerCase()
    .split('')
    .map(char => accentsMap[char] || char)
    .join('')
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word chars
};

// text format of line breaks
// export const formatTextWithLineBreaks = (text: string) => {
//   return text.split('\n').map((line: string, index: number, array: string[]) => (
//     <>
//       {line}
//       {index !== array.length - 1 && <br />}
//     </>
//   ));
// };
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

export const addParamsToImageUrl = (url: string, additionalParams = "") => {
  const urlParts = url.split('/upload/');
  return `${urlParts[0]}/upload/c_scale,w_auto/dpr_auto/${additionalParams}${urlParts[1]}`;
};
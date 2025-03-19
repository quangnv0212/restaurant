import 'server-only';

const dictionaries = {
  en: () => import('@/app/dictionaries/en.json').then(module => module.default),
  nl: () => import('@/app/dictionaries/nl.json').then(module => module.default),
};

type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    throw new Error(`Dictionary for locale "${locale}" not found`);
  }
  return dictionaries[locale]();
};

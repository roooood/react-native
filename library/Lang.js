import I18n from 'react-native-i18n';
import en from '../locales/en';
import fa from '../locales/fa';

I18n.fallbacks = true;
I18n.locale = 'fa';
I18n.translations = {en,fa};


export function strings(name, params = {}) {
  return I18n.t(name, params);
};
export function setDefault(name) {
    I18n.locale = name;
};

export default I18n;
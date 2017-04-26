import { loadTranslations, setLocale } from 'react-redux-i18n';
import localization from '../localization';

export const loadLocalization = () => {
  return dispatch => {
    dispatch(loadTranslations(localization));
    dispatch(setLocale('en'));
  };
};

export const changeLanguage = (locale) => {
  return dispatch => {
    dispatch(setLocale(locale));
  };
};

/* eslint-disable import/no-duplicates */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { configureTestStore } from '../store/configureStore';
import { TestProvider } from '../utils/testUtils';
import * as types from '../constants/actionTypes';
import * as languageActions from '../actions/languageActions';

import App from '../components/App';
import TravelInsurancePage from '../containers/TravelInsurance/TravelInsurancePage';

import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import localization from './index';
import { I18n } from 'react-redux-i18n';

describe('Localization', () => {
  const store = configureTestStore();
  syncTranslationWithStore(store);
  store.dispatch(loadTranslations(localization));

  const mountApp = (store) => mount(
    <TestProvider store={store}>
      <TravelInsurancePage />
    </TestProvider>
  );

  it('should have initial locale EN', () => {
    store.dispatch(setLocale('en'));

    const wrapper = mountApp(store);
    const nextState = store.getState();

    expect(nextState.i18n.locale).to.equal('en');
    expect(wrapper.find('.home_header').first().text()).to.equal('Your Travel Information');
  });

  it('should have initial locale ID', () => {
    store.dispatch(setLocale('id'));

    const wrapper = mountApp(store);
    const nextState = store.getState();

    expect(nextState.i18n.locale).to.equal('id');
    expect(wrapper.find('.home_header').first().text()).to.equal('ID-Your Travel Information');
  });

  it('should change / switch language when locale is clicked', () => {
    store.dispatch(setLocale('en'));

    const changeLanguage = (locale) => {
      return (() => {
        store.dispatch(setLocale(locale));
        return store.dispatch({ type: types.LANGUAGE_CHANGE });
      })();
    };

    sinon.stub(languageActions, 'changeLanguage', changeLanguage);

    const wrapper = mount(
      <TestProvider store={store}>
        <App>
          <TravelInsurancePage />
        </App>
      </TestProvider>
    );

    const previousState = store.getState();
    expect(previousState.i18n.locale).to.equal('en');

    const localeIDBtn = wrapper.find('.nav-item').last().children();
    const localeENBtn = wrapper.find('.nav-item').at(2).childAt(0);
    // change language to id
    localeIDBtn.simulate('click');

    const nextState = store.getState();
    expect(nextState.i18n.locale).to.equal('id');
    expect(wrapper.find('.home_header').first().text()).to.equal('ID-Your Travel Information');

    // change language back to en
    localeENBtn.simulate('click');
    expect(store.getState().i18n.locale).to.equal('en');
    expect(wrapper.find('.home_header').first().text()).to.equal('Your Travel Information');
    languageActions.changeLanguage.restore();
  });

  it('should get default translation when nothing is found', () => {
    store.dispatch(setLocale('en'));
    const wrapper = mount(
      <TestProvider store={store}>
        <div>
          <h1 className="not-found">{I18n.t('labels.dummyText')}</h1>
          <h1 className="found">{I18n.t('titles.AXAGeneralInsuranceID')}</h1>
        </div>
      </TestProvider>
    );

    // By default when i18n cannot find the text from localization,
    // it will take the name ('dummyText') from context ('labels')
    // and text will be in pascal case.
    expect(wrapper.find('.not-found').text()).to.equal('Dummy Text');
    expect(wrapper.find('.not-found').text()).to.not.equal('Dummy text');

    // if exist.
    // make sure it's not reusing the name as default
    expect(wrapper.find('.found').text()).to.not.equal('AXA General Insurance ID');
    // check from localization
    expect(wrapper.find('.found').text()).to.equal('AXA General Insurance Indonesia');
  });
});

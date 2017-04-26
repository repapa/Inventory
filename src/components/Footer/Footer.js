import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { I18n } from 'react-redux-i18n';

const Footer = () => (
  <div className="footer">
    <Container>
      <div className="footer-box">
        <Row>
          <Col xs={6} sm={6} md={3} lg={3}>
            <div className="footer-title">{I18n.t('titles.AXAandAnda')}</div>
            <ul>
              <li><a href="https://www.axa.com" target="_blank">{I18n.t('titles.AXAGroup')}</a></li>
              <li><a href="https://www.axa.com" target="_blank">{I18n.t('titles.AXAGeneralInsuranceID')}</a></li>
              <li><a href="https://www.axa.com" target="_blank">{I18n.t('titles.career')}</a></li>
            </ul>
          </Col>
          <Col xs={6} sm={6} md={3} lg={3}>
            <div className="footer-title">{I18n.t('titles.laln')}</div>
            <ul>
              <li><a href="https://www.axa.com" target="_blank">{I18n.t('titles.AXAGroup')}</a></li>
              <li><a href="https://www.axa.com" target="_blank">{I18n.t('titles.AXAGeneralInsuranceID')}</a></li>
              <li><a href="https://www.axa.com" target="_blank">{I18n.t('titles.career')}</a></li>
            </ul>
          </Col>
          <Col xs={6} sm={6} md={3} lg={3}>
            <div className="footer-title">{I18n.t('titles.stayConnected')}</div>
            <div className="btn-social-group">
              <a href="https://www.axa.com" className="btn-social" target="_blank"><i className="fa fa-2x fa-facebook"></i></a>
              <a href="https://www.axa.com" className="btn-social" target="_blank"><i className="fa fa-2x fa-twitter"></i></a>
              <a href="https://www.axa.com" className="btn-social" target="_blank"><i className="fa fa-2x fa-youtube"></i></a>
              <a href="https://www.axa.com" className="btn-social" target="_blank"><i className="fa fa-2x fa-linkedin"></i></a>
            </div>
          </Col>
          <Col xs={6} sm={6} md={3} lg={3}>
            <div className="footer-title">{I18n.t('titles.AXAWorldwide')}</div>
          </Col>
        </Row>
      </div>
    </Container>
    <div className="footer-disclaimer">
      {I18n.t('contents.disclaimer')}
    </div>
  </div>
);

export default Footer;


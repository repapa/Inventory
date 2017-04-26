import React from 'react';
import { Link } from 'react-router';
import { Container, Row, Col } from 'react-grid-system';
import { I18n } from 'react-redux-i18n';

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} style={{ textAlign: 'center' }}>
          <h4>
            {I18n.t('messages.oops')}
          </h4>
          <p style={{ maxWidth: 'none' }}>
            {I18n.t('messages.cantFind')}
          </p>
          <p style={{ maxWidth: 'none' }}>
            <Link to="/"> {I18n.t('buttons.backToHomePage')} </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

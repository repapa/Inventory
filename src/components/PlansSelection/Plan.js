import React, { PropTypes } from 'react';
import { Col, Row, Panel } from 'react-bootstrap';

const PLAN_GRID_SIZE_MIN = 3;

const Plan = ({ plan, fee, onSelect, onExpand, isSelected, isExpanded, gridSize = PLAN_GRID_SIZE_MIN }) => {
  return (
    <Col className="plan" key={plan.planId} xs={12} md={gridSize < PLAN_GRID_SIZE_MIN ? PLAN_GRID_SIZE_MIN : gridSize}>
      <Panel className={`plan ${isSelected ? 'selected' : ''}`}>
        <Row className="hidden-sm-down">
          <Col md={12}>
            <h6 className="text-center">{plan.planName}</h6>
          </Col>

          <Col md={12} className="text-center">
            <div className="fee">{fee}</div>
          </Col>
        </Row>

        <div className="hidden-sm-down">
          {isSelected ?
            <button className="btn btn-block" disabled>Selected</button> :
            <button onClick={onSelect.bind(null, plan)} className="btn btn-axa btn-block">Select</button>
          }

          <p className="details">
            Plan details
          </p>
        </div>

        {/** tablet and mobile plan*/}
        <Row className="hidden-md-up">
          <Col xs={6}>
            <h6 className="text-left"><strong>{plan.planName}</strong></h6>
          </Col>

          <Col xs={6} className="text-right">
            <div className="fee">{fee}</div>
          </Col>

          {isExpanded && (
            <Col xs={12}>
                Plan details
                {isSelected ?
                  <button className="btn btn-block" disabled>Selected</button> :
                  <button onClick={onSelect} className="btn btn-axa btn-block">Select</button>
                }
            </Col>
          )}

          <Col xs={12}>
            <a onClick={onExpand} className="btn-expand">
              {isExpanded ?
                <span>Less info...</span> :
                <span>More info...</span>
              }
            </a>
          </Col>
        </Row>

      </Panel>
    </Col>
  );
};

Plan.propTypes = {
  plan: PropTypes.object,
  fee: PropTypes.string,
  onSelect: PropTypes.func,
  onExpand: PropTypes.func,
  isSelected: PropTypes.bool,
  isExpanded: PropTypes.bool,
  gridSize: PropTypes.number
};

export default Plan;

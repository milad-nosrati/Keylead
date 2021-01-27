import React, { memo } from 'react'
import { Row, Col } from 'react-bootstrap'

const HeaderComponent = () => {
    return (
        <Row className='headerRow' >
            <Col className='d-flex flex-row mt-3'  >
                <h3>سامانه مدیریت کارها</h3>
            </Col>
        </Row>
    )
}

export default memo(HeaderComponent)
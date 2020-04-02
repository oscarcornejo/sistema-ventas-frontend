import React from 'react';
import PropTypes from 'prop-types';

// REDUX
import { connect } from 'react-redux';
import { Alert } from 'antd';

const AlertMessage = ({alerts}) => {
    
    return (
        alerts !== null && alerts.length > 0 && alerts.map( item => (
            <div key={item.id} className={`alert alert-${item.alertType}`}>
                {item.msg}
            </div>
        ))
    )
}

AlertMessage.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    // PROPS SETEADAS EN EL REDUCERS
        alerts: state.alertReducers
})



export default connect(mapStateToProps)(AlertMessage);
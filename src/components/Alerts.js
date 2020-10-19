import React, { useContext } from 'react';
import Context from '../context/Context';

export const Alerts = () => {
  const context = useContext(Context);
  const { alerts } = context;
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' />
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;

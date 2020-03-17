import React from 'react';
import configData from '../data/index';

function WelcomeModal() {
  return (
    <div className="welcome-modal-container">
      <div className="welcome-title">{configData.modalText}</div>
    </div>
  );
}
export default WelcomeModal;

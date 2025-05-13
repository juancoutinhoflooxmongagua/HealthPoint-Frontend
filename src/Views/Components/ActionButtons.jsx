import React from 'react';

const ActionButtons = () => {
  return (
    <>
      <button
        className="position-fixed bottom-0 start-0 m-3 rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#0d6efd',
          color: 'white',
          border: 'none',
        }}
        onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
      >
        <i className="bi bi-whatsapp"></i>
      </button>

      <button
        className="btn btn-primary position-fixed bottom-0 end-0 m-3 rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{ width: '60px', height: '60px', fontSize: '28px' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </>
  );
};

export default ActionButtons;

import React from 'react';
import Calendario from '../calendario/calendario';
import './citas.css';

const Citas = () => {
    const today = new Date();
    // Establece la hora a 00:00 para una comparación precisa
    today.setHours(0, 0, 0, 0);

    return (
        <div className="citas-container">
            <h2 className='titulo-citas-dia'>Citas del día de hoy</h2>
            <Calendario
                defaultView='agenda'
                defaultDate={today}
                views={['agenda']}
                filterDate={today}
                readonly={true}
                toolbar={false} // Oculta la barra de navegación
            />
        </div>
    );
};

export default Citas;

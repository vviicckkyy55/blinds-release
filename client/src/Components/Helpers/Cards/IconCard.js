import React from 'react';

import './card.css';

function IconCard({ Icon }) {
    return (
        <div className="iconCard">
            <Icon className="iconCard_thumbnail" />
        </div> 
    );
}

export default IconCard;
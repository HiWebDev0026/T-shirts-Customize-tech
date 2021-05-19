import React from 'react';

export default function FavoritesItems ({favorite}) {
    return(
        <div>
            <img src={favorite.image} alt={favorite.name} width='100' height='150'/>
            <h5>{favorite.name}</h5>
            <h5>{favorite.price}</h5>
        </div>
    )
}
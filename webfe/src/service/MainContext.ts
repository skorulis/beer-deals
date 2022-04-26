import React, { createContext } from 'react';

export interface IMainContext {
    location?: GeolocationCoordinates
}


const defaultState = {
    location: undefined
}

const MainContext = createContext<IMainContext>(defaultState);

export default MainContext;

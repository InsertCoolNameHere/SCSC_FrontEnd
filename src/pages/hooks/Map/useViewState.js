import { useState } from 'react';
import { TRANSITION_EVENTS } from 'deck.gl';

export default function useViewState(Deck) {
    const INITIAL_VIEW_STATE = {
        longitude: -95.7129,
        latitude: 37.0902,
        zoom: 4.2,
        pitch: 30,
        bearing: 0
    };

    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

    const context = { viewState, setViewState, Deck };

    return {
        viewState,
        zoom: (offset) => zoom(offset, context),
        applyNewViewState: (newViewState) => applyNewViewState(newViewState, context),
        zoomToTriangle: (id) => zoomToTriangle(id, context),
        handleJoystick: (stick) => handleJoystick(stick, context)
    };
}

function applyNewViewState(newViewState, context) {
    const { zoom } = newViewState;
    const newZoom = zoom > 22 ? 22 : zoom;
    context.setViewState({
        ...newViewState, // Allows adding attributes like an interpolator easily
        zoom: newZoom,
        transitionInterruption: TRANSITION_EVENTS.IGNORE
    });
}

function zoom(offset, context) {
    const zoom = context.viewState.zoom + offset;
    applyNewViewState({
        ...context.viewState, // Fill in unchanged values
        zoom,
        transitionDuration: 100
    }, context);
}

function handleJoystick(stick, context) {
    const { viewState } = context;
    applyNewViewState({
        ...viewState,
        pitch: 30 + stick.y * 30,
        bearing: stick.x * 30,
    }, context);
}

function zoomToTriangle(id, context) {
    const { viewState, Deck } = context;
    const coordinates = Deck.functions.getTriangleLocation(id);
    applyNewViewState({
        ...viewState,
        longitude: coordinates[0],
        latitude: coordinates[1],
        zoom: 17
    }, context);
}
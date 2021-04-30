import { keyframes } from 'styled-components';


export const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;


export const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;


export const zoomInFadeIn = keyframes`
	0% {
        opacity: 0;
        transform: scale(.9);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;


export const zoomOutFadeOut = keyframes`
	0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
`;
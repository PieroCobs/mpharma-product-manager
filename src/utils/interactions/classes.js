import { css } from 'styled-components';
import {
   fadeIn, fadeOut,
   zoomInFadeIn, zoomOutFadeOut,
	slideRightFadeOut, slideLeftFadeIn
} from './definitions'


const baseStyle = css`
	animation-timing-function: ease-out;
	animation-fill-mode: both;
	backface-visibility: false;
`;

export const fadeInCss = css`
	${baseStyle};
	animation-name: ${fadeIn};
`;

export const fadeOutCss = css`
	${baseStyle};
	animation-name: ${fadeOut};
`;

export const zoomInFadeInCss = css`
	${baseStyle};
	animation-fill-mode: both;
	animation-name: ${zoomInFadeIn};
`;

export const zoomOutFadeOutCss = css`
	${baseStyle};
	animation-fill-mode: both;
	animation-name: ${zoomOutFadeOut};
`;

export const slideRightFadeOutCss = css`
	${baseStyle};
	animation-name: ${slideRightFadeOut};
`;

export const slideLeftFadeInCss = css`
	${baseStyle};
	animation-name: ${slideLeftFadeIn};
`;
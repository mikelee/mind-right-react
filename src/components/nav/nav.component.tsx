import React, { useState } from 'react';

import './nav.styles.scss';

import Menu from '../menu/menu.component';

const Nav = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <div className='nav'>
            {
                menuVisible
                ? <Menu />
                : null
            }
            <svg className='menu-button' onClick={toggleMenu} width="150px" height="65px" viewBox="-10 -10 170 85" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <title>menu_icon</title>
                <defs>
                    <rect id="path-1" x="0" y="60" width="150" height="5" rx="2.5"></rect>
                    <filter x="-8.3%" y="-250.0%" width="119.3%" height="680.0%" filterUnits="objectBoundingBox" id="filter-2">
                        <feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="2" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <rect id="path-3" x="0" y="30" width="125" height="5" rx="2.5"></rect>
                    <filter x="-10.0%" y="-250.0%" width="123.2%" height="680.0%" filterUnits="objectBoundingBox" id="filter-4">
                        <feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="2" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <rect id="path-5" x="0" y="0" width="150" height="5" rx="2.5"></rect>
                    <filter x="-8.3%" y="-250.0%" width="119.3%" height="680.0%" filterUnits="objectBoundingBox" id="filter-6">
                        <feMorphology radius="1.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="2" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Bottom">
                        <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"></use>
                    </g>
                    <g id="Middle">
                        <use fill="black" fillOpacity="1" filter="url(#filter-4)" xlinkHref="#path-3"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-3"></use>
                    </g>
                    <g id="Top">
                        <use fill="black" fillOpacity="1" filter="url(#filter-6)" xlinkHref="#path-5"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-5"></use>
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default Nav;
import React from 'react';

const setBannerStyle = (display: string): void => {
    const banner = window.top.document.getElementsByClassName('simplebar-content')[1];
    banner.setAttribute('style', `display: ${display}`);
};

export const hideTopBanner = (): void => {
    setBannerStyle('none');
};

export const storyWrapper = (storyFn: any): any => {
    setBannerStyle('unset');
    //TODO: Maybe auto-navigate users to the canvas when they switch stories when they are on the Notes tab.
    return <>{storyFn()}</>;
};

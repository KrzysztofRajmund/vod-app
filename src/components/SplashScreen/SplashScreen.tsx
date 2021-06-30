import React from 'react';
//components
import SplashLoader from './SplashLoader';

const SplashScreen: React.FC = () => {

    return (
        <section className='splashScreen'>
            <h1>
                vod
            </h1>
            <SplashLoader />
        </section>
    );
};

export default SplashScreen;

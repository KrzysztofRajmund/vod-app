import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const override = css`
  display: block;
  margin: 0 auto;
`;

interface Props {
    toggleLoading: () => void
}

const SplashLoader: React.FC<Props> = ({ toggleLoading }) => {

    const [loadingSplash, setLoadingSplash] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoadingSplash(false);
            toggleLoading();
        }, 4000);
    });


    return (
        <section className={loadingSplash ? 'splashLoading' : 'splashLoading notActive'}>
            <ScaleLoader margin={3} color='#ffffff' loading={loadingSplash} css={override} />
        </section>
    );
};

export default SplashLoader;

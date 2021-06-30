import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import ScaleLoader from 'react-spinners/ScaleLoader';
//anime
import anime from 'animejs';
//components
import ButtonOutlined from '../utils/ButtonOutlined';
//material-ui
import LockIcon from '@material-ui/icons/Lock';

const override = css`
  display: block;
  margin: 0 auto;
`;


const SplashLoader: React.FC = () => {

    const [loadingSplash, setLoadingSplash] = useState(true);

    if (!loadingSplash) {
        //animation-first
        var textWrapper: any = document.querySelector(
            '.introAnimationFirst'
        );
        const regex = /\S/g;
        textWrapper.innerHTML = textWrapper.textContent.replace(
            regex,
            "<span class='letter'>$&</span>"
        );

        anime.timeline({ loop: false }).add({
            targets: '.introAnimationFirst .letter',
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1800,
            delay: (el, i) => 500 + 30 * i,
        });
    }


    useEffect(() => {
        setTimeout(() => {
            setLoadingSplash(false);
        }, 4000);
    }, []);


    return (
        <>
            {!loadingSplash && <ButtonOutlined title="log in Anonymously" icon={<LockIcon />} />}
            <h2 className="introAnimationFirst">Home Cinema</h2>
            <section className={loadingSplash ? 'splashLoading' : 'splashLoading notActive'}>
                <ScaleLoader margin={3} color='#ffffff' loading={true} css={override} />
            </section>
        </>
    );
};

export default SplashLoader;

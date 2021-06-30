import React, { useState } from 'react';
//components
import SplashLoader from './SplashLoader';
import ButtonOutlined from '../utils/ButtonOutlined';
//anime
import anime from 'animejs';
//material-ui
import LockIcon from '@material-ui/icons/Lock';


interface Props {
    loginUser: () => void
}

const SplashScreen: React.FC<Props> = ({ loginUser }) => {


    const [loading, setLoading] = useState(true);

    const toggleLoading = () => {
        setLoading(false);
    }

    if (!loading) {
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

    return (
        <section className='splashScreen'>
            <h1>
                vod
            </h1>
            <div onClick={() => loginUser()}>
                {!loading && <ButtonOutlined title="log in Anonymously" icon={<LockIcon />} />}
            </div>
            <h2 className="introAnimationFirst">Home Cinema</h2>
            <SplashLoader toggleLoading={toggleLoading} />
        </section>
    );
};

export default SplashScreen;

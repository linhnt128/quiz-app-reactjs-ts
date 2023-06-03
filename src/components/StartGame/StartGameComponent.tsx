import React from 'react';
import styles from "./StyledStartGame.module.css";

//import components


interface IMyProps {
    onBtnStartClick: (e: React.MouseEvent) => void;
}

const StartGameComponent = (props: IMyProps) => {


    const { onBtnStartClick } = props;


    return(
        <div className={styles.wrapper}>
            <h1 className={styles.heading}> Welcome to React Quiz Game! </h1>
            <button 
                className={styles.button}
                onClick={onBtnStartClick}
            >
                Start
            </button>
        </div>
    )
};

export default StartGameComponent;
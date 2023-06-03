import React from 'react';
import styles from "./StyledEndGame.module.css";

interface IMyProps {
    onBtnTryAgainClick: (e: React.MouseEvent) => void;
    handleReviewMode: (e: React.MouseEvent) => void;
    totalScore: number;
    setTotalScore: (value: any) => void;


}

const EndGameComponent = (props: IMyProps) => {

    const { onBtnTryAgainClick, handleReviewMode, totalScore, setTotalScore } = props;


    
    return(
        <div className={styles.wrapper}>
            <main className={styles.main}>
                <h1 className={styles.score}>Your score is : <strong>{totalScore}</strong></h1>
                <div className={styles.buttonGroup}>
                    <button 
                    className={`${styles.button} ${styles.buttonTryAgain}`} 
                    onClick={onBtnTryAgainClick}
                    
                    >
                        Try again
                    </button>
                    <button 
                    className={`${styles.button} ${styles.buttonReview}`} 
                    onClick={handleReviewMode}
                    
                    >
                        Review
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EndGameComponent;
import React, { useEffect, useState, useRef, useMemo } from 'react';
import styles from "./StyledInGame.module.css";
import datas from "../../data/questions.json";
import { IUserAnswer } from "../../App";
//import components


interface INewData {
    id: string;
    question_content: string;
    answers: {
        answer_content: string;
        correct: boolean;
    }[];
};



interface IMyProps {
    onBtnEndGameClick: (e: React.MouseEvent) => void;
    onBtnStartClick: (e: React.MouseEvent) => void;
    onBtnTryAgainClick: (e: React.MouseEvent) => void;
    userAnswer: IUserAnswer[];
    setUserAnswer: (value: any) => void;
    userAnswerIndex: number[];
    setUserAnswerIndex: (value: any) => void;
    displayUserAnswer: number;
    setDisplayUserAnswer: (value: any) => void;
    totalScore: number;
    setTotalScore: (value: any) => void;
    reviewMode: boolean;
    setReviewMode: (value: any) => void;
    setCurrentView: (value: any) => void;


};



const InGameComponent = (props: IMyProps) => {
    const { 
        onBtnEndGameClick,
        onBtnStartClick,
        userAnswer, 
        setUserAnswer,
        userAnswerIndex,
        setUserAnswerIndex,
        displayUserAnswer,
        setDisplayUserAnswer,
        totalScore,
        setTotalScore,
        reviewMode,
        setReviewMode,
        onBtnTryAgainClick,
        setCurrentView

        

        } = props;

    const [dataIndex, setDataIndex] = useState<number>(0);
    const [newData, setNewData] = useState<INewData[]>([]);
    const [questionNumber, setQuestionNumber] = useState(1);
    // const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number[]>(Array(newData.length).fill(-1));
    const [time, setTime] = useState(90);


    const prevButtonRef = useRef<HTMLButtonElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const divRef = useRef<HTMLDivElement>(null);



    const prevButtonEl = prevButtonRef.current;
    const nextButtonEl = nextButtonRef.current;
    const divEl = divRef.current;




    if (prevButtonEl) {
        if (dataIndex === 0 || questionNumber === 1) {
            prevButtonEl.style.background = "#e5e7eb";
            prevButtonEl.style.color = "#d1d5db";
            prevButtonEl.style.cursor = "not-allowed";
        } else {
            prevButtonEl.style.background = "#6B7280";
            prevButtonEl.style.color = "#fff";
            prevButtonEl.style.cursor = "pointer";
        }
    }


    if (nextButtonEl) {
        if(dataIndex === newData.length - 1 && questionNumber === newData.length) {
            nextButtonEl.style.background = "#e5e7eb";
            nextButtonEl.style.color = "#d1d5db";
            nextButtonEl.style.cursor = "not-allowed";
        } else {
            nextButtonEl.style.background = "#71d9bc";
            nextButtonEl.style.color = "#333";
            nextButtonEl.style.cursor = "pointer";
        }
    }


    const shuffleArray = (array: INewData[]): INewData[] => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
      
      
    const onBtnNextClick = () => {
        if (newData && (dataIndex < newData.length - 1 || questionNumber < newData.length)) {
            setDataIndex(prevIndex => prevIndex + 1);
            setQuestionNumber(prevIndex => prevIndex + 1);
        }
    };


    const onBtnPrevClick = () => {
        if(newData && (dataIndex > 0 || questionNumber > 1)) {
            if(questionNumber > 1) {
                setDataIndex(prevIndex => Math.max(prevIndex - 1, 0));
                setQuestionNumber(prevIndex => Math.max(prevIndex - 1, 1));
            }
        } else if(dataIndex > 0) {
            setDataIndex(prevIndex => prevIndex - 1);
            setQuestionNumber(prevIndex => prevIndex - 1);
        }
    };



    const calculateScore = () => {
        let score = 0;
        for (let i = 0; i < userAnswer.length; i++) {
          const userSelectedAnswer = userAnswer[i].answer;
          const correctAnswer = newData[i].answers.findIndex(
            (answer) => answer.correct === true
          );
          if (userSelectedAnswer.length === 1 && userSelectedAnswer[0] === newData[i].answers[correctAnswer].answer_content) {
            score++;
          }
        }
        return score;
      };


    const onBtnSubmitClick = (e:React.MouseEvent) => {
        const confirmed = window.confirm("Do you want to submit answers?");
        if(confirmed) {
            const score = calculateScore;
            setTotalScore(score);
            onBtnEndGameClick(e);
        };
        
    };


    const onBtnUserAnswerClick = (value: string, index: number) => {
        setUserAnswer((prevState: IUserAnswer[]) => {
            const updatedAnswers = [...prevState];
            updatedAnswers[dataIndex] = { answer: [value] };
            return updatedAnswers;
        });

        setUserAnswerIndex((prevState: number[]) => {
            const updatedIndexes = [...prevState];
            updatedIndexes[dataIndex] = index;
            return updatedIndexes;
        });
        
        // setSelectedAnswerIndex((prevState: number[]) => {
        //     const updatedSelectedIndexes = [...prevState];
        //     updatedSelectedIndexes[dataIndex] = index;
        //     return updatedSelectedIndexes;
        // });
    };



    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    

      




    useEffect(() => {        
        const shuffleArr = shuffleArray(datas);
        setNewData(shuffleArr);
        
        if(newData) {
            for (let i = 0; i < newData.length; i++) {
                setDataIndex(i);
            }
        }

        

    }, []);


    
    useEffect(() => {
        if (time > 0) {
          const timer = setTimeout(() => {
            setTime((prevTime) => prevTime - 1);
          }, 1000);
    
          return () => {
            clearTimeout(timer);
          };
        } else {
            setCurrentView("endGame");
        }
    }, [time]);




    return(
        <div className={styles.wrapper}>
            <div className={styles.buttonGroup}>
                    <button 
                        className={`${styles.button} ${styles.buttonPrevious}`}
                        onClick={onBtnPrevClick}
                        ref={prevButtonRef}
                        disabled={questionNumber === 1 || dataIndex === 0}

                        >Previous
                    </button>
                    <button 
                        className={`${styles.button}`}
                        onClick={onBtnNextClick}
                        disabled={newData && (dataIndex === newData.length - 1 && questionNumber === newData.length)}
                        ref={nextButtonRef}

                        >Next
                    </button>
                    {
                        reviewMode ?
                        <button 
                            className={`${styles.button} ${styles.buttonSubmit}`}
                            ref={submitButtonRef}
                            onClick={(e) => onBtnTryAgainClick(e)}

                            >Restart
                        </button>
                        :
                        (
                            newData && (dataIndex < newData.length - 1 || questionNumber < newData.length) ? 
                                null
                                :
                                <button 
                                    className={`${styles.button} ${styles.buttonSubmit}`}
                                    ref={submitButtonRef}
                                    onClick={(e) => onBtnSubmitClick(e)}
    
                                    >Submit
                                </button>
                        )
                    }
                    
                    
            </div>
            <main className={styles.main}>
                <section className={styles.sectionHeading}>
                    <div className={styles.countdownTimer}>
                        {/* <svg className={styles.countdownTimerSvg}>
                            <circle className={styles.countdownTimerPath} cx="150" cy="150" r="125" />
                            <circle
                            className={styles.countdownTimerProgress}
                            cx="150"
                            cy="150"
                            r="125"
                            strokeDasharray={`${calculateStrokeDashOffset(time)} ${2 * Math.PI * (125 - 5)}`}
                            />
                        </svg> */}
                        {
                            reviewMode 
                            ? 
                            <div className={styles.end}>End!</div> 
                            : 
                            <div className={styles.countdownTimerText}>{formatTime(time)}</div>
                        }
                    </div>
                    <div className={styles.questionNumber}>
                        Question&nbsp;
                        <strong>
                            { 
                                questionNumber
                            }
                        </strong>/ 
                        { newData && newData.length }
                    </div>
                    <div className={styles.questionContent}>
                        {
                            newData && newData[dataIndex]?.question_content
                        }
                    </div>
                </section>
                <section className={styles.sectionChoice}>
                    <div className={styles.choiceList}>
                        {
                            newData &&
                             newData[dataIndex]?.answers &&
                              newData[dataIndex].answers.map((answerContent, index) => (
                                
                                <div className={`
                                    ${
                                        reviewMode ? styles.listReviewMode : styles.list
                                    }
                                    
                                    ${
                                        userAnswerIndex[dataIndex] === index ? styles.selectedAnswer : ""
                                    }
                                    
                                    ${
                                        reviewMode &&
                                            ((userAnswerIndex[dataIndex] === index && !answerContent.correct) || answerContent.correct)
                                                ? answerContent.correct
                                                    ? styles.correct
                                                    : styles.wrong
                                                : ""
                                    }
                                `}
                                    key={index}
                                    onClick={!reviewMode ? () => onBtnUserAnswerClick(answerContent.answer_content, index) : undefined}
                                    ref={divRef}
                                >
                                        { index + 1 }{") "}{answerContent.answer_content}
                                </div>
                            ))
                        } 
                    </div>
                </section>
            </main>
        </div>
    )
}

export default InGameComponent;
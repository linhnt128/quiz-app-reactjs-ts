import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

//components
import StartGameComponent from './components/StartGame/StartGameComponent';
import InGameComponent from './components/InGame/InGameComponent';
import EndGameComponent from './components/EndGame/EndGameComponent';


//Global context
let componentRender: JSX.Element;

// interface INewData {
//   id: string;
//   question_content: string;
//   answers: {
//       answer_content: string;
//       correct: boolean;
//   }[];
// };

export interface IUserAnswer {
  answer: string[]
};


const App = () => {

  const [currentView, setCurrentView] = useState<string>("start");
  const [userAnswer, setUserAnswer] = useState<IUserAnswer[]>([]);
  const [userAnswerIndex, setUserAnswerIndex] = useState<number[]>([]);
  const [displayUserAnswer, setDisplayUserAnswer] = useState<number>(-1);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [reviewMode, setReviewMode] = useState<boolean>(false);




  const onBtnStartClick = () => {
    setCurrentView("inGame");
  };

  const onBtnEndGameClick = () => {
    setCurrentView("endGame");
  };

  const onBtnTryAgainClick = () => {
    if(reviewMode) {
      setReviewMode(false);
      setCurrentView("start");
    } else {
      setCurrentView("start");
    }
  };

  const handleReviewMode = () => {
    setReviewMode(true);
    onBtnStartClick();
  };
  

  if(currentView === "start") {
    componentRender = 
    <StartGameComponent 
      onBtnStartClick={onBtnStartClick} 
    
    />;
  } else if(currentView === "inGame") {
    componentRender = 
    <InGameComponent
      onBtnEndGameClick={onBtnEndGameClick}
      userAnswer={userAnswer}
      setUserAnswer={setUserAnswer}
      userAnswerIndex={userAnswerIndex}
      setUserAnswerIndex={setUserAnswerIndex}
      displayUserAnswer={displayUserAnswer}
      setDisplayUserAnswer={setDisplayUserAnswer}
      onBtnStartClick={onBtnStartClick}
      totalScore={totalScore}
      setTotalScore={setTotalScore}
      reviewMode={reviewMode}
      setReviewMode={setReviewMode}
      onBtnTryAgainClick={onBtnTryAgainClick}
      setCurrentView={setCurrentView}


    />;
  } else if(currentView === "endGame") {
    componentRender = 
    <EndGameComponent 
      onBtnTryAgainClick={onBtnTryAgainClick}
      handleReviewMode={handleReviewMode} 
      totalScore={totalScore}
      setTotalScore={setTotalScore}



    />;
  }






  return (
    <div className={styles.App}>
      { componentRender }
    </div>
  );
}

export default App;

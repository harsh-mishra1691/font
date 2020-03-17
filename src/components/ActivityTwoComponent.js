import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../containers/HeaderContainer';
import RewardsContainer from '../containers/RewardsContainer';
import NavigationContainer from '../containers/NavigationContainer';
import AudioContainer from '../containers/AudioContainer';
import summaryScreenAudio from '../assets/audio/SummaryScreen/SummaryScreen.mp3';
import correctfeedback from '../assets/audio/response/correct.mp3';
import incorrectfeedback from '../assets/audio/response/incorrect.mp3';
import goodjobfeedback from '../assets/audio/response/goodjob.mp3';

class ActivityTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionInd: 0,
      animation1: '',
      animation2: '',
      animation3: '',
      animation4: '',
      animationStopped: false,
      feedbackVisible: false,
      incorrectClass: '',
    };

    this.prevButtonClick = this.prevButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
    this.correctResponse = this.correctResponse.bind(this);
    this.incorrectResponse = this.incorrectResponse.bind(this);
    this.resetActivity = this.resetActivity.bind(this);
    this.animationEnd = this.animationEnd.bind(this);
  }

  componentDidMount() {
    this.animationEnd();
  }

  componentWillUnmount() {
    this.setState({
      currentQuestionInd: 0,
      animation1: '',
      animation2: '',
      animation3: '',
      animation4: '',
      feedback: '',
      animationStopped: false,
      incorrectClass: '',
    });

    this.animation1.removeEventListener('animationend', () => { });
    this.animation2.removeEventListener('animationend', () => { });
    this.animation3.removeEventListener('animationend', () => { });
    this.animation4.removeEventListener('animationend', () => { });
  }

  animationEnd() {
    if (!this.state.animationStopped) {
      this.setState({
        // animation1: 'slideInLeft animated',
        animation1: 'showAnim',
      });
    }

    this.animation1.addEventListener('animationend', () => {
      if (!this.state.animationStopped) {
        this.setState({
          animation1: '.',
          animation2: 'showAnim',
        });
      }
    });

    this.animation2.addEventListener('animationend', () => {
      if (!this.state.animationStopped) {
        this.setState({
          animation1: '.',
          animation2: '.',
          animation3: 'showAnim',
        });
      }
    });

    this.animation3.addEventListener('animationend', () => {
      if (!this.state.animationStopped) {
        this.setState({
          animation1: '.',
          animation2: '.',
          animation3: '.',
          // animation4: 'bounceInLeft animated',
          animation4: 'showAnim',
        });
      }
    });

    this.animation4.addEventListener('animationend', () => {
      if (!this.state.animationStopped) {
        this.setState({
          animation1: '.',
          animation2: '.',
          animation3: '.',
          animation4: '.',
          animationStopped: true,
        });
      }
    });
  }

  resetActivity() {
    this.setState({
      currentQuestionInd: 0,
      animation1: '',
      animation2: '',
      animation3: '',
      animation4: '',
      animationStopped: false,
      incorrectClass: '',
    });
  }

  prevButtonClick() {
    let prevInd = this.state.currentQuestionInd - 1;
    if (prevInd < 0) {
      prevInd = 0;
    } else {
      this.setState({
        currentQuestionInd: prevInd,
        animation1: '',
        animation2: '',
        animation3: '',
        animation4: '',
        animationStopped: false,
        incorrectClass: '',
        clickedIndex: -1,
      }, () => {
        // eslint-disable-next-line max-len
        this.animationEnd();
      });
    }
  }

  nextButtonClick() {
    const { activityData } = this.props;
    let nextInd = this.state.currentQuestionInd + 1;
    if (nextInd > (activityData.questions.length - 1)) {
      nextInd = activityData.questions.length - 1;
    } else {
      this.setState({
        currentQuestionInd: nextInd,
        animation1: '',
        animation2: '',
        animation3: '',
        animation4: '',
        animationStopped: false,
        incorrectClass: '',
      }, () => {
        // eslint-disable-next-line max-len
        this.animationEnd();
      });
    }
  }

  validateAnswer(elem, ind) {
    const { activityData, updateActivityTwoData, playFeedbackAudio } = this.props;
    const { currentQuestionInd } = this.state;
    this.setState({
      clickedIndex: ind,
    })
    if (activityData.questions[currentQuestionInd].attempted === true) {
      return;
    }
    const optionSelected = elem;
    // const currentIndex = ind;
    let indexToCheck = 0;
    let charactersAttempted = 1;
    for (let i = 0; i < activityData.questions[currentQuestionInd].answer.length; i++) {
      if (activityData.questions[currentQuestionInd].answer[i].text === '') {
        indexToCheck = i;
        break;
      } else {
        charactersAttempted = charactersAttempted + 1;
      }
    }

    if (optionSelected === activityData.questions[currentQuestionInd].answer[indexToCheck].value) {
      const newActivityData = { ...activityData };
      newActivityData.questions[currentQuestionInd].answer[indexToCheck].text = optionSelected;
      newActivityData.questions[currentQuestionInd].options[ind].show = false;
      updateActivityTwoData(newActivityData);
      playFeedbackAudio(correctfeedback);

      // Dummy set interval instead of animation
      if (charactersAttempted === activityData.questions[currentQuestionInd].answer.length) {
        setTimeout(() => {
          playFeedbackAudio(goodjobfeedback);
          this.setState({
            feedbackVisible: true,
          });
        }, 1000);
        setTimeout(() => {
          this.nextButtonClick();
          this.setState({
            feedbackVisible: false,
          });
        }, 4000);

        newActivityData.questions[currentQuestionInd].attempted = true;
        updateActivityTwoData(newActivityData); // to update the stars value
        this.checkActivityCompleteStatus();
        this.feedback.addEventListener('animationend', () => {
        });

        // this.correctResponse();
      }
    } else {
      this.incorrectResponse();
    }
  }

  correctResponse() {
    // const { activityData, updateActivityThreeData } = this.props;
    // const { currentQuestionInd } = this.state;
    // const newActivityData = { ...activityData };
    // newActivityData.questions[currentQuestionInd].attempted = true;
    // updateActivityThreeData(newActivityData); // to update the stars value
    // //Dummy set interval instead of animation
    // setTimeout(() => {
    //   this.nextButtonClick();
    // }, 1000);
    this.checkActivityCompleteStatus();
  }

  checkActivityCompleteStatus() {
    const { activityData, switchScreen, activityDuration, updateDuration, playFeedbackAudio } = this.props;
    let attemptedQuestions = 0;
    activityData.questions.forEach(element => {
      attemptedQuestions = (element.attempted === true) ? attemptedQuestions + 1 : attemptedQuestions;
    });
    if (attemptedQuestions === activityData.questions.length) {
      switchScreen('summary');
      const endDate = new Date();
      updateDuration({
        ...activityDuration,
        endDate,
      });
      playFeedbackAudio(summaryScreenAudio);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  incorrectResponse() {
    const { playFeedbackAudio } = this.props;
    playFeedbackAudio(incorrectfeedback);
    this.setState({
      incorrectClass: 'tada animated',
    });
    setTimeout(() => {
      this.setState({
        incorrectClass: '',
      });
    }, 1000);
  }


  render() {
    const { selectedActivity, activityData, screenSize } = this.props;
    const { currentQuestionInd } = this.state;

    // const bgImg = {
    //   backgroundImage: `url(  ${configPlayer[selectedCharacter].charactersIcon} )`,
    //   backgroundSize: 'cover',
    // };
    // const showBox = opacity ? { opacity: 1 } : null

    return (
      // eslint-disable-next-line
      <div className={(selectedActivity === 'Activity2') ? 'magic-bt-poc-activity2-wrapper' : 'hidden'} >
        <HeaderContainer activityName={activityData.activityName} resetActivity={this.resetActivity} />
        <div className="rewards-container-wrapper">
          <RewardsContainer currentQues={currentQuestionInd} />
          <NavigationContainer prevButtonClick={this.prevButtonClick} nextButtonClick={this.nextButtonClick} currentQuestionInd={this.state.currentQuestionInd} />
        </div>
        <div className="magic-bt-poc-activity2-container">
          <div ref={(div) => { this.animation1 = div; }} className={`magic-bt-poc-questionTitle ${this.state.animation1} ${this.state.animation1 === '' ? 'hidden' : ''}`}>
            <div className="magic-bt-poc-questionTitle-audio">
              <AudioContainer name={activityData.questionTitleAudiosource} />
            </div>
            <h5>{activityData.questionTitle}</h5>
            <div className="magic-bt-poc-music-wrapper" />

          </div>

          <div className="magic-bt-poc-question-answers-wrapper">
            <div className="magic-bt-poc-question-answers-wrapper-inner">
              <div ref={(div) => { this.animation2 = div; }} className={`magic-bt-poc-question-container  ${this.state.animation2} ${this.state.animation2 === '' ? 'hidden' : ''}`} >
                <div className="magic-bt-poc-questionTitle-audio">
                  <AudioContainer name={activityData.questions[currentQuestionInd].questionTextAudio} />
                </div>
                <img alt="none" className="magic-bt-poc-question-image" src={(screenSize === 'small') ? activityData.questions[currentQuestionInd].small.questionImg : (screenSize === 'medium') ? activityData.questions[currentQuestionInd].large.questionImg : (screenSize === 'large') ? activityData.questions[currentQuestionInd].large.questionImg : null} />
                <div className="magic-bt-poc-music-wrapper" />
              </div>

              <div
                ref={(div) => { this.animation3 = div; }}
                className={`magic-bt-poc-answers-container ${this.state.animation3} ${this.state.animation3 === '' ? 'hidden' : ''}`}
              >
                {
                  activityData.questions[currentQuestionInd].answer.map((elem, index) => (
                    <div key={index} className={`answer-elements ${(elem.text === '') ? '' : 'text-filled'}`} index={index}>
                      <span>{elem.text}</span>
                      <div className={`anim ${(elem.text === '') ? 'hidden' : ''}`} />
                    </div>
                  ))
                }
              </div>

              <div
                ref={(div) => { this.animation4 = div; }}
                className={`magic-bt-poc-options-container ${this.state.animation4} ${this.state.animation4 === '' ? 'hidden' : ''}`}
              >
                {
                  activityData.questions[currentQuestionInd].options.map((elem, index) => (
                    <div className="options-hidden-container" key={index}>
                      <button type="button" className={`option-elements ${(elem.show === true) ? '' : 'hidden'} ${this.state.clickedIndex == index ? this.state.incorrectClass : ''}`}
                        onClick={() => this.validateAnswer(elem.char, index)}>
                        <span>{elem.char}</span>
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          {/* <div
           className={`magic-bt-poc-options-container ${this.state.animation4} ${this.state.animation4 === '' ? 'hidden' : ''}`}
          >
            {
              activityData.questions[currentQuestionInd].options.map((elem, index) => (
                <div className="options-hidden-container" key={index}>
                  <button
                    type="button"
                    ref={this.animation4}
                    className={`option-elements ${(elem.show === true) ? '' : 'hidden'}`}
                    onClick={() => this.validateAnswer(elem.char, index)}
                  >
                    <span>{elem.char}</span>
                  </button>
                </div>
              ))
            }
          </div> */}

          {/* <div className='magic-bt-poc-question-panel'>
            {activityData.questions[currentQuestionInd].questionText}}
          </div>
          <div className='magic-bt-poc-options-panel'>
            <ul className="clearfix">
              {
                activityData.questions[currentQuestionInd].options.map((elem, index) => (
                  <li key={index}>
                    <button type="button" onClick={() => this.validateAnswer(elem.name)}>
                      <img alt='' src={elem.optionImage}/>
                    </button>
                  </li>
                ))
              }
            </ul>
          </div> */}

          <div ref={(div) => { this.feedback = div; }} className={`feedbackContainer ${this.state.feedbackVisible === true ? '' : 'hidden'}`}>
            {/* <div className={`starsTop slideInDown animated`}></div>
            <div className={`bigStarCenter bounceInLeft animated`}></div>
            <div className={`goodJob bounceInRight animated`}></div>
            <div className={`starsBottom slideInUp animated`}></div> */}
            <div className="feedbackContainer-inner">
              <div className="feedbackContainer-inner-animation">
                <div className="magic-bt-poc-star bounceInLeft animated"></div>
                <div className="magic-bt-poc-good-job bounceInRight animated"></div>
              </div>
              <div className="magic-bt-poc-lower-end slideInUp animated"></div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

ActivityTwoComponent.propTypes = {
  selectedActivity: PropTypes.string.isRequired,
};

export default ActivityTwoComponent;

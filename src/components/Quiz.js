import React from 'react'
import Button from './Button'
import { useGlobalContext } from './Context'
import Loading from './Loading'
import Main from './Main'
import Modal from './Modal'

const Quiz = () => {

    const {
        waiting,
        loading,
        questions,
        index,
        correct,
        nextQuestion,
        checkAnswer,
    } = useGlobalContext()

    if (waiting) {
        return <Main />
    }
    if (loading) {
        return <Loading />
      }

    const { question, incorrect_answers, correct_answer } = questions[index]
    let answers = [...incorrect_answers]
    const tempIndex = Math.floor(Math.random() * 4)
    if (tempIndex === 3) {
        answers.push(correct_answer)
    } else {
        answers.push(answers[tempIndex])
        answers[tempIndex] = correct_answer
    }
  
    return (
        <main>
            <Modal />
            <section className='quiz'>
                <p className='correct-answers'>
                correct answers : {correct}/{index}
                </p>
                <article className='container'>
                <h2 dangerouslySetInnerHTML={{ __html: question }} />
                <div className='btn-container'>
                    {answers.map((answer, index) => {
                    return (
                        <Button
                            key={index}
                            className='answer-btn'
                            onClick={() => checkAnswer(correct_answer === answer)}
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />    
                    )
                    })}
                </div>
                </article>
                <Button className='next-question' onClick={nextQuestion}>next question</Button>
            </section>
        </main>
    )
}

export default Quiz
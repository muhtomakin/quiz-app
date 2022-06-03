import axios from 'axios'
import React, { useState, useContext } from 'react'


const API_ENDPOINT = 'https://opentdb.com/api.php?'
const url = ''
const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const table = {
    sports: 21,
    history: 23,
    politics: 24,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [loading, setLoading] = useState(false)
    const [waiting, setWaiting] = useState(true)
    const [questions, setQuestions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: 'sports',
        difficulty: 'easy'
    })

    const fetchQuestions = async (url) => {
        setLoading(true)
        setWaiting(false)
        const response = await axios(url).catch(err => console.log(err))
        if(response) {
            const data = response.data.results
            if (data.length > 0) {
                setQuestions(data)
                setLoading(false)
                setWaiting(false)              
            } else {
                setWaiting(true)
            }
        } else {
            setWaiting(true)
        }
    }

    const nextQuestion = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1
            if (index > questions.length - 1) {
                openModal()
                return 0
            } else {
                return index
            }
        })
    }

    const checkAnswer = (value) => {
        if (value) {
          setCorrect((oldState) => oldState + 1)
        }
        nextQuestion()
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setWaiting(true)
        setCorrect(0)
        setIsModalOpen(false)
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setQuiz({ ...quiz, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {amount, category, difficulty} = quiz
        const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url)
    }

    return (
        <AppContext.Provider
            value={{
                waiting,
                loading,
                questions,
                index,
                correct,
                isModalOpen,
                nextQuestion,
                checkAnswer,
                closeModal,
                quiz,
                handleChange,
                handleSubmit
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
  
export { AppContext, AppProvider }
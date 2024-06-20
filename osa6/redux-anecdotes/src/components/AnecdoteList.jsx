import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            {anecdote.content}
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const voteHandler = (dispatch, anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
        dispatch(clearNotification())
    }, 5000)
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes}) => {
        anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        return anecdotes
    })

    return (
        <>
          {anecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => voteHandler(dispatch, anecdote)}
            />
          )}
        </>
    )
}

export default AnecdoteList
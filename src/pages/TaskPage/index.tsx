import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../../redux/store'
import { fetchTask } from '../../redux/slices/tasks'
import { useSelector } from 'react-redux'

import styles from './TaskPage.module.scss'
import { fetchTaskComments, fetchRemoveComment } from '../../redux/slices/comments'
import { CommentType } from '../../types'
import instance from '../../axios'

export const TaskPage = () => {
  const location = useLocation()

  const [text, setText] = useState('')

  const addHandler = async () => {
    try {
      const fields = {
        text,
        task: id,
      }
      await instance.post('/comments', fields)
      dispatch(fetchTaskComments(id))
      setText('')
    } catch (err) {
      console.warn(err)
      alert('Failed to add')
    }
  }

  const deleteHandler = (id: string) => {
    dispatch(fetchRemoveComment(id))
  }

  const id = location.pathname.substring(6)

  const dispatch = useAppDispatch()

  const taskItem = useSelector((state: RootState) => state.tasks.item)
  const comments = useSelector((state: RootState) => state.comments.items)

  useEffect(() => {
    dispatch(fetchTask(id))
    dispatch(fetchTaskComments(id))
  }, [])

  return (
    <>
      <div className={styles.item}>
        <p>{taskItem.title}</p>
        <p>{taskItem.description}</p>
        <hr />
        <div>
          {comments.map((comment: CommentType) => (
            <div>
              <div className={styles.comment} key={comment._id}>
                {comment.text}
              </div>
              <button onClick={() => deleteHandler(comment._id)}>X</button>
            </div>
          ))}
        </div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => addHandler()}>Add</button>
      </div>
    </>
  )
}

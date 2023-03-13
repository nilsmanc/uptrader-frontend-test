import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { RootState, useAppDispatch } from '../../redux/store'
import { fetchTask } from '../../redux/slices/tasks'
import { useSelector } from 'react-redux'

import styles from './TaskPage.module.scss'
import { fetchTaskComments } from '../../redux/slices/comments'
import { CommentType } from '../../types'

export const TaskPage = () => {
  const location = useLocation()

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
        {taskItem.title}
        <hr />
        <div>
          {comments.map((comment: CommentType) => (
            <div className={styles.comment} key={comment._id}>
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

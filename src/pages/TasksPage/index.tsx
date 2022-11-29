import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import instance from '../../axios'
import { GET_PROJECT_TASKS } from '../../redux/constants'
import { selectProjectTasks } from '../../redux/reducers/tasks'
import { TaskType } from '../../types'

import styles from './TasksPage.module.scss'

export const TasksPage = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectProjectTasks)

  const { state } = useLocation()

  const { id } = state

  const [boards, setBoards] = useState([
    { id: 1, title: 'Queue', items: tasks },
    { id: 2, title: 'Development', items: [] },
    { id: 3, title: 'Done', items: [] },
  ])

  const [currentBoard, setCurrentBoard] = useState<any>(null)
  const [currentItem, setCurrentItem] = useState<any>(null)

  function dragOverHandler(e: any) {
    e.preventDefault()
  }

  function dragLeaveHandler(e: any) {}

  function dragStartHandler(e: any, board: any, item: any) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e: any) {}

  async function dropHandler(e: any, board: any, item: any) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)

    const status = currentBoard.title

    const task = {
      status,
    }

    await instance.patch(`/tasks/${item._id}`, task)

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      }),
    )
  }

  function dropCardHandler(e: any, board: any) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      }),
    )
  }

  useEffect(() => {
    dispatch({ type: GET_PROJECT_TASKS, payload: id })
  }, [dispatch])

  return (
    <div className={styles.boards}>
      {boards.map((board, i) => (
        <div
          key={i}
          className={styles.board}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}>
          <div className={styles.boardTitle}>{board.title}</div>
          {board.items.map((item: any, i: any) => (
            <div
              key={i}
              className={styles.item}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}>
              {item.title}
              {item.status}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

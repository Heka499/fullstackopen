import { useEffect } from "react"
import { useNotificationValue, useNotificationDispatch } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  useEffect(() => {
    const timer = setTimeout(() => {
      notification && dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
    return () => clearTimeout(timer)
  }, [notification])
  
  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification

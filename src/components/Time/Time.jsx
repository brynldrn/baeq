import moment from 'moment/moment';
import { useEffect, useState } from 'react';

export default function Time({ className }) {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format('hh:mm A'))
    }, 1000)
  }, [])

  return (
    <span className={className} >{time}</span>
  )
}

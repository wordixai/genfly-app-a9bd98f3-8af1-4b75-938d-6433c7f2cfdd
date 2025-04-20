import { useEffect, useState } from 'react'

interface TimerProps {
  timeLeft: number
}

export function Timer({ timeLeft }: TimerProps) {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setMinutes(Math.floor(timeLeft / 60))
    setSeconds(timeLeft % 60)
  }, [timeLeft])

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Time Remaining:</span>
      <span className="font-mono text-lg">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
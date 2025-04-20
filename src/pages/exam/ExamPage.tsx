import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Timer } from '@/components/exam/Timer'
import { Question } from '@/components/exam/Question'
import { questions } from '@/data/exam-questions'

export function ExamPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes
  const navigate = useNavigate()

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score and navigate to results
    const score = calculateScore(answers, questions)
    navigate('/exam/results', { state: { score } })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Online Examination</CardTitle>
          <Timer timeLeft={timeLeft} />
        </CardHeader>
        
        <CardContent>
          <Progress value={progress} className="mb-4" />
          
          <Question 
            question={currentQuestion} 
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
          />
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          {currentQuestionIndex === questions.length - 1 ? (
            <Button onClick={handleSubmit}>Submit Exam</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

function calculateScore(answers: Record<number, string>, questions: any[]) {
  let score = 0
  Object.entries(answers).forEach(([index, answer]) => {
    if (questions[Number(index)].correctAnswer === answer) {
      score++
    }
  })
  return score
}
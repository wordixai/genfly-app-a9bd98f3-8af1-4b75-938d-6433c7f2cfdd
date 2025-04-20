import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function ResultsPage() {
  const location = useLocation()
  const { score } = location.state || { score: 0 }
  const totalQuestions = 5 // Should match your actual question count

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Exam Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-xl">
              You scored {score} out of {totalQuestions}
            </p>
            <p className="text-2xl font-bold">
              {Math.round((score / totalQuestions) * 100)}%
            </p>
            <div className="pt-4">
              <Button asChild>
                <a href="/">Return to Dashboard</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
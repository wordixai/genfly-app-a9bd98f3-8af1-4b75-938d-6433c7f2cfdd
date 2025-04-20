interface QuestionProps {
  question: {
    id: number
    text: string
    options: string[]
  }
  selectedAnswer: string
  onAnswerSelect: (answer: string) => void
}

export function Question({ question, selectedAnswer, onAnswerSelect }: QuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Question {question.id}</h3>
      <p className="text-gray-700">{question.text}</p>
      
      <div className="space-y-2 mt-4">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="radio"
              id={`option-${question.id}-${index}`}
              name={`question-${question.id}`}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
              className="h-4 w-4"
            />
            <label htmlFor={`option-${question.id}-${index}`} className="text-sm">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
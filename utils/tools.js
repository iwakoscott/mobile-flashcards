export function decouple(state) {
  return prop => {
    let copy = state;
    delete copy[prop];
    return copy;
  };
}

export function grader(correct, numberOfQuestions) {
  if (correct === numberOfQuestions) {
    return `You nailed it! 💯`;
  } else {
    const percentGrade = ((correct / numberOfQuestions) * 100).toFixed(2);
    if (percentGrade > 65) {
      return `You're getting the hang of it! Keep practicing! 💪`;
    } else {
      return `You're not quite there yet but, keep climbing! 🧗‍♀️`;
    }
  }
}

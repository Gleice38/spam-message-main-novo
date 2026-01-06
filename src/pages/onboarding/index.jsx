const [step, setStep] = useState(1)

function nextStep() {
  setStep(prev => prev + 1)
}

function skipTutorial() {
  // salva flag no backend ou localStorage
}

function finishOnboarding() {
  localStorage.setItem('onboardingCompleted', 'true')
  navigate('/dashboard')
}

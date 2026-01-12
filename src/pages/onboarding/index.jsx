import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Corrigido: adicionada a barra '/' após o ponto e garantida a letra minúscula na pasta 'steps'
import StepWelcome from './steps/stepWelcome';
import StepContacts from './steps/stepContacts';
import StepSegmentation from './steps/StepSegmentation';
import StepCampaigns from './steps/stepCampaigns';
import StepSchedule from './steps/stepSchedule';
import StepAnalytics from './steps/StepAnalytics';
import StepFinish from './steps/stepFinish';
 
import './style.css';

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  function nextStep() {
    setStep(prev => prev + 1)
  }

  function prevStep() {
    setStep(prev => Math.max(prev - 1, 1))
  }

  function skipTutorial() {
    localStorage.setItem('onboardingCompleted', 'true')
    navigate('/dashboard')
  }

  function finishOnboarding() {
    localStorage.setItem('onboardingCompleted', 'true')
    navigate('/dashboard')
  }

  return (
    <div className="onboarding-wrapper">

      {step === 1 && (
        <StepWelcome
          onNext={nextStep}
          onSkip={skipTutorial}
        />
      )}

      {step === 2 && (
        <StepContacts
          onNext={nextStep}
          onPrev={prevStep}
          onSkip={skipTutorial}
        />
      )}

      {step === 3 && (
        <StepSegmentation
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {step === 4 && (
        <StepCampaigns
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {step === 5 && (
        <StepSchedule
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {step === 6 && (
        <StepAnalytics
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}


      {step === 7 && (
        <StepFinish
          onFinish={finishOnboarding}
          onPrev={prevStep}
        />
      )}

    </div>
  )
}
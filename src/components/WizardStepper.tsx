import React from 'react';
import { Check } from 'lucide-react';

interface WizardStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  canNavigateTo: (step: number) => boolean;
}

const STEPS = [
  { id: 1, title: 'Channel & Media', sub: 'Initiate Ingestion' },
  { id: 2, title: 'Multi-Modal Scan', sub: '<850ms Telemetry' },
  { id: 3, title: 'Trust Receipt', sub: 'Forensic Proof' },
  { id: 4, title: 'Decisioning', sub: 'Escrow & 1930 Portal' },
];

export const WizardStepper: React.FC<WizardStepperProps> = ({
  currentStep,
  onStepClick,
  canNavigateTo,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 shadow-2xs">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const allowed = canNavigateTo(step.id);

            return (
              <button
                key={step.id}
                onClick={() => allowed && onStepClick(step.id)}
                disabled={!allowed}
                className={`group flex items-center space-x-2 text-left focus:outline-none transition-opacity ${
                  allowed ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white border-2 border-indigo-600 shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400'
                      : 'bg-slate-100 text-slate-500 border border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.id}
                </div>
                <div className="hidden sm:block">
                  <div
                    className={`text-xs font-semibold ${
                      isActive
                        ? 'text-indigo-700'
                        : isCompleted
                        ? 'text-slate-800 group-hover:text-indigo-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {step.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

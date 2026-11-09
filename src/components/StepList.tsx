interface Step {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export default function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {steps.map((step, i) => (
        <>
          <div key={step.title} className="text-center max-w-[180px]">
            <div
              className={`w-20 h-20 bg-[#26262e] border-2 rounded-2xl flex items-center justify-center text-[2rem] mx-auto mb-3 ${
                step.highlight ? 'step-highlight' : 'border-[#2e2e3a]'
              }`}
            >
              {step.icon}
            </div>
            <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
            <p className="text-slate-400 text-xs">{step.description}</p>
          </div>
          {i < steps.length - 1 && (
            <div
              key={`arrow-${i}`}
              className="hidden md:flex items-center text-[var(--color-accent)] text-2xl pt-5"
            >
              →
            </div>
          )}
        </>
      ))}
    </div>
  );
}

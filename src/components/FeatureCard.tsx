interface Props {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: Props) {
  return (
    <div className="bg-[#202027] border border-[#2e2e3a] rounded-2xl p-6 hover:border-[var(--color-accent)] hover:-translate-y-0.5 transition-all">
      <div className="text-[2rem] mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

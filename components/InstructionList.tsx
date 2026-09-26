interface InstructionListProps {
  instructions: string[];
}

export function InstructionList({ instructions }: InstructionListProps) {
  return (
    <div className="rounded-xl bg-fit-card border border-fit-border p-5 space-y-4">
      <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider pb-3 border-b border-fit-border/60">
        INSTRUCTIONS
      </h3>

      <ol className="space-y-3">
        {instructions.map((step, index) => (
          <li key={index} className="flex items-start gap-3.5 group">
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-fit-surface border border-fit-lime/40 text-fit-lime font-mono font-bold text-xs shrink-0 mt-0.5 group-hover:bg-fit-lime group-hover:text-black transition-colors">
              {index + 1}
            </span>
            <p className="text-sm text-fit-text leading-relaxed font-normal pt-0.5">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

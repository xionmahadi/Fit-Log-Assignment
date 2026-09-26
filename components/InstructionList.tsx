interface InstructionListProps {
  instructions: string[];
}

export function InstructionList({ instructions }: InstructionListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider">
        INSTRUCTIONS
      </h3>

      <ol className="space-y-2.5">
        {instructions.map((step, index) => (
          <li key={index} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed font-normal">
            <span className="font-mono text-gray-400 font-semibold">{index + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

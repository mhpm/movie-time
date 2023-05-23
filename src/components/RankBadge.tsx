const RankBadge = ({
  rank,
  className,
}: {
  rank: number;
  className?: string;
}) => {
  const rounded = Math.round(rank * 10) / 10;
  let color = "green";

  if (rank <= 6) color = "red";
  else if (rank > 6 && rank <= 8) color = "amber";

  return (
    <span
      className={[
        `border-4 rounded-full bg-black text-white p-4 border-${color}-400 font-extrabold`,
        className,
      ].join(" ")}
    >
      {rounded}
    </span>
  );
};

export default RankBadge;

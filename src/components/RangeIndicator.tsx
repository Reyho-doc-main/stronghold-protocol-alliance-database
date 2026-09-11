type RangeIndicatorProps = {
  cells: boolean[];
};

function RangeIndicator({ cells }: RangeIndicatorProps) {
  return (
    <div className="flex flex-row gap-1">
      {cells.map((active, index) => (
        <div
          key={index}
          className="w-6 h-6 border-2"
          style={{
            backgroundColor: active ? "#27a6f3" : "#f8f9fa",
            borderColor: "#a2a9b1",
          }}
        />
      ))}
    </div>
  );
}

export default RangeIndicator;

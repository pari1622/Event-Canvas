export default function SectionBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-950" />

      <div className="absolute inset-0 opacity-20">
        <div
          className="
            h-full w-full
            bg-[linear-gradient(rgba(59,130,246,.15)_1px,transparent_1px),
            linear-gradient(90deg,rgba(59,130,246,.15)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>
    </>
  );
}

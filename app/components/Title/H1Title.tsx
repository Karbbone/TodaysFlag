interface H1TitleProps {
  title: string;
}

export const H1Title = (props: H1TitleProps) => {
  return (
    <h1 className="relative text-4xl md:text-5xl font-bold text-center mb-16">
      <span className="inline-block px-6 py-3 relative">
        <span
          aria-hidden="true"
          className="absolute -inset-1 -inset-y-2 -skew-y-2 bg-primary/20 rounded-lg"
        ></span>
        <span className="relative z-10">{props.title}</span>
      </span>
    </h1>
  );
};

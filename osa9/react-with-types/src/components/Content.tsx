interface ContentProps {
  parts: PartProps[];
}

interface PartProps {
  name: string;
  exerciseCount: number;
}

const Part = (props: PartProps) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  );
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part, i) => (
        <Part key={i} name={part.name} exerciseCount={part.exerciseCount} />
      ))}
    </div>
  );
};

export default Content;

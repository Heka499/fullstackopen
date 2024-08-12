import { CoursePart } from "../App";

const Part = (props: CoursePart) => {
  console.log("Part", props);
  switch (props.kind) {
    case "basic":
      return (
        <p>
          {props.name} {props.exerciseCount}
          <br />
          {props.description}
        </p>
      );
    case "group":
      return (
        <p>
          {props.name} {props.exerciseCount}
          <br />
          project exercises {props.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {props.name} {props.exerciseCount}
          <br />
          {props.description}
          <br />
          {props.backgroundMaterial}{" "}
        </p>
      );
    case "special":
      return (
        <p>
          {props.name} {props.exerciseCount} <br />
          {props.description}
          <div>required skills: {props.requirements.join(", ")}</div>
        </p>
      );
    default:
      throw new Error("This should not happen");
  }
};

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  console.log(courseParts);

  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} {...part} />
      ))}
    </div>
  );
};

export default Content;

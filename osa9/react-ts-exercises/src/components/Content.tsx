import { CoursePart } from "../App";

const Part = (props: CoursePart) => {
  console.log("Part", props);
  switch (props.kind) {
    case "basic":
      return (
        <p>
          {props.name} {props.description} {props.exerciseCount}
        </p>
      );
    case "group":
      return (
        <p>
          {props.name} {props.exerciseCount} {props.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {props.name} {props.description} {props.backgroundMaterial}{" "}
          {props.exerciseCount}
        </p>
      );
    default:
      throw new Error("This should not happen");
  }
};

const Content = (props: CoursePart[]) => {
  console.log(props);

  return (
    <div>
      {props.map((part) => (
        <Part key={part.name} {...part} />
      ))}
    </div>
  );
};

export default Content;

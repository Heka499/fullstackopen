import { DiaryEntry } from "../types";

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>Weather: {entry.weather}</p>
      <p>Visibility: {entry.visibility}</p>
      <p>Comment: {entry.comment}</p>
    </div>
  );
};

export default Entry;

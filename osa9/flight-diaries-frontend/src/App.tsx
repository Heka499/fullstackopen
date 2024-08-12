import { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./services/diaryService";
import { DiaryEntry } from "./types";
import Entry from "./components/Entry";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      <ul>
        {diaries.map((diary) => (
          <Entry key={diary.id} entry={diary} />
        ))}
      </ul>
    </div>
  );
};

export default App;

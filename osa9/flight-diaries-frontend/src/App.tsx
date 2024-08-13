import React, { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./services/diaryService";
import { DiaryEntry, Visibility, Weather } from "./types";
import Entry from "./components/Entry";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const errorTimer = (data: string) => {
    setError(data);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({ date, visibility, weather, comment }).then((data) => {
      if (!data.id) {
        console.log("data", data);
        errorTimer(data);
      } else {
        setDiaries(diaries.concat(data));
      }
    });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={addDiary}>
        <input
          value={date}
          onChange={(event) => setDate(event.target.value)}
          placeholder="Date"
        />
        <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
          placeholder="Visibility"
        />
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
          placeholder="Weather"
        />
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Comment"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        <h2>Diary entries:</h2>
        {diaries.map((diary) => (
          <Entry key={diary.id} entry={diary} />
        ))}
      </ul>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./services/diaryService";
import { DiaryEntry, Visibility, Weather } from "./types";
import Entry from "./components/Entry";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
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

  const onVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  const onWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
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
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment("");
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={addDiary}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          placeholder="Date"
        />
        <fieldset>
          <legend>Visibility</legend>
          {Object.values(Visibility).map((visibility) => (
            <label key={visibility}>
              <input
                type="radio"
                name="visibility"
                value={visibility}
                onChange={onVisibilityChange}
              />
              {visibility}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Weather</legend>
          {Object.values(Weather).map((weather) => (
            <label key={weather}>
              <input
                type="radio"
                name="weather"
                value={weather}
                onChange={onWeatherChange}
              />
              {weather}
            </label>
          ))}
        </fieldset>
        <label>Comment</label>
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

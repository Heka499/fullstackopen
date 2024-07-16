import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_AUTHOR } from "../queries";

const BirthForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor, result] = useMutation(EDIT_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: +born } });

    setName("");
    setBorn("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("person not found");
    }
  }, [result.data]);

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthForm;

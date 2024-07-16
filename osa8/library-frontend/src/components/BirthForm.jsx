import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const BirthForm = ({ authors }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");

  const [editAuthor, result] = useMutation(EDIT_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: name.value, setBornTo: +born } });

    setName(null);
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
          <Select
            defaultValue={name}
            onChange={setName}
            options={authors.map((a) => ({ value: a.name, label: a.name }))}
          />
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit" disabled={!name}>
          update author
        </button>
      </form>
    </div>
  );
};

export default BirthForm;

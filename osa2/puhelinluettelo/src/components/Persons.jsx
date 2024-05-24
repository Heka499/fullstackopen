import Button from "./Button"

const Persons = ({persons, search, deletePerson}) => {
    return (
      <ul>
          {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => (
            <div key={person.name}>
              <li>{person.name} {person.number}</li>
              <Button onClick={() => deletePerson(person.id)} text='delete' />
            </div>
          ))}
      </ul>
    )  
}

export default Persons
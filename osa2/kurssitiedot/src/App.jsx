const Header = ({ name }) => {
  console.log('Header:', name)
  return (
    <h1>{name}</h1>
  )
}

const Content = ({course}) => {
  console.log('Content:', course)
  return (
    <div>
      <Part parts={course[0]} />
      <Part parts={course[1]} />
      <Part parts={course[2]} />
    </div>
  )
}

const Part = ({parts}) => {
  console.log('Part', parts)
  return (
    <p>
      {parts.name} {parts.exercises}
    </p>
  )
}

const Course = ({ course }) => {
  console.log('Course:', course)
  return (
    <div>
      <Header name={course.name} />
      <Content course={course.parts} />
      <Total course={course} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>yhteensä</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
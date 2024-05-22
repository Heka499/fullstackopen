const Header = ({ name }) => {
    console.log('Header:', name)
    return (
      <h1>{name}</h1>
    )
  }
  
  const Content = ({ course }) => {
    console.log('Content:', course)
    return (
        course.parts.map(part => 
          <Part key={part.id} parts={part} />
        )      
    )
  }
  
  const Part = ({ parts }) => {
    console.log('Part', parts)
    return (
      <p>
        {parts.name} {parts.exercises}
      </p>
    )
  }
  
  const Total = ({ course }) => {
    console.log('Total:', course)
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p>Total of {total} exercises</p>
    )
  }
  
  const Course = ({ courses }) => {
    console.log('Course:', courses)
    return (
      courses.map(course =>
        <div key={course.id}>
          <Header name={course.name} />
          <Content course={course} />
          <Total course={course} />
        </div>
      )
    )
  }

  export default Course
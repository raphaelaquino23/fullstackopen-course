const Header = (props) => {
  return(
    <div>
      <h1>Course: {props.course}</h1>
    </div>
  )
}

const Total = (props) => {
  const parts = props.parts;
  let total = 0;
  
  parts.forEach(value => {
    total += value.exercises;
  })

  return(
    <div>
      <p>
        Total number of exercises: {total}
      </p>
    </div>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

const Content = (props) => {
  const parts = props.parts;

  return(
    <div>
      {parts.map((element, index) => 
        <Part key={index} part={element.name} exercises={element.exercises} />
      )}
    </div> 
  );
}


const App = () => {
  const course = 'ISPROJ2';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return(
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  );
}

export default App
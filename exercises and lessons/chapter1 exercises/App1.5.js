const Header = ({ name }) => {
  return (
    <div>
      <h1>Course: {name}</h1>
    </div>
  );
};

const Total = ({ parts }) => {
  let total = 0;
  parts.forEach((value) => {
    total += value.exercises;
  });

  return (
    <div>
      <p>Total number of exercises: {total}</p>
    </div>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((element, index) => (
        <Part key={index} part={element.name} exercises={element.exercises} />
      ))}
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;

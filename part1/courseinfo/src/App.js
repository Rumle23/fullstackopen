import React from "react";

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  const part_components = props.parts.map((part) => (
    <Part key={part.name} part={part} />
  ));
  return <>{part_components}</>;
};

const Total = (props) => {
  const count = props.parts
    .map((part) => part.exercises)
    .reduce((a, b) => a + b, 0);
  return <p>Number of exercises {count}</p>;
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;

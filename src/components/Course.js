import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  const {parts, name} = course; 
  return(
    <div>
        <Header name={name}/>
        <Content parts={parts}/>
    </div>
  )
}

export default Course;
import Part from "./Part";
const Content = ({ parts  }) => {
  let exercises = 0;
  parts.forEach(value => exercises += value.exercises)
  return(
    <div>
      <ul>
        {parts.map(value => 
          <Part key={value.id} part={value}/>
        )}
      </ul>
      <p><b>total of {exercises}</b></p>
    </div>
  )
}
export default Content;
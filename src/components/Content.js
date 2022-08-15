import Part from "./Part";
const Content = ({ parts  }) => {
  let exercises = 0;
  parts.forEach(value => exercises += value.exercises)
  return(
    <div>
      {parts.map(value => 
        <Part key={value.id} part={value}/>
      )}
      <p><b>total of {exercises}</b></p>
    </div>
  )
}
export default Content;

// const Total = ({exercises1, exercises2, exercises3}) =>  <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>  Forma Corta

const Total = ({course}) => {
    return (
        <div>
            <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
        </div>
    )
}

export default Total

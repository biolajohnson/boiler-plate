
const appRoot = document.getElementById('app')

const appDetails = {
    title: 'Indecision',
    options: [],
    subtitle: 'Let the computer take control of your life'
}
const onFormSubmit = (e) => {
    e.preventDefault()
    const option = e.target.elements.options.value;
    if(option){
     appDetails.options.push(option)
     e.target.elements.options.value = '';
    renderReact()
    }
}
const reset = () => {
    appDetails.options = []
    renderReact()
}
const makeSomethingHappen = () => {
const randomNum = Math.floor(Math.random() * appDetails.options.length)
alert(appDetails.options[randomNum])
}

const renderReact = () => {

    const template = (
        <div>
        <h1>{appDetails.title}</h1>
        {appDetails.subtitle && <p>{appDetails.subtitle}</p>}
        <p>{appDetails.options.length > 0 ? 'Here are your options' : 'No options'}</p>
        <p>{appDetails.options.length}</p>
        <ol>
         {
            appDetails.options.map((option) => {
                return <li key={option}>Option: {option}</li>
            })
         }
        </ol>
        <button onClick={reset}>Remove All</button>
        <button onClick={makeSomethingHappen}disabled={appDetails.options.length === 0}>What shoulf i do?</button>
        <form onSubmit={onFormSubmit}>
        <input type="text" name="options"/>
        <button>Submit</button>
        </form>
        </div>
    )
        
     ReactDOM.render(template, appRoot)
}
renderReact()
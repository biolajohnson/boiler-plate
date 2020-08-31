const title = 'Indecision'
const subtitle = 'Put your life in the hands of a computer!'

class IndecisionApp extends React.Component{
    constructor(props){
        super(props)
        this.handleRemoveOptions = this.handleRemoveOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleRemoveOption = this.handleRemoveOption.bind(this)
        this.state = {
            options: []
        }
    }
    handleRemoveOptions(){
        this.setState(() => ({ options: [] }));
    }
    handleRemoveOption(optionToRemove){
        this.setState((prevState) => ({
                options: prevState.options.filter((option) => optionToRemove !== option)
            })
        )
    }
    componentDidMount(){
       
       try{
        const json = localStorage.getItem('options')
       const options = JSON.parse(json)
       
       if(options){
        this.setState(() => ({ options }))
       }
       }catch(e){
        //do nothing!
       } 
       
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        } 
    }
    componentWillUnmount(){
        console.log('unmount!')
    }
    handlePick(){
        const ranNum = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[ranNum])
    }
    handleAddOption(option){
        if(!option){
            return 'Enter an option'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }))
        }
    render() {
        return (
            <div>
            <Header title={title} subtitle={subtitle} />
            <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0}/>
            <Options handleRemoveOption={this.handleRemoveOption} handleRemoveOptions={this.handleRemoveOptions} options={this.state.options}/>
            <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        )
    }
}
const Header = (props) => {

    return (
        <div>
           <h1>{props.title}</h1>
           <h2>{props.subtitle}</h2>
        </div>
    )  
}

const Action = (props) => {

    return (
        <div>
        <button disabled={!props.hasOptions} onClick={props.handlePick}>What should I do?</button>
        </div>
    )
}

const Options = (props) => {

    return (
        <div>
        <button onClick={props.handleRemoveOptions}>Remove All</button>
       {
        props.options.map((option) => (
        <Option 
        key={option} 
        optionText={option}
        handleRemoveOption={props.handleRemoveOption}
        />
        ))
       }
       {props.options.length === 0 && <p>Please input item to get started!</p>}
        </div>
    )
}

const Option = (props) => {
    
    return (
        <div>
        {props.optionText}
        <button onClick={(e) => {
            props.handleRemoveOption(props.optionText)}}>remove</button>
        </div>
    )
}

class AddOption extends React.Component {
    constructor(props){
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault()
        const option = e.target.elements.option.value.trim()
        const error = this.props.handleAddOption(option)
        e.target.elements.option.value = '';
        
        this.setState(() => ({ error }))
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                <input placeholder="Add option" name="option"/>
                <button>Submit</button>
                </form>
            </div>
        )
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'))
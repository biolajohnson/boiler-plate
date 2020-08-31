

class VisibilityToggle extends React.Component {
    constructor(props){
        super(props)
        this.action = this.action.bind(this)
        this.state = {
            text: '',
            visibility: false
        }
    }
    action(){
        this.setState((prevState) => {
            return {
                text: 'Hey! I am Bellow Strings!',
                visibility: !prevState.visibility
            }
        }) 
    }
    render(){
        return (
            <div>
            <h1>Visibility Toggle</h1>
            <button onClick={this.action}>{this.state.visibility ? 'Hide Details' : 'Show Details'}</button>
            {this.state.visibility &&<p>{this.state.text}</p>}
            </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'))
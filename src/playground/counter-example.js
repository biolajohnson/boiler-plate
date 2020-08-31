



class Counter extends React.Component {
    constructor(props){
        super(props)
        this.handlePlusOne = this.handlePlusOne.bind(this)
        this.handleMinusOne = this.handleMinusOne.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            count: 0
        }
    }
    handlePlusOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        })
    }
    handleMinusOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        })
    }
    handleReset(){
        this.setState(() => {
            return {
                count: 0
            }
        })
    }
    componentDidMount(){
        //fetching data
        try{
            const json = parseInt(localStorage.getItem('count'), 10)
            const count = JSON.parse(json)

            if(!isNaN(count)){
                this.setState(() => ({ count }))
            }

        }catch(e){
            //do nothing
        }
       
    }
    componentDidUpdate(prevProps, prevState){
        //saving data
        if(prevState.count !== this.state.count)
        localStorage.setItem('count', this.state.count)
    }
    render(){
        return (
            <div>
            <h1>Count: {this.state.count} </h1>
            <button onClick={this.handlePlusOne}>+1</button>
            <button onClick={this.handleMinusOne}>-1</button>
            <button onClick={this.handleReset}>reset</button>
            </div>
        )
    }
}


ReactDOM.render(<Counter />, document.getElementById('app'))
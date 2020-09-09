import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import DotEnv from 'dotenv'

DotEnv.config({ path: '.env.test' })

Enzyme.configure({
    adapter: new Adapter()
})
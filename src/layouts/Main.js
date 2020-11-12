import ContactForm from '../components/ContactForm';
import Nav from '../components/Nav';
import {Link as SmoothLink} from 'react-scroll';

const Main = ({data}) => {
	return (<div>
			<SmoothLink smooth={true} to="test">smooooth</SmoothLink>
			<Nav links={[{href:'/',text:'Home'}]}/>
			<h1>Hello World</h1>
			<ContactForm/>
			<img src={require("../../public/images/1.jpg?resize&size=300")}/>
		</div>
	)
}

export default Main;

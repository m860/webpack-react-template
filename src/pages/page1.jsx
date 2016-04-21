import {Link} from "react-router";
import Page from "components/page.jsx";

class Hello extends React.Component {
	constructor(props){
		super(props);
		this.state={
			message:""
		};
	}
	// getMessage(){
	// 	return new Promise((resolve,reject)=>{
	// 		setTimeout(()=>{
	// 			resolve("hi,i am a async message");
	// 		},2000);
	// 	});
	// }
	render() {
		return (
			<Page>
				<h1>Page 1</h1>
				<Link to="/page2"> /page2 </Link>
				<button >show message</button>
				<p>{this.state.message}</p>
			</Page>
		);
	}
}
export default Hello;
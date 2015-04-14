import PDF from '../lib/pdf'

export default class App extends React.Component {
	render () {
		return (
			<div className="container-fluid">
				<div className="col-sm-6">
					<div className="jumbotron">
						<h1>Documark</h1>
						<p>PDF generator for scripted documents.</p>
						<a className="btn btn-primary btn-lg" href="https://github.com/documark/documark">Learn more</a>
					</div>
				</div>
				<div className="col-sm-6">
					<PDF file="/pdf/example.pdf" page="1" />
				</div>
			</div>
		)
	}
}

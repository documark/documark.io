// Source: https://raw.githubusercontent.com/nnarhinen/react-pdf/master/index.js

export default class PDF extends React.Component {
	constructor (props) {
		super(props)
		this.state = { pdfPage: null }
	}
	componentDidMount () {
		var self = this
		PDFJS.getDocument(this.props.file).then(pdf => {
			let pageNumber = parseInt(self.props.page)
			pdf.getPage(pageNumber).then(page => {
				self.setState({ pdfPage: page, pdf: pdf })
			})
		})
	}
	componentWillReceiveProps (newProps) {
		var self = this
		if (newProps.page) {
			let pageNumber = parseInt(newProps.page)
			self.state.pdf.getPage(pageNumber).then(page => {
				self.setState({ pdfPage: page, pageId: pageNumber })
			})
		}
		this.setState({ pdfPage: null })
	}
	render () {
		var self = this
		if (this.state.pdfPage) setTimeout(() => {
			var canvas = React.findDOMNode(self),
				context = canvas.getContext('2d'),
				scale = self.props.scale || 1.0,
				viewport = self.state.pdfPage.getViewport(scale)
			canvas.height = viewport.height
			canvas.width = viewport.width
			var renderContext = {
				canvasContext: context,
				viewport: viewport
			}
			self.state.pdfPage.render(renderContext)
		})
		if ( ! this.state.pdfPage) {
			return <div>Loading PDF..</div>
		}
		return <canvas width="100%"></canvas>
	}
}

PDF.defaultProps = { page: 1 }

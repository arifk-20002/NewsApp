import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizaletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }

        document.title = `${this.capitalizaletter(this.props.category)} - NewsApp `
    }



    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d86a04e6c3194034bf0ae8970dfdab4f
        &page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url)
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () => {
        console.log("previous click")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d86a04e6c3194034bf0ae8970dfdab4f&page=${this.state.page - 1}
        &pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }

    handleNextClick = async () => {
        console.log("Next click")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d86a04e6c3194034bf0ae8970dfdab4f&page=${this.state.page + 1}
        &pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>{`NewsApp - Top ${this.capitalizaletter(this.props.category)} Headlines`}</h1>
                {this.state.loading && <Spinner />}
                    <div className='row'>
                        { this.state.articles.map((e) => {
                            return <div className='col-md-4' key={e.url} >
                                <NewsItem
                                    title={e.title ? e.title : ""}
                                    description={e.description ? e.description : ""}
                                    imageurl={e.urlToImage}
                                    url={e.url}
                                    author={e.author}
                                    date={e.publishedAt}
                                    source={e.source.name}
                                />
                            </div>
                        })}
                    </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} className='btn btn-bg btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                        className='btn btn-bg btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

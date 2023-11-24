import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageurl, url, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute   badge rounded-pill bg-danger" >
                        {source}
                    </span>
                    <img src={!imageurl ? "https://sportshub.cbsistatic.com/i/r/2023/11/05/ba962484-1252-40d0-910c-89e1b585be42/thumbnail/1200x675/76abc46d04edce79336e18c702aba8d2/stroud-texans-g.jpg" : imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small>By  {author ? author : "unknown"  }  on  {new Date(date).toGMTString()}</small></p>
                        <a href={url} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem

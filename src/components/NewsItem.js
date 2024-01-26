import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, urlToImage, url, author, date, source } = this.props;
    return (
      <div>
        <div className="card my-3" >
          <img src={urlToImage ? urlToImage : 'https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=2048x2048&w=is&k=20&c=ZyHCcX0F_DVM-r_R_vG8OX_CqYLb-G16afTyaVGtB3o='} className="card-img-top" alt="..." />
          <div className="card-body">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "90%" , zIndex: '1' }}>{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary ">By {!author ? author = 'unkown' : author} on {new Date(date).toGMTString()} </small></p>
            <a href={url} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary bg-dark ">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}



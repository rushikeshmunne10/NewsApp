import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

  static default = {
    pageSize: 10,
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    pageSize: 10,
    country: 'in',
    category: 'sports'
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    let tit = `${this.capitalizeFirstLetter(this.props.category)} - Newsifyy`;
    document.title = tit
  }


  async updateNews() {
    try {
      this.props.setProgress(10);
      const apikey = process.env.REACT_APP_APIKEY
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`);
      try {
        this.setState({ loading: true });
      }
      catch (e) {
        console.log("spinner not working");
      }
      const data = await res.json();

      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false
      });
      this.props.setProgress(100);
    }
    catch (e) {
      console.log("something is not working");
    }
  }

  async componentDidMount() {
    // try{        
    //     const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d40405e197544ec791c7eef6f9ad79ba&pageSize=${this.props.pageSize}`);
    //       try {
    //           this.setState({loading: true});
    //       }
    //       catch(e) {
    //         console.log("spinner not working");
    //       }
    //     const data = await res.json();

    //     this.setState({
    //         articles: data.articles ,
    //          totalResults: data.totalResults,
    //          loading: false
    //     });
    // }
    // catch(e) {
    //     console.log("something is not working");
    // }
    this.updateNews();
  }

  // PrevClick = async () => {
  //   // console.log('ok');
  //   // const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d40405e197544ec791c7eef6f9ad79ba&page=${this.state.page}&pageSize=${this.props.pageSize}`);
  //   // this.setState({loading: true});
  //   // const data = await res.json();
  //   // this.setState({
  //   //   articles: data.articles,
  //   //   page : this.state.page -1,
  //   //   loading : false
  //   // })
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  // NextClick = async () => {
  //   // console.log('ok');
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)))

  //     //   {const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d40405e197544ec791c7eef6f9ad79ba&page=${this.state.page}&pageSize=${this.props.pageSize}`);
  //     //   this.setState({loading: true});
  //     //   const data = await res.json();
  //     //   this.setState({
  //     //       articles: data.articles,
  //     //       page : this.state.page +1,
  //     //       loading: false
  //     //   });
  //     // }
  //     this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }

  fetchMoreData = async () => {
    // this.setState.page({page: this.state.page + 1 });
    try {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d40405e197544ec791c7eef6f9ad79ba&page=${this.state.page}&pageSize=${this.props.pageSize}`);
      // try {
      //   this.setState({ loading: true });
      // }
      // catch (e) {
      //   console.log("spinner not working");
      // }
      const data = await res.json();

      this.setState({
        articles: this.state.articles.concat(data.articles),
        totalResults: data.totalResults,
        page: this.state.page + 1 ,
        // loading: false,
      });
    }
    catch (e) {
      console.log("something is not working");
    }
  };



  render() {
    return (
      <>
        <div className="text-center" style={{ marginTop : '90px' }}>
          <h2>{`Newsifyy - Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h2>
          { (this.state.loading) && <Spinner />}
          {/* { <Spinner />} */}
        </div>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

        <div className="container">
        <div className="row my-3">
          {/* {(!this.state.loading) && this.state.articles.map ((element) => */}
          {this.state.articles.map((element) => {
            return <div className="col-md-3" key={element.url} >
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} urlToImage={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>
        })}
        </div>n
        </div>
        </InfiniteScroll>
         {/* { { <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.PrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.NextClick}> Next &rarr;</button>
        </div> } */}
      </> 
    )
}
} 
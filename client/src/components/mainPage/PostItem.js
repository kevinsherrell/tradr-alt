import React, {Component} from 'react';
import {connect} from 'react-redux';

import {postListing} from "../../actions/listingActions";

class PostItem extends Component {
    state = {
        user: this.props.auth.authenticatedUser && this.props.auth.authenticatedUser.id,
        title: "",
        tradeOnly: false,
        price: 0,
        category: "",
        itemsWanted: "",
        imageUrl: "",
        description: ""
    }
    handleCategory = (e) => {
        this.setState({
                category: e.target.value
            }, () => console.log(this.state.category)
        )
    }
    onChange = (e) => {
        console.log(this.state.price)
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state))

    }
    onSubmit = (e) => {
        e.preventDefault();
        let listingData = {
            user: this.state.user,
            title: this.state.title,
            tradeOnly: this.state.price > 0 ? false : true,
            price: this.state.price,
            category: this.state.category,
            itemsWanted: this.state.itemsWanted,
            imageUrl: this.state.imageUrl,
            description: this.state.description
        }

        this.props.postListing(listingData)


    }

    render() {
        console.log(this.props)
        return (
            <>

                <div className="post-item__overlay"
                     onClick={this.props.postItemForm && this.props.togglePostItem}>asdf
                </div>
                <div className={'post-item'}>
                    <i className="material-icons post-item__close"
                       onClick={this.props.postItemForm && this.props.togglePostItem}>close</i>
                    <div className="container">
                        <h2 className={"post-item__header"}>Ready to trade?</h2>
                        <p className={"post-item__sub-header"}>Enter your listing information below</p>
                        <div className="post-item__form">
                            <div className="post-item__form-row-1">
                                <div className="post-item__form-title">
                                    <p className={"post-item__form-title-label"}>Headline</p>
                                    <input name={"title"} type="text" className="post-item__form-title-input"
                                           placeholder={"Headline"}
                                           value={this.state.title} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="post-item__form-row-2">
                                <div className="post-item__form-category">
                                    <p className={"post-item__form-category-label"}>Category</p>
                                    <select className={'post-item__form-category-input'} onChange={this.handleCategory}
                                            value={this.state.category}>
                                        <option>Category</option>
                                        <option value="video games/consoles">video games/consoles</option>
                                        <option value="music/audio equipment">music/audio equipment</option>
                                        <option value="computers">computers</option>
                                        <option value="vehicles">vehicles</option>
                                        <option value="appliances">appliances</option>
                                        <option value="tablets">tablets</option>
                                        <option value="phones">phones</option>
                                        <option value="tvs">tvs</option>
                                    </select>
                                </div>
                                <div className="post-item__form-image">
                                    <p className={"post-item__form-image-label"}>Image</p>
                                    <input name={"imageUrl"} type="text" className={'post-item__form-image-input'}
                                           placeholder={"Image Url"} value={this.state.imageUrl}
                                           onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="post-item__form-row-3">
                                <div className="post-item__form-items-wanted">
                                    <p className={"post-item__form-items-wanted-label"}>Items Wanted</p>
                                    <input name={"itemsWanted"} type="text"
                                           className={'post-item__form-items-wanted-input'}
                                           placeholder={"Items Wanted"} value={this.state.itemsWanted}
                                           onChange={this.onChange}/>
                                </div>
                                <div className="post-item__form-price">
                                    <p className={"post-item__form-price-label"}>Price With trade</p>
                                    <input name={"price"} type="number" className={"post-item__form-price-input"}
                                           placeholder={"Price with trade"} onChange={this.onChange}
                                           value={this.state.price}/>
                                </div>
                            </div>
                            <div className="post-item__form-row-4">
                                <div className="post-item__form-description">
                                    <p className={"post-item__form-description-label"}>Description:</p>
                                    <textarea name="description" id="" cols="30" rows="10" resize={"none"}
                                              className={'post-item__form-description-input'}
                                              value={this.state.description} onChange={this.onChange}></textarea>
                                </div>

                            </div>


                        </div>
                        <div className="post-item__form-submit" onClick={this.onSubmit}>
                            Submit
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    listingData: state.listingData
})
export default connect(mapStateToProps, {postListing})(PostItem);
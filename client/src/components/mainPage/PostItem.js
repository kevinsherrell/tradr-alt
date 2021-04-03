import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {postListing} from "../../actions/listingActions";
import UploadInput from "./UploadInput";
import axios from "axios";

class PostItem extends Component {
    state = {
        user: this.props.auth.authenticatedUser && this.props.auth.authenticatedUser.id,
        title: "",
        tradeOnly: false,
        price: 0,
        category: "",
        tradeFor: "",
        imageUrl: "",
        description: "",
        images: [],
        imageUpload: []
    }
    form = React.createRef();
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
    onFileChange = (e) => {
        this.setState({
            images: [...this.state.images, e.target.files[0]]
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.fileUpload(this.state.images)
        // this.props.postListing(listingData)
    }
    fileUpload = (files) => {
        let listingData = {
            // user: this.state.user,
            title: this.state.title,
            tradeOnly: this.state.price > 0 ? false : true,
            price: this.state.price,
            category: this.state.category,
            tradeFor: this.state.tradeFor,
            description: this.state.description
        }
        // formData.append('listingImage', files)
        const formData = new FormData(ReactDOM.findDOMNode(this.form.current))
        // const formData = new FormData()
        // formData.append('title', this.state.title)
        // formData.append('category', this.state.category)
        // formData.append('description', this.state.description)
        // formData.append('tradeFor', this.state.tradeFor)
        // files.forEach(file => {
        //     formData.append('listingImage', file)
        // })

        console.log(formData)
        this.props.postListing(formData)
        // axios.post('http://localhost:3070/listing', formData, {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //         // 'content-type': 'application/json',
        //     }
        // })
        //     .then(response => console.log(response))
        //     .catch(error => console.log(error))
    }
    addNewPhoto = (e) => {
        e.preventDefault()
        this.setState({
            imageUpload: [...this.state.imageUpload, 'image']
        })
    }

    imageUpload = this.state.imageUpload.map((image, index) => {
        return (
            <UploadInput imageUrl={this.state.imageUrl} onFileChange={this.onFileChange}/>
        )
    })

    render() {
        console.log(this.props)
        console.log(this.state)
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
                        <form className="post-item__form" ref={this.form} onSubmit={this.onSubmit}>
                            <div className="post-item__form-row-1">
                                <div className="post-item__form-title">
                                    <label className={"post-item__form-title-label"}>Headline</label>
                                    <input name={"title"} type="text" className="post-item__form-title-input"
                                           placeholder={"Headline"}
                                           value={this.state.title} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="post-item__form-row-2">
                                <div className="post-item__form-category">
                                    <label className={"post-item__form-category-label"}>Category</label>
                                    <select className={'post-item__form-category-input'} onChange={this.handleCategory}
                                            value={this.state.category} name={'category'}>
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
                                    <label className={"post-item__form-image-label"}>Image</label>
                                    {/*New - image upload*/}
                                    <input name={"listingImage"}
                                           type="file"
                                           className={'post-item__form-image-input'}
                                           onChange={this.onFileChange}
                                    />
                                    {this.state.imageUpload.map((image, index) => {
                                        return (
                                            <UploadInput imageUrl={this.state.imageUrl}
                                                         onFileChange={this.onFileChange}/>
                                        )
                                    })}
                                    <button onClick={this.addNewPhoto}>add new photo</button>

                                    {/*Original - image url*/}
                                    {/*<input name={"imageUrl"} type="text" className={'post-item__form-image-input'}*/}
                                    {/*placeholder={"Image Url"} value={this.state.imageUrl}*/}
                                    {/*onChange={this.onChange}/>*/}
                                </div>
                            </div>
                            <div className="post-item__form-row-3">
                                <div className="post-item__form-items-wanted">
                                    <label className={"post-item__form-items-wanted-label"}>Items Wanted</label>
                                    <input name={"tradeFor"} type="text"
                                           className={'post-item__form-items-wanted-input'}
                                           placeholder={"Items Wanted"} value={this.state.itemsWanted}
                                           onChange={this.onChange}/>
                                </div>
                                <div className="post-item__form-price">
                                    <label className={"post-item__form-price-label"}>Price With trade</label>
                                    <input name={"price"} type="number" className={"post-item__form-price-input"}
                                           placeholder={"Price with trade"} onChange={this.onChange}
                                           value={this.state.price}/>
                                </div>
                            </div>
                            <div className="post-item__form-row-4">
                                <div className="post-item__form-description">
                                    <label className={"post-item__form-description-label"}>Description:</label>
                                    <textarea name="description" id="" cols="30" rows="10" resize={"none"}
                                              className={'post-item__form-description-input'}
                                              value={this.state.description} onChange={this.onChange}></textarea>
                                </div>

                            </div>
                            <button type={'submit'} className="post-item__form-submit">
                                Submit
                            </button>
                        </form>

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
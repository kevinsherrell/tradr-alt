import React, { useContext, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import UploadInput from "./UploadInput";
import {ListingContext} from "../../context/ListingContext";

const PostItem = (props) => {
    const listingData = useContext(ListingContext)

    const [postItemState, setPostItemState] = useState({
        title: "",
        tradeOnly: false,
        price: 0,
        category: "",
        tradeFor: "",
        description: "",
        images: [],
        imageUpload: []
    })
    const postItemForm = useRef()
    const handleCategory = (e) => {
        e.persist()
        setPostItemState((postItemState) => ({
            ...postItemState,
            category: e.target.value
        }))
        console.log(postItemState)
    }
    const onChange = (e) => {
        e.persist()
        setPostItemState((postItemState) => ({
            ...postItemState,
            [e.target.name]: e.target.value
        }))
    }

    const onFileChange = (e) => {
        e.persist()
        setPostItemState((postItemState) => ({
            ...postItemState,
            images: [...postItemState.images, e.target.files[0]]
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        fileUpload(postItemState.images)
    }
    const fileUpload = (files) => {
        const formData = new FormData(ReactDOM.findDOMNode(postItemForm.current))
        listingData.postListing(formData)
    }
    const addNewPhoto = (e) => {
        e.persist()
        setPostItemState((postItemState) => ({
            ...postItemState,
            imageUpload: [...postItemState.imageUpload, 'image']
        }))
    }

    const imageUpload = postItemState.imageUpload.map((image, index) => {
        return (
            <UploadInput imageUrl={postItemState.imageUrl} onFileChange={onFileChange}/>
        )
    })

    return (
        <>

            <div className="post-item__overlay"
                 onClick={props.postItemForm && props.togglePostItem}>asdf
            </div>
            <div className={'post-item'}>
                <i className="material-icons post-item__close"
                   onClick={props.postItemForm && props.togglePostItem}>close</i>
                <div className="container">
                    <h2 className={"post-item__header"}>Ready to trade?</h2>
                    <p className={"post-item__sub-header"}>Enter your listing information below</p>
                    <form className="post-item__form" ref={postItemForm} onSubmit={onSubmit}>
                        <div className="post-item__form-row-1">
                            <div className="post-item__form-title">
                                <label className={"post-item__form-title-label"}>Headline</label>
                                <input name={"title"} type="text" className="post-item__form-title-input"
                                       placeholder={"Headline"}
                                       value={postItemState.title} onChange={onChange}/>
                            </div>
                        </div>
                        <div className="post-item__form-row-2">
                            <div className="post-item__form-category">
                                <label className={"post-item__form-category-label"}>Category</label>
                                <select className={'post-item__form-category-input'} onChange={handleCategory}
                                        value={postItemState.category} name={'category'}>
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
                                       onChange={onFileChange}
                                />
                                {postItemState.imageUpload.map((image, index) => {
                                    return (
                                        <UploadInput imageUrl={postItemState.imageUrl}
                                                     onFileChange={onFileChange}/>
                                    )
                                })}
                                <button onClick={addNewPhoto}>add new photo</button>

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
                                       placeholder={"Items Wanted"} value={postItemState.tradeFor}
                                       onChange={onChange}/>
                            </div>
                            <div className="post-item__form-price">
                                <label className={"post-item__form-price-label"}>Price With trade</label>
                                <input name={"price"} type="number" className={"post-item__form-price-input"}
                                       placeholder={"Price with trade"} onChange={onChange}
                                       value={postItemState.price}/>
                            </div>
                        </div>
                        <div className="post-item__form-row-4">
                            <div className="post-item__form-description">
                                <label className={"post-item__form-description-label"}>Description:</label>
                                <textarea name="description" id="" cols="30" rows="10" resize={"none"}
                                          className={'post-item__form-description-input'}
                                          value={postItemState.description} onChange={onChange}></textarea>
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

export default PostItem;
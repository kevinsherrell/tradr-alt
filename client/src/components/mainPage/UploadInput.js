import React, {Component} from "react";

class UploadInput extends Component{
    state = {

    }

    render(){
        return (
            <input name={"imageUrl"} type="file"
                   className={'post-item__form-image-input'}
                   placeholder={"Image Url"}
                   value={this.props.imageUrl}
                   onChange={this.props.onFileChange}
            />
        )
    }
}

export default UploadInput
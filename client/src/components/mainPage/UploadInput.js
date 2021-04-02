import React, {Component} from "react";

class UploadInput extends Component{
    state = {

    }

    render(){
        return (
            <input name={"imageUrl"}
                   type="file"
                   className={'post-item__form-image-input'}
                   onChange={(e)=>this.props.onFileChange(e)}
            />
        )
    }
}

export default UploadInput
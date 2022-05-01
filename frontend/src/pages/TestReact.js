// import React from 'react'
// import { post } from 'axios';

// class testReact extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state ={
//       file:null
//     }
//     this.onFormSubmit = this.onFormSubmit.bind(this)
//     this.onChange = this.onChange.bind(this)
//     this.fileUpload = this.fileUpload.bind(this)
//   }

//   onFormSubmit(e){
//     e.preventDefault() // Stop form submit
//     this.fileUpload(this.state.file).then((response)=>{
//       console.log(response.data);
//     })
//   }

//   onChange(e) {
//     this.setState({file:e.target.files[0]})
//   }

//   fileUpload(file){
//     const url = 'http://localhost:9000/testAPI';
//     const formData = new FormData();
//     formData.append('file',file)
//     formData.append('abcd',"Hii")
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     console.log(formData);

//     return  post(url, formData,config)
//   }

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit}>
//         <h1>File Upload</h1>
//         <input type="file" onChange={this.onChange} />
//         <input type="text" name="Virag" value={"Hiii"}/>
//         <button type="submit">Upload</button>
//       </form>
//    )
//   }
// }



// export default testReact;
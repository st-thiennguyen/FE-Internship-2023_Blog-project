import { customURL, getImage } from "../../../shared/services";

function AddPost() {
  const handleClick = async () => {
    // try {
    //   const res = await postArticles({
    //     "title": "title of post validate min 20 characters",
    //     "cover": "cover",
    //     "content": "content of post validat cription of post validate min 50 charactcription of post validate min 50 charactcription of post validate min 50 charactcription of post validate min 50 charactcription of post validate min 50 charactcription of post validate min 50 charactcription of post validate min 50 charactcription of post validate min 50 charact",
    //     "status": "public",
    //     "description": "description of cription of post validate min 50 charactpost validate min 50 characters",
    //     "tags": [
    //       "React"
    //     ]
    //   })
    //   console.log(res);

    // }catch(error:any){
    //   console.log(error);
    // }      
  }
  const handleRevertImg = async (event: any) => {
    try {
      const file: any = event.target.files[0];
      // get để lấy link api
      const res: any = await getImage(file)
      console.log(res);
      
      //----------------------------------
      // function convert input file to báse64 
      // const getBase64 = (file: any) => {
      //   var reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onload = function () {
      //     console.log(reader.result);
      //   };
      //   reader.onerror = function (error) {
      //     console.log('Error: ', error);
      //   };
      // }
      // // convert basse64 to blob
      // const base64String = getBase64(file) as any; // Base64 string
      // const blob = new Blob([base64String], { type: file.type }); // Create a BLOB object

      // const blobData = new Blob([blob], {type: file.type});  
      // put khi có link api
      // console.log(blobData);
      const data = await customURL(res.signedRequest, file);
      console.log(data);

      console.log(res.signedRequest);
      
    } catch (error: any) {
      console.log(error);
    }

  }
  return <>
    <button onClick={handleClick}>Click</button>
    <input type="file" onChange={handleRevertImg} />
  </>
}
export default AddPost;
import express ,{ Response, Request } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage/", async (req:Request, res:Response) =>{
    try{
      let {image_url} : {image_url:string} = req.query;
      if(!image_url){
        return res.status(400).send("bad request!");
      }
      
      console.log(image_url);
      const path = await filterImageFromURL(image_url);
      res.sendFile(path);
      
      res.on('finish', () => deleteLocalFiles([path]));
    } catch (err) {
      console.error(err);
      return res.status(500).send({error: 'Unable to process your request'});
    }

    });



  
  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });
  

  app.get( "/", async ( req, res ) => {

    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
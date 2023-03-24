import express from 'express'
import cors from 'cors'
import routes from './routes/index'

const app = express();
app.get( "/", ( req, res ) => {
    res.send( "Ready!" );
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

export default app

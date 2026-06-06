import express  from 'express';
import mysql    from 'mysql2/promise';

const app  = express();
const port = 3000;  

app.use(express.static('../Client'));

app.use(express.json());

const pool = mysql.createPool({
    host:     'localhost',          
    port:     3306,                 
    user:     'root',               
    password: 'toor',
    database: 'jouw_db',            // ← vervang door jouw databasenaam
});

app.get('/api/test', (req, res) => {
    res.json({ bericht: 'Server werkt!' });
});

app.listen(port, () => {
    console.log('Server gestart → http://localhost:' + port);
});
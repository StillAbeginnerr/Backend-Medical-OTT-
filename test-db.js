import pool from './database/connection.js';

(async ()=>{
    try{
        const res = await pool.query('SELECT NOW()');
        console.log(res.rows[0]);
    }catch(err){
        console.log(err);
    } finally {
       await pool.end();
    }
})();
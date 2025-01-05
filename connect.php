<?php 
function connect(){
    #get env variables
    $host = getenv("DATABASE_HOST");
    $dbname = getenv("DATABASE_NAME");
    $username = getenv("DATABASE_USERNAME");
    $password = getenv("DATABASE_PASSWORD");
    $dbPort = getenv("DATABASE_PORT");
    $dsn = "mysql:host=$host;dbname=$dbname;port:$dbPort";
    #instantiate connection to database
    try
    {
        $conn = new PDO($dsn, $username, $password);
        #throw any exception raised by PDO
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } 
    catch(PDOException $pe) 
    {
        die("Could not connect to the database..$dsn..$dbname:" . $pe->getMessage());
    }
}
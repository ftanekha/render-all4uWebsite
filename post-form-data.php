<?php

include 'loadenv.php';

#get form data
$host = $_ENV['DB_HOST_NAME'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER_NAME'];
$password = $_ENV['DB_PASSWORD'];
#instantiate connection to database
try
{
    $conn = new PDO(
        "mysql:host=$host;dbname=$dbname;", 
        $username, $password
    );
} 
catch(PDOException $pe) 
{
    die("Could not connect to the database $dbname :" . $pe->getMessage());
}
#retrieve the raw POST data
$jsonData = file_get_contents('php://input');
#decode the JSON data into a PHP associative array
$data = json_decode($jsonData, true);
#check if decoding was successful
if(isset($data['title'])){
    if($data !== null) 
    {
        #access the data and perform operations
        $title = $data['title'];
        $forename = $data['forename'];
        $surname = $data['surname'];
        $dob = $data['dob'];
        $gender = $data['gender'];
        $nationality = $data['nationality'];
        $contact_number = $data['contact_number'];
        $email_address = $data['email_address'];
        $address = $data['address'];
        $town = $data['town'];
        $county = $data['county'];
        $post_code = $data['post_code'];
        #DATA FORMATTING & VALIDATION
        if($_SERVER["REQUEST_METHOD"] === "POST") 
        {#format the data
            function format_form_data($form_input) 
            {
                $form_input = trim($form_input);
                $form_input = stripslashes($form_input);
                $form_input = htmlspecialchars($form_input);
                return $form_input;
            }
            # [1] check for empty fields/ missing form data
            # [2] ****VALIDATE*****data
            $http_response_code406 = ["http_error_code" => 406, "error_description" => "Response Not Acceptable."];
            //validate and format personal ifo
            if(empty($title)) {
                echo json_encode([$http_response_code406, "The title is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z-' ]*$/", $title)) {
                echo json_encode([$http_response_code406, "The title format is incorrect."]);
                exit;
            }else{
                $title = format_form_data($title);
            }
            if(empty($forename)) {
                echo json_encode([$http_response_code406, "The forename is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z-' ]*$/", $forename)) {
                echo json_encode([$http_response_code406, "The forename format is incorrect."]);
                exit;
            }else{
                $forename = format_form_data($forename);
            }
            if(empty($surname)) {
                echo json_encode([$http_response_code406, "The surname is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z-' ]*$/", $surname)) {
                echo json_encode([$http_response_code406, "The surname format is incorrect."]);
                exit;
            }else{
                $surname = format_form_data($surname);
            }
            if(empty($dob)) {
                echo json_encode([$http_response_code406, "The date of birth is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z0-9\/-]{10}$/", $dob)) {
                echo json_encode([$http_response_code406, "The date of birth format is incorrect."]);
                exit;
            }
            else{
                $dob = format_form_data($dob);
            }
            if(empty($gender)) {
                echo json_encode([$http_response_code406, "The gender is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z-' ]*$/", $gender)) {
                echo json_encode([$http_response_code406, "The gender format is incorrect."]);
                exit;
            }else{
                $gender = format_form_data($gender);
            }
            if(empty($nationality)) {
                echo json_encode([$http_response_code406, "The nationality is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z-' ]*$/", $nationality)) {
                echo json_encode([$http_response_code406, "The nationality format is incorrect."]);
                exit;
            }else{
                $nationality = format_form_data($nationality);
            }

            //validate and format contact details
            if(empty($contact_number)){
                echo json_encode([$http_response_code406, "The contact number is required"]);
                exit;
            }elseif(!preg_match("/^\+?(?:\d\s?){7,15}$/", $contact_number)){
                echo json_encode([$http_response_code406, "The contact number format is incorrect."]);
                exit;
            }else{
                $contact_number = format_form_data($contact_number);
            }
            if(empty($email_address)){
                echo json_encode([$http_response_code406, "The email address is required."]);
                exit;
            }elseif (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
                echo json_encode([$http_response_code406, "The email address format is incorrect."]);
                exit;
            }else{
                $email_address = format_form_data($email_address);
            }
            if(empty($address)){
                echo json_encode([$http_response_code406, "The address is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z0-9\/' ]{4,40}$/", $address)) {
                echo json_encode([$http_response_code406, "The address format is incorrect."]);
                exit;
            }else{
                $address = format_form_data($address);
            }
            if(empty($town)){
                echo json_encode([$http_response_code406, "The town is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z-' ]*$/", $town)) {
                echo json_encode([$http_response_code406, "The town format is incorrect."]);
                exit;
            }else{
                $town = format_form_data($town);
            }
            if(empty($county)){
                echo json_encode([$http_response_code406, "The county is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z-' ]*$/", $county)) {
                echo json_encode([$http_response_code406, "The county format is incorrect."]);
                exit;
            }else{
                $county = format_form_data($county);
            }
            if(empty($post_code)){
                echo json_encode([$http_response_code406, "The post code is required"]);
                exit;
            }elseif(!preg_match("/^[a-zA-Z0-9 ]{6,8}$/", $post_code)) {
                echo json_encode([$http_response_code406, "The post code format is incorrect."]);
                exit;
            }else{
                $post_code = format_form_data($post_code);
            }
             
        }
        #insert personal info into registration_personal_information table
        $query_rpi = "INSERT INTO registration_personal_information (title, forename, surname, date_of_birth, gender, nationality)
                    VALUES (\"$title\", \"$forename\", \"$surname\", \"$dob\", \"$gender\", \"$nationality\")";
        try
        {
            $result = $conn->query($query_rpi);
        }
        catch(Exception $e)
        {
            echo "Exception caught: $e";
            exit;
        }
        #insert contact info into registration_contact_details table
        $query_rcd = "INSERT INTO registration_contact_details (contact_number, email_address, address, town, county, post_code)
                    VALUES (\"$contact_number\", \"$email_address\", \"$address\", \"$town\", \"$county\", \"$post_code)\")";
        try
        {
            $result = $conn->query($query_rcd);
        }
        catch(Exception $e)
        {
            echo "Exception caught: $e";
            exit;
        }
        echo json_encode("New registration info sent to database.");
    } 
    else 
    {
        #JSON decoding failed
        http_response_code(400); #Bad Request
        echo "Invalid JSON data";
    }
}
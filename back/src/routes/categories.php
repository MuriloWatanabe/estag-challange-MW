<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
require_once "../Services/categories.php";




if($_SERVER["REQUEST_METHOD"] === 'POST'){
    $name = $_POST["name"];
    $tax = $_POST["tax"];
    $createCategory = postCategory($name, $tax);
    echo ("<script> history.back(); </script>");
 
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getCategories();
}
if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
    delCategory();
    echo ("<script> history.back(); </script>");
}

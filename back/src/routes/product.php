<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
require_once "../Services/product.php";



if($_SERVER["REQUEST_METHOD"] === 'POST'){
    $name = $_POST["productN"];
    $amount = $_POST["amountP"];
    $price = $_POST["priceP"];
    $category_code = $_POST["label"];
    $createCategory = postProduct($name, $amount, $price, $category_code);
    echo ("<script> history.back(); </script>");
 
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getProducts();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    delProd();
    echo ("<script> history.back(); </script>");
}

if ($_SERVER['REQUEST_METHOD'] === 'UPDATE') {
    updateProduct($amount, $product_code);
    echo ("<script> history.back(); </script>");
}
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: *");
require_once "../Services/order_item.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getOrder_item();
};

if($_SERVER["REQUEST_METHOD"] === 'POST'){
    $order_code = $_POST['order_code'];
    $product_code = $_POST["product_code"];
    $amount = $_POST["amount"];
    $price = $_POST["price"];
    $tax = $_POST["tax"];
    $createCart = postOrder_item($order_code, $product_code, $amount , $price, $tax);
    echo ("<script> history.back(); </script>");
}


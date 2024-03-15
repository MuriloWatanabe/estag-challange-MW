<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
require_once "../Services/order.php";


if($_SERVER["REQUEST_METHOD"] === 'POST'){
    $code = $_POST["code"];
    $total = $_POST["total"];
    $tax = $_POST["tax"];
    $createCart = postOrder($code, $total,$tax);
    echo json_encode($createCart);
 
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getOrders();
}
if ($_SERVER['REQUEST_METHOD'] === 'UPDATE') {
    updateOrderProduct();
}
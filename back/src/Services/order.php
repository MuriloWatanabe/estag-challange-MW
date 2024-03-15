<?php
include "../index.php";

function postOrder($code, $total, $tax){
    $orderPost = myPDO->prepare("INSERT INTO orders ( code, total, tax) VALUES (:code, :total, :tax)");
    $orderPost-> bindParam(":code", $code);
    $orderPost-> bindParam(":total", $total);
    $orderPost-> bindParam(":tax", $tax);
    $orderPost->execute();
    return array("code" => $code);
    };
    function getOrders(){
        $Orders= myPDO -> query("SELECT * FROM orders" );
        $data = $Orders -> fetchALL();
        return print_r(json_encode($data));
    };
    function updateOrderProduct()
{
    $amount = $_REQUEST["amount"];
    $product = myPDO->prepare("UPDATE products SET amount = products.amount - $amount WHERE code=" . $_REQUEST["code"]);
    $product->execute();
}
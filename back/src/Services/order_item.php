<?php
include "../index.php";

    function postOrder_item($order_code,$product_code, $amount, $price, $tax){
        $orderPost = myPDO->prepare("INSERT INTO order_item ( order_code, product_code,amount, price,tax) VALUES ({$order_code},{$product_code} ,{$amount},{$price}, {$tax})");
        $orderPost->execute();
        updateProduct($amount, $product_code);
        return 'Cart criado';
        };
function getOrder_item(){
    $Order_item = myPDO -> query("SELECT * FROM order_item INNER JOIN products ON products.code = order_item.product_code INNER JOIN orders ON orders.code = order_item.order_code");
    $data = $Order_item -> fetchALL();
    return print_r(json_encode($data));
};
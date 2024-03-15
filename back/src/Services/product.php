<?php
 include "../index.php";


 function postProduct($name , $amount, $price , $category_code){
    $productPost = myPDO->prepare("INSERT INTO products (name,amount, price,category_code ) VALUES ('{$name}', '{$amount}' ,'{$price}', '{$category_code}' )");
    $productPost->execute();
    return 'product criado';
    }

    
function getCategories(){
    $category = myPDO -> query("SELECT * FROM categories");
    $data = $category -> fetchALL();
    return print_r(json_encode($data));
};
function getProducts(){
    $product = myPDO -> query("SELECT * FROM products INNER JOIN categories ON products.category_code = categories.code");
    $data = $product -> fetchALL();
    return print_r(json_encode($data));
}

function delProd(){
    $del = myPDO->prepare("DELETE FROM products WHERE code =".$_REQUEST["code"]);
    $del->execute();
    return 'categoria deletada';

}
//function updateProduct($amount, $product_code)
function updateProduct($amount, $product_code)
{
    $product = getProducts();
    $newamount = $product["amount"] - $amount;
    $updateProduct = myPDO -> prepare("UPDATE PRODUCTS SET AMOUNT = {$newamount} WHERE CODE = {$product_code}");
    $updateProduct -> execute();
}